"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Smartphone,
  Apple,
  Download,
  Users,
  UserPlus,
  Share2,
  Video,
  ShieldCheck,
  Camera,
  Swords,
  Trophy,
  CalendarDays,
  Sparkles,
  ImageOff,
} from "lucide-react";
import SectionDivider from "@/components/SectionDivider";
import { gameEvents } from "@/lib/mock-data";
import { LINKS } from "@/config/links";

const GOLD_TEXT =
  "bg-[linear-gradient(180deg,var(--accent-cream),var(--accent-bronze),var(--accent-cream))] [background-clip:text] [-webkit-background-clip:text] text-transparent [-webkit-text-fill-color:transparent]";

const BTN_PRIMARY =
  "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-[color:var(--bg-base)] shadow-[inset_0_0_0_1px_rgba(168,135,90,0.45)] bg-[linear-gradient(180deg,var(--accent-cream),var(--accent-bronze))] transition-all hover:shadow-[0_0_24px_0_rgba(232,217,181,0.25),inset_0_0_0_1px_rgba(168,135,90,0.55)] active:scale-[0.98]";

const BTN_GHOST =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-[color:var(--accent-bronze)]/45 bg-black/25 px-5 py-2.5 text-sm font-medium text-[color:var(--text-pale)] transition-all hover:border-[color:var(--accent-cream)]/60 hover:bg-black/40 active:scale-[0.98]";

export default function Home() {
  return (
    <div className="relative flex flex-col gap-16">
      {/* Ambient orbs for subtle depth */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -top-40 -left-40 h-[60vmax] w-[60vmax] rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(168,135,90,0.16), transparent 70%)" }}
          animate={{ x: [0, 40, -20, 0], y: [0, 20, -10, 0] }}
          transition={{ duration: 60, ease: [0.16, 1, 0.3, 1], repeat: Infinity }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-60 right-[-20%] h-[50vmax] w-[50vmax] rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(232,217,181,0.12), transparent 70%)" }}
          animate={{ x: [0, -30, 20, 0], y: [0, -10, 20, 0] }}
          transition={{ duration: 70, ease: [0.16, 1, 0.3, 1], repeat: Infinity }}
        />
      </div>

      {/* Full-bleed hero breakout from main's max-w and padding */}
      <div className="relative -mt-10 -mb-10" style={{ marginInline: "calc(50% - 50vw)" }}>
        <Hero />
      </div>

      <SectionDivider />
      <Welcome />

      <SectionDivider />
      <Classes />

      <SectionDivider />
      <Events />

      <SectionDivider />
      <SystemRequirements />
      <SectionDivider />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Placeholder used everywhere artwork is not ready yet                */
/* ------------------------------------------------------------------ */

function ArtPlaceholder({
  label,
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={
        "relative grid place-items-center overflow-hidden rounded-xl border border-[color:var(--accent-bronze)]/30 bg-[linear-gradient(160deg,rgba(232,217,181,0.06),rgba(0,0,0,0.35))] " +
        className
      }
    >
      <div className="flex flex-col items-center gap-2 px-6 text-center">
        <ImageOff className="h-6 w-6 text-[color:var(--accent-bronze)]/70" />
        {label && (
          <div className={"font-display text-lg tracking-[0.16em] " + GOLD_TEXT}>{label}</div>
        )}
        <div className="text-xs tracking-wide text-[color:var(--text-muted)]">
          Artwork coming soon
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_-10%,rgba(232,217,181,0.10),transparent_60%),linear-gradient(to_bottom,#0b0906,#120f0a_45%,var(--bg-base))]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_30%,transparent,rgba(0,0,0,0.35))]" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display"
        >
          <span
            className={
              "block text-[clamp(38px,9vw,104px)] font-semibold uppercase leading-[1.05] tracking-[0.12em] " +
              GOLD_TEXT
            }
          >
            Astral Ymir
          </span>
        </motion.h1>

        <motion.div
          aria-hidden
          initial={{ opacity: 0, scaleX: 0.6 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mt-5 h-[1px] w-[min(420px,80%)] bg-[linear-gradient(90deg,transparent,var(--accent-bronze),transparent)]"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="mt-6 max-w-2xl text-[color:var(--text-pale)]/90"
        >
          The server is live. Create your account and start playing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
          className="mt-9"
        >
          <a
            href={LINKS.register}
            target="_blank"
            rel="noopener noreferrer"
            className={BTN_PRIMARY + " px-10 py-3.5 text-base tracking-[0.14em]"}
          >
            REGISTER
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <DownloadTile
            icon={<Monitor className="h-4 w-4" />}
            label="Download for PC"
            href={LINKS.downloadPC}
            mirror={LINKS.downloadPCMirror}
          />
          <DownloadTile
            icon={<Smartphone className="h-4 w-4" />}
            label="Download APK"
            href={LINKS.downloadAndroid}
            mirror={LINKS.downloadAndroidMirror}
          />
          <DownloadTile
            icon={<Apple className="h-4 w-4" />}
            label="Download for iOS"
            href={LINKS.downloadIOS}
          />
        </motion.div>
      </div>
    </section>
  );
}

function DownloadTile({
  icon,
  label,
  href,
  mirror,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  mirror?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={BTN_GHOST + " w-full"}
      >
        {icon}
        {label}
      </a>
      {mirror && (
        <a
          href={mirror}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-[color:var(--text-muted)] underline-offset-4 transition-colors hover:text-[color:var(--accent-cream)] hover:underline"
        >
          <Download className="h-3 w-3" /> Mirror
        </a>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Welcome                                                             */
/* ------------------------------------------------------------------ */

function Welcome() {
  return (
    <section className="relative w-full">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_600px_at_50%_-10%,var(--bg-panel)_0%,var(--bg-base)_60%),linear-gradient(to_bottom,var(--bg-base),var(--bg-panel),var(--bg-base))]" />
      <div className="mx-auto max-w-6xl px-4 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-2xl font-semibold text-[color:var(--text-pale)] [text-shadow:0_0_14px_rgba(232,217,181,0.25)]"
        >
          Welcome to Astral Ymir
        </motion.h2>

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
          >
            <ArtPlaceholder className="aspect-video w-full" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-[color:var(--text-pale)]"
          >
            Astral Ymir is an Unreal Engine 5 MMORPG set in the world of Norse
            mythology, with boosted rates, community events and a server that is
            open and running right now. Create an account, pick your class and
            join the world.
          </motion.p>
        </div>
      </div>
      <div className="divider-gold mx-auto mt-8 w-full max-w-6xl px-4" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Classes                                                             */
/* ------------------------------------------------------------------ */

function Classes() {
  const classes = [
    { name: "BERSERKER", tagline: "Ruthless and Bloodthirsty Fighter" },
    { name: "VOLVA", tagline: "Bearer of the Great Will" },
    { name: "SKALD", tagline: "The Melodies that Promise Victory" },
    { name: "WARLORD", tagline: "Soul-Piercing Strikes" },
    { name: "ARCHER", tagline: "The ultimate sharpshooter bringing victory" },
    { name: "RUNE FIGHTER", tagline: "Unleash the Storm of Runes" },
  ] as const;

  const [active, setActive] = useState(0);
  const activeItem = classes[active];

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-6xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-2xl font-semibold text-[color:var(--text-pale)] [text-shadow:0_0_14px_rgba(232,217,181,0.25)]"
        >
          CHOOSE YOUR DESTINY
        </motion.h2>
      </div>

      <div className="relative mt-6" style={{ marginInline: "calc(50% - 50vw)" }}>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1000px_400px_at_50%_-100px,rgba(232,217,181,0.08),transparent),linear-gradient(180deg,rgba(0,0,0,0.62),rgba(0,0,0,0.86))]" />

          <div className="relative mx-auto grid w-full max-w-6xl items-center gap-6 px-4 py-12 lg:grid-cols-[0.44fr_0.56fr_auto]">
            <div className="order-1 lg:order-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${active}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center lg:text-left"
                >
                  <div className="font-display tracking-[0.18em]">
                    <div
                      className={
                        "mx-auto inline-block whitespace-nowrap text-[clamp(22px,4.2vw,44px)] " +
                        GOLD_TEXT
                      }
                    >
                      {activeItem.name}
                    </div>
                  </div>
                  <div className="mx-auto my-3 h-[1px] w-[220px] max-w-full bg-[linear-gradient(90deg,transparent,var(--accent-bronze),transparent)]" />
                  <p className="mx-auto max-w-xl text-sm text-[color:var(--text-pale)]/90 sm:text-base">
                    {activeItem.tagline}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="order-3 lg:order-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`art-${active}`}
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl p-[1px] bg-[linear-gradient(135deg,rgba(168,135,90,0.35),transparent)]"
                >
                  <div className="rounded-2xl bg-[color:var(--bg-panel)] p-2 sm:p-3">
                    <ArtPlaceholder
                      label={activeItem.name}
                      className="h-[46svh] w-full sm:h-[54svh]"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="order-2 -mx-1 mt-3 flex items-center gap-2 overflow-x-auto px-1 lg:order-none lg:mx-0 lg:mt-0 lg:flex-col lg:overflow-visible lg:px-0 lg:self-center">
              {classes.map((c, i) => {
                const activeState = i === active;
                return (
                  <button
                    key={c.name}
                    aria-label={c.name}
                    onClick={() => setActive(i)}
                    className={
                      activeState
                        ? "shrink-0 rounded-lg border border-[color:var(--accent-cream)]/60 bg-[rgba(232,217,181,0.12)] px-3 py-2 text-[11px] font-semibold tracking-[0.12em] text-[color:var(--text-pale)] shadow-[0_0_18px_rgba(232,217,181,0.18)] lg:w-32"
                        : "shrink-0 rounded-lg border border-[color:var(--text-muted)]/25 px-3 py-2 text-[11px] tracking-[0.12em] text-[color:var(--text-muted)] transition-colors hover:border-[color:var(--accent-bronze)]/50 hover:text-[color:var(--text-pale)] lg:w-32"
                    }
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="divider-gold mx-auto mt-10 w-full max-w-6xl px-4" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Events (moved here from the removed Events tab)                     */
/* ------------------------------------------------------------------ */

const eventIconMap = {
  Users,
  UserPlus,
  Share2,
  Video,
  ShieldCheck,
  Camera,
  Swords,
  Trophy,
} as const;

function Events() {
  const router = useRouter();
  const events = useMemo(() => gameEvents, []);

  return (
    <section className="mx-auto w-full max-w-6xl px-4">
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-2xl font-semibold text-[color:var(--text-pale)] [text-shadow:0_0_14px_rgba(232,217,181,0.25)]"
      >
        EVENTS
      </motion.h2>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((ev, idx) => {
          const Icon = eventIconMap[ev.icon as keyof typeof eventIconMap] ?? Users;
          const isActive = ev.status === "active";
          return (
            <motion.button
              key={ev.id}
              onClick={() => router.push(`/events/${ev.id}`)}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="text-left rounded-xl p-[1px] bg-[linear-gradient(135deg,rgba(168,135,90,0.35),transparent)] hover:shadow-[0_0_22px_rgba(232,217,181,0.14)]"
            >
              <div className="h-full rounded-xl border border-[color:var(--text-muted)]/20 bg-[color:var(--bg-panel)] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-lg icon-badge">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-xs text-[color:var(--text-muted)]">{ev.displayCode}</div>
                      <h3 className="font-display text-lg font-semibold leading-tight text-[color:var(--text-pale)]">
                        {ev.title}
                      </h3>
                    </div>
                  </div>
                  <span className="badge-bronze px-3 py-1 text-xs font-semibold">
                    {isActive ? "ACTIVE" : "ENDED"}
                  </span>
                </div>

                <p className="mt-3 text-sm text-[color:var(--text-pale)]/90">{ev.description}</p>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[color:var(--text-muted)]">
                  {ev.startsAt && (
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-4 w-4 text-[color:var(--accent-bronze)]" /> Starts{" "}
                      {ev.startsAt}
                    </span>
                  )}
                  {ev.endsAt && (
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-4 w-4 text-[color:var(--accent-bronze)]" /> Ends{" "}
                      {ev.endsAt}
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.35, delay: events.length * 0.05 }}
          className="rounded-xl p-[1px] bg-[linear-gradient(135deg,rgba(168,135,90,0.25),transparent)] text-left opacity-90"
        >
          <div className="h-full rounded-xl border border-[color:var(--text-muted)]/25 bg-[color:var(--bg-panel)] p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-lg icon-badge">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs text-[color:var(--text-muted)]">Preview</div>
                <h3 className="font-display text-lg font-semibold leading-tight text-[color:var(--text-pale)]">
                  More Events Coming Soon
                </h3>
              </div>
            </div>
            <p className="mt-3 text-sm text-[color:var(--text-pale)]/90">
              New events are being prepared — stay tuned on Discord for announcements.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* System requirements                                                 */
/* ------------------------------------------------------------------ */

function SystemRequirements() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16">
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-2xl font-semibold text-[color:var(--text-pale)] [text-shadow:0_0_14px_rgba(232,217,181,0.25)]"
      >
        SYSTEM REQUIREMENTS
      </motion.h2>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="rounded-xl p-[1px] bg-[linear-gradient(135deg,rgba(168,135,90,0.35),transparent)]"
        >
          <div className="mb-3 flex items-center gap-2 text-[color:var(--text-pale)]">
            <Monitor className="h-5 w-5 text-[color:var(--accent-bronze)]" />
            <span className="font-display text-sm tracking-wider">PC</span>
          </div>
          <div className="overflow-hidden rounded-lg border border-[color:var(--text-muted)]/20">
            <div className="grid grid-cols-4 bg-[rgba(232,217,181,0.08)] text-xs font-semibold text-[color:var(--text-pale)]">
              <div className="px-3 py-2"> </div>
              <div className="px-3 py-2">Minimum</div>
              <div className="px-3 py-2">Recommended</div>
              <div className="px-3 py-2">High-End</div>
            </div>
            {[
              ["OS", "Windows 10 64-bit", "Windows 10 64-bit", "Windows 10 64-bit"],
              ["CPU", "Intel i7 7th gen", "Intel i7 10th gen", "Intel i7 13th gen"],
              ["RAM", "16GB", "32GB", "32GB"],
              ["GPU", "GTX 1060 (6GB)", "RTX 3060", "RTX 3080"],
              ["DirectX", "12", "12", "12"],
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-4 text-sm odd:bg-white/2">
                <div className="border-t border-[color:var(--text-muted)]/25 px-3 py-2 text-[color:var(--text-muted)]">{row[0]}</div>
                <div className="border-t border-[color:var(--text-muted)]/25 px-3 py-2 text-[color:var(--text-pale)]">{row[1]}</div>
                <div className="border-t border-[color:var(--text-muted)]/25 px-3 py-2 text-[color:var(--text-pale)]">{row[2]}</div>
                <div className="border-t border-[color:var(--text-muted)]/25 px-3 py-2 text-[color:var(--text-pale)]">{row[3]}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="rounded-xl p-[1px] bg-[linear-gradient(135deg,rgba(168,135,90,0.35),transparent)]"
        >
          <div className="mb-3 flex items-center gap-2 text-[color:var(--text-pale)]">
            <Smartphone className="h-5 w-5 text-[color:var(--accent-bronze)]" />
            <span className="font-display text-sm tracking-wider">Mobile</span>
          </div>
          <div className="overflow-hidden rounded-lg border border-[color:var(--text-muted)]/20">
            <div className="grid grid-cols-3 bg-[rgba(232,217,181,0.08)] text-xs font-semibold text-[color:var(--text-pale)]">
              <div className="px-3 py-2"> </div>
              <div className="px-3 py-2">Android (Min)</div>
              <div className="px-3 py-2">iOS (Rec)</div>
            </div>
            {[
              ["OS", "Android 12", "iOS 16"],
              ["RAM", "4GB", "4GB"],
              ["Chipset", "Snapdragon 865 / Exynos 9820", "AP-Base"],
              ["Phone ref", "Galaxy S20", "iPhone 12"],
              ["Tablet ref", "Galaxy Tab S7", "iPad 9th gen"],
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 text-sm odd:bg-white/2">
                <div className="border-t border-[color:var(--text-muted)]/25 px-3 py-2 text-[color:var(--text-muted)]">{row[0]}</div>
                <div className="border-t border-[color:var(--text-muted)]/25 px-3 py-2 text-[color:var(--text-pale)]">{row[1]}</div>
                <div className="border-t border-[color:var(--text-muted)]/25 px-3 py-2 text-[color:var(--text-pale)]">{row[2]}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
