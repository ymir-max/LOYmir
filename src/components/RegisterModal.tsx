"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { LINKS } from "@/config/links";

// Real key comes from NEXT_PUBLIC_TURNSTILE_SITE_KEY (set in Vercel).
// Falls back to Cloudflare's test key locally (always passes).
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";
const TURNSTILE_SCRIPT =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: string;
        }
      ) => string;
      remove: (id: string) => void;
      reset: (id: string) => void;
    };
  }
}

/* ------------------------------------------------------------------ */
/* Context — lets any REGISTER button open the modal                    */
/* ------------------------------------------------------------------ */

const RegisterModalContext = createContext<{ open: () => void }>({
  open: () => {},
});

export function useRegisterModal() {
  return useContext(RegisterModalContext);
}

export function RegisterModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // /register renders the home page with the modal already open.
  useEffect(() => {
    if (pathname === "/register") setIsOpen(true);
  }, [pathname]);

  return (
    <RegisterModalContext.Provider value={{ open }}>
      {children}
      <RegisterModal open={isOpen} onClose={close} />
    </RegisterModalContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* Modal                                                                */
/* ------------------------------------------------------------------ */

const INPUT =
  "w-full rounded-lg border border-[color:var(--text-muted)]/25 bg-black/40 px-3.5 py-2.5 text-sm text-[color:var(--text-pale)] placeholder:text-[color:var(--text-muted)]/70 outline-none transition-colors focus:border-[color:var(--accent-bronze)]/70 focus:bg-black/55";

const LABEL =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-bronze)]";

const USERNAME_RE = /^[A-Za-z0-9_]{3,32}$/;

function RegisterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Esc to close + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  // Load the Turnstile script once and render the widget while open.
  useEffect(() => {
    if (!open) return;

    const renderWidget = () => {
      if (!window.turnstile || !turnstileRef.current || widgetIdRef.current) return;
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "dark",
        callback: (t) => setToken(t),
        "expired-callback": () => setToken(""),
        "error-callback": () => setToken(""),
      });
    };

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]`
    );
    if (window.turnstile) {
      renderWidget();
    } else if (existing) {
      existing.addEventListener("load", renderWidget, { once: true });
    } else {
      const script = document.createElement("script");
      script.src = TURNSTILE_SCRIPT;
      script.async = true;
      script.defer = true;
      script.addEventListener("load", renderWidget, { once: true });
      document.head.appendChild(script);
    }
  }, [open]);

  // Full reset whenever the modal closes.
  useEffect(() => {
    if (open) return;
    if (widgetIdRef.current && window.turnstile) {
      try {
        window.turnstile.remove(widgetIdRef.current);
      } catch {
        /* widget already gone */
      }
    }
    widgetIdRef.current = null;
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirm("");
    setToken("");
    setBusy(false);
    setError("");
    setSuccess(false);
  }, [open]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!USERNAME_RE.test(username)) {
      setError("Username must be 3–32 characters: letters, numbers, underscore.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!token) {
      setError("Please complete the captcha.");
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, email, password, turnstileToken: token }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; kind: "field"; message: string }
        | { ok: false; kind: "system" }
        | null;

      if (data?.ok === true) {
        setSuccess(true);
      } else if (data && data.ok === false && data.kind === "field") {
        setError(data.message || "Please check the form and try again.");
      } else {
        // kind:"system" or unreadable response — fall back to the official flow.
        window.location.href = LINKS.register;
      }
    } catch {
      window.location.href = LINKS.register;
    } finally {
      setBusy(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Create account"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md rounded-2xl p-[1px] bg-[linear-gradient(135deg,rgba(232,217,181,0.5),rgba(168,135,90,0.15),rgba(232,217,181,0.35))] shadow-[0_0_60px_-12px_rgba(232,217,181,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl border border-[color:var(--text-muted)]/15 bg-[color:var(--bg-panel)]/95 p-6 backdrop-blur-xl sm:p-8">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-md p-1.5 text-[color:var(--text-muted)] transition-colors hover:bg-white/5 hover:text-[color:var(--text-pale)]"
              >
                <X className="h-4 w-4" />
              </button>

              {success ? (
                <div className="py-6 text-center">
                  <div className="mx-auto mb-4 h-[1px] w-16 bg-[linear-gradient(90deg,transparent,var(--accent-bronze),transparent)]" />
                  <h2 className="font-display text-xl font-semibold text-[color:var(--text-pale)]">
                    Account created
                  </h2>
                  <p className="mt-3 text-sm text-[color:var(--text-pale)]/85">
                    Account created. Open the launcher to sign in.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-sm font-semibold text-[color:var(--bg-base)] shadow-[inset_0_0_0_1px_rgba(168,135,90,0.45)] bg-[linear-gradient(180deg,var(--accent-cream),var(--accent-bronze))] transition-all hover:shadow-[0_0_22px_0_rgba(232,217,181,0.2)] active:scale-[0.98]"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-xl font-semibold text-[color:var(--text-pale)]">
                    Create your account
                  </h2>
                  <p className="mt-1 text-xs text-[color:var(--text-muted)]">
                    The server is live — register and jump in.
                  </p>

                  <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4" noValidate>
                    <div>
                      <label htmlFor="reg-username" className={LABEL}>
                        Username
                      </label>
                      <input
                        id="reg-username"
                        type="text"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={INPUT}
                        placeholder="3–32 chars, letters/numbers/_"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="reg-email" className={LABEL}>
                        Email
                      </label>
                      <input
                        id="reg-email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={INPUT}
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="reg-password" className={LABEL}>
                        Password
                      </label>
                      <input
                        id="reg-password"
                        type="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={INPUT}
                        placeholder="At least 8 characters"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="reg-confirm" className={LABEL}>
                        Confirm password
                      </label>
                      <input
                        id="reg-confirm"
                        type="password"
                        autoComplete="new-password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        className={INPUT}
                        placeholder="Repeat your password"
                        required
                      />
                    </div>

                    <div className="flex justify-center pt-1">
                      <div ref={turnstileRef} />
                    </div>

                    {error && (
                      <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={busy}
                      className="mt-1 inline-flex w-full items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--bg-base)] shadow-[inset_0_0_0_1px_rgba(168,135,90,0.45)] bg-[linear-gradient(180deg,var(--accent-cream),var(--accent-bronze))] transition-all hover:shadow-[0_0_24px_0_rgba(232,217,181,0.25)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {busy ? "Creating account…" : "Create account"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
