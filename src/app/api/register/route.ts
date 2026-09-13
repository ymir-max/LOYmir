import { NextResponse } from "next/server";
import { LINKS } from "@/config/links";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Referral promo is derived from LINKS.register — the single source of truth.
// Never hardcode the promo code anywhere else.
const PROMO = new URL(LINKS.register).searchParams.get("promo") ?? "";

const REGISTER_API = "https://api.astymir.com/auth/register";

// Real secret comes from TURNSTILE_SECRET (set in Vercel).
// Falls back to Cloudflare's test secret locally (always passes).
const TURNSTILE_SECRET =
  process.env.TURNSTILE_SECRET || "1x0000000000000000000000000000000AA";
const TURNSTILE_VERIFY =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type ApiResult =
  | { ok: true }
  | { ok: false; kind: "field"; message: string }
  | { ok: false; kind: "system" };

function field(message: string): NextResponse<ApiResult> {
  return NextResponse.json({ ok: false, kind: "field", message });
}

function system(): NextResponse<ApiResult> {
  return NextResponse.json({ ok: false, kind: "system" });
}

/** Pull a human-readable error string out of the upstream JSON shape. */
function extractErrorMessage(data: Record<string, unknown>): string | null {
  const pick = (v: unknown): string | null => {
    if (typeof v === "string" && v.trim()) return v;
    if (Array.isArray(v)) {
      for (const item of v) {
        const s = pick(item);
        if (s) return s;
      }
      return null;
    }
    if (v && typeof v === "object") {
      for (const val of Object.values(v as Record<string, unknown>)) {
        const s = pick(val);
        if (s) return s;
      }
    }
    return null;
  };
  return pick(data.error) ?? pick(data.errors) ?? pick(data.message);
}

/** Reduce Set-Cookie headers to a Cookie request header value (name=value pairs). */
function toCookieHeader(setCookies: string[]): string {
  return setCookies
    .map((c) => c.split(";")[0]?.trim())
    .filter(Boolean)
    .join("; ");
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return system();
  }

  const username = typeof body.username === "string" ? body.username.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const turnstileToken =
    typeof body.turnstileToken === "string" ? body.turnstileToken : "";

  if (!username || !email || !password) {
    return field("Missing required fields.");
  }

  try {
    // Verify the Turnstile token (test secret always passes — see TODO above).
    const tsRes = await fetch(TURNSTILE_VERIFY, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: TURNSTILE_SECRET,
        response: turnstileToken,
      }),
      cache: "no-store",
    });
    const tsData = (await tsRes.json().catch(() => null)) as {
      success?: boolean;
    } | null;
    if (!tsRes.ok || !tsData?.success) {
      return field("Captcha verification failed. Please try again.");
    }

    // Step A — hit the passport register page to obtain the ssid + cookies.
    const stepA = await fetch(LINKS.register, {
      method: "GET",
      redirect: "manual",
      cache: "no-store",
    });

    const location = stepA.headers.get("location");
    if (!location) return system();

    const ssid = new URL(location, LINKS.register).searchParams.get("ssid");
    if (!ssid) return system();

    const getSetCookie = (
      stepA.headers as unknown as { getSetCookie?: () => string[] }
    ).getSetCookie;
    const setCookies =
      typeof getSetCookie === "function"
        ? getSetCookie.call(stepA.headers)
        : stepA.headers.get("set-cookie")
          ? [stepA.headers.get("set-cookie") as string]
          : [];
    const cookieHeader = toCookieHeader(setCookies);

    // Step B — submit the registration to the auth endpoint.
    const headers: Record<string, string> = {
      "content-type": "application/json",
    };
    if (cookieHeader) headers.cookie = cookieHeader;

    const stepB = await fetch(REGISTER_API, {
      method: "POST",
      headers,
      body: JSON.stringify({
        username,
        email,
        password,
        ssid,
        promo: PROMO,
      }),
      cache: "no-store",
    });

    if (!stepB.ok) return system();

    const data = (await stepB.json().catch(() => null)) as Record<
      string,
      unknown
    > | null;
    if (!data || typeof data !== "object") return system();

    if (data.status === 1 && (data.error === null || data.error === undefined)) {
      return NextResponse.json({ ok: true } satisfies ApiResult);
    }

    const message = extractErrorMessage(data);
    if (message) return field(message);

    return system();
  } catch {
    return system();
  }
}
