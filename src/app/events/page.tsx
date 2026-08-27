"use client";

import { useMemo } from "react";
import { gameEvents } from "@/lib/mock-data";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Users,
  ShieldCheck,
  Camera,
  Swords,
  Trophy,
  CalendarDays,
  Sparkles,
} from "lucide-react";

const iconMap = {
  Users,
  ShieldCheck,
  Camera,
  Swords,
  Trophy,
} as const;

export default function EventsPage() {
  const router = useRouter();
  const events = useMemo(() => gameEvents, []);

  return (
    <div className="space-y-8">
      <h1 className="font-display heading-metallic text-3xl font-semibold tracking-[0.14em]">Event Center</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((ev, idx) => {
          const Icon = iconMap[ev.icon as keyof typeof iconMap] ?? Users;
          const isActive = ev.status === "active";
          return (
            <motion.button
              key={ev.id}
              onClick={() => router.push(`/events/${ev.id}`)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.04 }}
              className="text-left rounded-xl p-[1px] bg-[linear-gradient(135deg,rgba(168,135,90,0.35),transparent)] hover:shadow-[0_0_22px_rgba(232,217,181,0.14)]"
            >
              <div className="rounded-xl border border-[color:var(--text-muted)]/20 bg-[color:var(--bg-panel)] p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-lg icon-badge">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs text-[color:var(--text-muted)]">{ev.displayCode}</div>
                    <h3 className="font-display text-lg font-semibold text-[color:var(--text-pale)] leading-tight">{ev.title}</h3>
                  </div>
                </div>
                <span className="badge-bronze px-3 py-1 text-xs font-semibold">{isActive ? "ACTIVE" : "ENDED"}</span>
              </div>

              <p className="mt-3 text-sm text-[color:var(--text-pale)]/90">{ev.description}</p>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[color:var(--text-muted)]">
                {ev.startsAt && (
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-4 w-4 text-[color:var(--accent-bronze)]" /> Starts {ev.startsAt}
                  </span>
                )}
                {ev.endsAt && (
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-4 w-4 text-[color:var(--accent-bronze)]" /> Ends {ev.endsAt}
                  </span>
                )}
              </div>
              </div>
            </motion.button>
          );
        })}

        {/* Teaser card (non-interactive) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: events.length * 0.04 }}
          className="rounded-xl p-[1px] bg-[linear-gradient(135deg,rgba(168,135,90,0.25),transparent)] text-left opacity-90"
        >
          <div className="rounded-xl border border-[color:var(--text-muted)]/25 bg-[color:var(--bg-panel)] p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-lg icon-badge">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs text-[color:var(--text-muted)]">Preview</div>
                <h3 className="font-display text-lg font-semibold text-[color:var(--text-pale)] leading-tight">More Events Coming Soon</h3>
              </div>
            </div>
            <p className="mt-3 text-sm text-[color:var(--text-pale)]/90">
              New events are being prepared — stay tuned on Discord for announcements.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

 
