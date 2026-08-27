"use client";

export const dynamic = "force-dynamic";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { gameEvents } from "@/lib/mock-data";
import type { GameEvent } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  ShieldCheck,
  Camera,
  Swords,
  Trophy,
  CheckCircle2,
  Gift,
  Gem,
  Medal,
  X as XIcon,
  Search,
  CalendarDays,
  UserPlus,
  Share2,
  Video,
} from "lucide-react";

const iconMap = { Users, ShieldCheck, Camera, Swords, Trophy, UserPlus, Share2, Video } as const;

type TabKey = "mechanics" | "results" | "check";

type Props = { params: { eventId: string } };

export default function EventDetailPage({ params }: Props) {
  const router = useRouter();
  const event: GameEvent | undefined = useMemo(
    () => gameEvents.find((e) => e.id === params.eventId),
    [params.eventId]
  );

  const [tab, setTab] = useState<TabKey>("mechanics");
  // claim state for this session only
  const [claims, setClaims] = useState<
    Array<{ referenceCode: string; discordUsername: string; characterName?: string }>
  >([]);

  if (!event) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">Event Detail</h1>
        <div className="rounded-xl border border-white/10 bg-black/40 p-6">
          <p className="text-zinc-300">Event not found.</p>
          <button
            onClick={() => router.push("/events")}
            className="mt-4 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const Icon = iconMap[event.icon as keyof typeof iconMap] ?? Users;

  return (
    <div className="space-y-8 pt-28 md:pt-36">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-lg border border-violet-400/40 bg-violet-500/15 text-violet-200">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs text-zinc-400">{event.displayCode}</div>
            <h1 className="text-2xl font-semibold text-white leading-tight">{event.title}</h1>
          </div>
        </div>
        <span
          className={
            event.status === "active"
              ? "rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200 border border-emerald-400/30"
              : "rounded-full bg-zinc-500/20 px-3 py-1 text-xs font-semibold text-zinc-300 border border-zinc-400/20"
          }
        >
          {event.status.toUpperCase()}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400">
        {event.startsAt && (
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-4 w-4" /> Starts {event.startsAt}
          </span>
        )}
        {event.endsAt && (
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-4 w-4" /> Ends {event.endsAt}
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="inline-flex rounded-full border border-white/10 bg-black/40 p-1">
        {[
          { key: "mechanics", label: "Mechanics & Claim" },
          { key: "results", label: "Results" },
          { key: "check", label: "Check Claim" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as TabKey)}
            className={
              "relative rounded-full px-4 py-2 text-sm text-zinc-300 hover:text-white"
            }
          >
            {tab === t.key && (
              <motion.span
                layoutId="pill2"
                className="absolute inset-0 rounded-full bg-zinc-100"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
            <span className={tab === t.key ? "relative z-10 text-black font-medium" : "relative z-10"}>
              {t.label}
            </span>
          </button>
        ))}
      </div>

      <div className="relative min-h-[360px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid gap-6 lg:grid-cols-3"
          >
            {tab === "mechanics" && (
              <>
                <div className="rounded-xl border border-white/10 bg-black/40 p-5 lg:col-span-2">
                  <h2 className="text-lg font-semibold text-white">Mechanics</h2>
                  <ol className="mt-3 space-y-3">
                    {event.mechanics.map((m, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-violet-300" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-5">
                  <h2 className="text-lg font-semibold text-white">Rewards</h2>
                  <ul className="mt-3 space-y-2 text-sm">
                    {event.rewards.map((r, i) => (
                      <li key={i} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-3 py-2">
                        <div className="flex items-center gap-2">
                          <Gift className="h-4 w-4 text-violet-300" />
                          <span className="text-zinc-200">{r.name}</span>
                        </div>
                        <span className="text-zinc-400">×{r.qty}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <ClaimForm
                  rulesNote={event.rulesNote}
                  onSubmit={(payload) => {
                    const ref = makeRef();
                    setClaims((arr) => [
                      ...arr,
                      {
                        referenceCode: ref,
                        discordUsername: payload.discordUsername,
                        characterName: payload.characterName,
                      },
                    ]);
                    alert(`Claim submitted! Reference: ${ref}`);
                  }}
                />
              </>
            )}

            {tab === "results" && (
              <div className="rounded-xl border border-white/10 bg-black/40 p-6 lg:col-span-3">
                <div className="mx-auto max-w-xl text-center">
                  <Search className="mx-auto mb-3 h-8 w-8 text-zinc-400" />
                  <p className="text-sm text-zinc-300">No reviewed claims have been published yet.</p>
                </div>
              </div>
            )}

            {tab === "check" && (
              <CheckClaimPanel claims={claims} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function makeRef() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 10; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `EV-${s}`;
}

function ClaimForm({
  onSubmit,
  rulesNote,
}: {
  onSubmit: (p: { discordUsername: string; characterName?: string; playerId?: string; links: string[] }) => void;
  rulesNote: string;
}) {
  const [discordUsername, setDiscordUsername] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [links, setLinks] = useState<string[]>([""]);

  const canSubmit = Boolean(
    discordUsername.trim() &&
    links.some((l) => l.trim().length > 0)
  );

  return (
    <div className="lg:col-span-3 rounded-xl border border-white/10 bg-black/40 p-6">
      <h2 className="text-lg font-semibold text-white">Submit Claim</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-zinc-300">Discord Username*</label>
          <input
            value={discordUsername}
            onChange={(e) => setDiscordUsername(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-200 outline-none focus:ring-2 focus:ring-violet-400/60"
            placeholder="yourname#1234"
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-300">Character Name (optional — required once the server launches)</label>
          <input
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-200 outline-none focus:ring-2 focus:ring-violet-400/60"
            placeholder="Character Name"
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-300">Player ID / UID (optional — required once the server launches)</label>
          <input
            value={playerId}
            onChange={(e) => setPlayerId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-200 outline-none focus:ring-2 focus:ring-violet-400/60"
            placeholder="UID"
          />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-zinc-300">Community Links*</h3>
          <button
            onClick={() => setLinks((l) => [...l, ""])}
            className="rounded-md border border-white/10 px-3 py-1 text-xs text-zinc-200 hover:bg-white/5"
          >
            + Add Link
          </button>
        </div>
        <div className="mt-2 space-y-2">
          {links.map((lnk, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                value={lnk}
                onChange={(e) =>
                  setLinks((arr) => arr.map((v, i) => (i === idx ? e.target.value : v)))
                }
                className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-200 outline-none focus:ring-2 focus:ring-violet-400/60"
                placeholder="https://"
              />
              {idx > 0 && (
                <button
                  aria-label="Remove"
                  onClick={() => setLinks((arr) => arr.filter((_, i) => i !== idx))}
                  className="rounded-md p-2 text-zinc-400 hover:text-white hover:bg-white/5"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs text-zinc-400">{rulesNote}</p>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() =>
            canSubmit &&
            onSubmit({
              discordUsername,
              characterName,
              playerId,
              links,
            })
          }
          disabled={!canSubmit}
          className={
            !canSubmit
              ? "rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-black opacity-50 cursor-not-allowed"
              : "rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
          }
        >
          Submit Event Claim
        </button>
      </div>
    </div>
  );
}

function CheckClaimPanel({
  claims,
}: {
  claims: Array<{ referenceCode: string; discordUsername: string; characterName?: string }>;
}) {
  const [code, setCode] = useState("");
  const result = useMemo(
    () => claims.find((c) => c.referenceCode.trim().toUpperCase() === code.trim().toUpperCase()),
    [claims, code]
  );

  return (
    <div className="lg:col-span-3 rounded-xl border border-white/10 bg-black/40 p-6">
      <h2 className="text-lg font-semibold text-white">Check Claim</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] items-end">
        <div>
          <label className="block text-sm text-zinc-300">Reference Code</label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="EV-XXXXXXXXXX"
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-200 outline-none focus:ring-2 focus:ring-violet-400/60"
          />
        </div>
        <button className="h-9 rounded-lg bg-zinc-100 px-4 text-sm font-medium text-black hover:bg-zinc-200">
          Check Status
        </button>
      </div>

      <div className="mt-4">
        {result ? (
          <div className="rounded-lg border border-white/10 bg-black/30 p-4 text-sm">
            <div className="mb-2 inline-block rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-400/30">
              PENDING
            </div>
            <div className="grid gap-1 text-zinc-300 sm:grid-cols-2">
              <div>Discord: <span className="text-zinc-200">{result.discordUsername}</span></div>
              <div>Character: <span className="text-zinc-200">{result.characterName || "-"}</span></div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-zinc-300">No claim found for this reference code.</p>
        )}
      </div>
    </div>
  );
}
