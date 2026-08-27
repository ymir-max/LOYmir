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
      <h1 className="text-3xl font-semibold tracking-wide">Event Center</h1>

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
              className="text-left rounded-xl border border-white/10 bg-black/40 p-5 hover:bg-white/5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-lg border border-violet-400/40 bg-violet-500/15 text-violet-200">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400">{ev.displayCode}</div>
                    <h3 className="text-lg font-semibold text-white leading-tight">{ev.title}</h3>
                  </div>
                </div>
                <span
                  className={
                    isActive
                      ? "rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200 border border-emerald-400/30"
                      : "rounded-full bg-zinc-500/20 px-3 py-1 text-xs font-semibold text-zinc-300 border border-zinc-400/20"
                  }
                >
                  {isActive ? "ACTIVE" : "ENDED"}
                </span>
              </div>

              <p className="mt-3 text-sm text-zinc-300">{ev.description}</p>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                {ev.startsAt && (
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" /> Starts {ev.startsAt}
                  </span>
                )}
                {ev.endsAt && (
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" /> Ends {ev.endsAt}
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}

        {/* Teaser card (non-interactive) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: events.length * 0.04 }}
          className="rounded-xl border border-dashed border-white/15 bg-black/30 p-5 text-left opacity-90"
        >
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-lg border border-violet-400/30 bg-violet-500/10 text-violet-200">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs text-zinc-400">Preview</div>
              <h3 className="text-lg font-semibold text-white leading-tight">More Events Coming Soon</h3>
            </div>
          </div>
          <p className="mt-3 text-sm text-zinc-300">
            New events are being prepared — stay tuned on Discord for announcements.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

 
