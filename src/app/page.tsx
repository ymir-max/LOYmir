"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Monitor, Smartphone, CheckCircle2 } from "lucide-react";
import SectionDivider from "@/components/SectionDivider";

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
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen -mt-10 -mb-10">
        <Hero />
      </div>

      <SectionDivider />
      <Welcome />

      <SectionDivider />
      <Classes />

      <SectionDivider />
      <SystemRequirements />
      <SectionDivider />
    </div>
  );
}

function Hero() {
  const letters = [
    "/images/letters/letter-01-L.png",
    "/images/letters/letter-02-E1.png",
    "/images/letters/letter-03-G.png",
    "/images/letters/letter-04-E2.png",
    "/images/letters/letter-05-N.png",
    "/images/letters/letter-06-D.png",
    "/images/letters/letter-07-O.png",
    "/images/letters/letter-08-F.png",
    "/images/letters/letter-09-Y.png",
    "/images/letters/letter-10-M.png",
    "/images/letters/letter-11-I.png",
    "/images/letters/letter-12-R.png",
  ];

  const [scale, setScale] = useState(1);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const raf = useRef<number | null>(null);
  const [email, setEmail] = useState("");
  const [regStatus, setRegStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const calc = () => {
      const wrapW = wrapRef.current?.clientWidth ?? 0;
      const rowW = rowRef.current?.scrollWidth ?? 0;
      if (wrapW && rowW) {
        const pad = 16; // breathing room
        const next = Math.min(1, (wrapW - pad) / rowW);
        setScale(Number.isFinite(next) ? Math.max(0.4, next) : 1);
      }
    };
    calc();
    let ro: ResizeObserver | null = null;
    // Only attach ResizeObserver if supported
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(calc);
      if (wrapRef.current) ro.observe(wrapRef.current);
      if (rowRef.current) ro.observe(rowRef.current);
    }
    window.addEventListener("resize", calc);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", calc);
    };
  }, []);

  // Recalculate once images load to prevent mismeasure before natural widths are known
  useEffect(() => {
    if (typeof window === "undefined") return;
    const wrapW = wrapRef.current?.clientWidth ?? 0;
    const rowW = rowRef.current?.scrollWidth ?? 0;
    if (wrapW && rowW) {
      const pad = 16;
      const next = Math.min(1, (wrapW - pad) / rowW);
      setScale(Number.isFinite(next) ? Math.max(0.4, next) : 1);
    }
  }, [imagesLoaded]);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/hero-bg.mp4"
        poster="/images/hero-bg-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_30%,transparent,rgba(0,0,0,0.35)),linear-gradient(to_bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.5),var(--bg-base))]" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4 text-center">
        <motion.h1 className="w-full">
          <span className="sr-only">Legend of Ymir</span>
          <div ref={wrapRef} className="mx-auto w-full max-w-5xl px-4">
            <div
              ref={rowRef}
              className="mx-auto inline-flex flex-nowrap items-center justify-center"
              style={{ perspective: "800px", transform: `scale(${scale})`, transformOrigin: "center top", willChange: "transform" }}
            >
            {letters.map((src, i) => {
              const baseDur = 3 + ((i * 37) % 20) / 10; // 3.0 - 5.0s pseudo-random
              const movementDur = baseDur * 2; // 2x slower movement
              const delay = i * 0.15 + (((i * 17) % 10) / 100); // stagger + small offset
              const isWordGap = i === 5 || i === 7; // LEGEND | OF | YMIR
              return (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: [0, -3, 0, 3, 0], rotateZ: [-1, 0.5, 1, 0.5, -1] }}
                  transition={{
                    opacity: { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay },
                    y: { duration: movementDur, repeat: Infinity, repeatType: "mirror", ease: [0.16, 1, 0.3, 1], delay },
                    rotateZ: { duration: movementDur * 1.1, repeat: Infinity, repeatType: "mirror", ease: [0.16, 1, 0.3, 1], delay: delay + 0.05 },
                  }}
                  className={isWordGap ? "mr-6 sm:mr-8" : "mr-1 sm:mr-2"}
                >
                  <img
                    src={src}
                    alt=""
                    className="block h-12 sm:h-20 md:h-[110px] w-auto select-none opacity-100"
                    draggable={false}
                    aria-hidden
                    onLoad={() => setImagesLoaded((n) => n + 1)}
                  />
                </motion.div>
              );
            })}
            </div>
          </div>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="mt-4 max-w-2xl text-[color:var(--text-pale)]/90"
        >
          Closed Beta Test — Late August to Early September 2026
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 w-full px-4"
        >
          <div className="mx-auto max-w-xl rounded-2xl border border-[color:var(--accent-bronze)]/45 bg-black/30 p-6 shadow-[0_0_0_1px_rgba(168,135,90,0.25)] backdrop-blur-sm">
            <div className="text-center">
              <div className="font-display tracking-[0.22em]">
                <div className="text-xl sm:text-2xl bg-[linear-gradient(180deg,var(--accent-cream),var(--accent-bronze),var(--accent-cream))] [background-clip:text] [-webkit-background-clip:text] text-transparent [-webkit-text-fill-color:transparent]">
                  PRE REGISTRATION
                </div>
                <div className="-mt-1 text-xl sm:text-2xl bg-[linear-gradient(180deg,var(--accent-cream),var(--accent-bronze),var(--accent-cream))] [background-clip:text] [-webkit-background-clip:text] text-transparent [-webkit-text-fill-color:transparent]">
                  WIN CASH
                </div>
              </div>

              {regStatus !== "success" ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim());
                    if (!ok) {
                      setRegStatus("error");
                      return;
                    }
                    console.log("Pre-registration:", email.trim());
                    setRegStatus("success");
                  }}
                  className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto] sm:gap-2"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (regStatus !== "idle") setRegStatus("idle");
                    }}
                    placeholder="Enter your email"
                    className={
                      regStatus === "error"
                        ? "w-full rounded-lg border border-red-500/50 bg-black/30 px-3 py-2 text-sm text-[color:var(--text-pale)] outline-none focus:ring-2 focus:ring-red-400/60"
                        : "w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-[color:var(--text-pale)] outline-none focus:ring-2 focus:ring-[color:var(--accent-cream)]/50"
                    }
                  />
                  <button
                    type="submit"
                    className="rounded-lg px-5 py-2.5 text-sm font-semibold text-[color:var(--bg-base)] shadow-[inset_0_0_0_1px_rgba(168,135,90,0.45)] bg-[linear-gradient(180deg,var(--accent-cream),var(--accent-bronze))] transition-all hover:shadow-[0_0_24px_0_rgba(232,217,181,0.25),inset_0_0_0_1px_rgba(168,135,90,0.55)] active:scale-[0.98]"
                  >
                    Pre-register
                  </button>
                </form>
              ) : (
                <div className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-500/15 px-3 py-2 text-sm text-emerald-200">
                  <CheckCircle2 className="h-4 w-4" /> Thanks — you're registered!
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-5"
        >
          <Link
            href="/shop"
            className="rounded-lg px-5 py-2.5 text-sm font-semibold text-[color:var(--bg-base)] shadow-[inset_0_0_0_1px_rgba(168,135,90,0.45)] bg-[linear-gradient(180deg,var(--accent-cream),var(--accent-bronze))] transition-all hover:shadow-[0_0_24px_0_rgba(232,217,181,0.25),inset_0_0_0_1px_rgba(168,135,90,0.55)] active:scale-[0.98]"
          >
            Enter the Shop
          </Link>
          <Link
            href="/events"
            className="rounded-lg px-5 py-2.5 text-sm font-semibold text-[color:var(--bg-base)] shadow-[inset_0_0_0_1px_rgba(168,135,90,0.45)] bg-[linear-gradient(180deg,var(--accent-cream),var(--accent-bronze))] transition-all hover:shadow-[0_0_24px_0_rgba(232,217,181,0.25),inset_0_0_0_1px_rgba(168,135,90,0.55)] active:scale-[0.98]"
          >
            View Events
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Welcome() {
  const [playing, setPlaying] = useState(false);
  const vidRef = useRef<HTMLVideoElement | null>(null);

  const onPlay = () => {
    if (!playing) {
      vidRef.current?.play();
      setPlaying(true);
    }
  };

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
          Welcome to Legend of Ymir
        </motion.h2>

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
            className="relative overflow-hidden rounded-xl border border-[color:var(--text-muted)]/20 bg-[color:var(--bg-panel)]"
          >
            <video
              ref={vidRef}
              className="h-full w-full object-cover"
              src="/videos/welcome-art.mp4"
              poster="/images/welcome-art-poster.jpg"
              controls={playing}
              playsInline
              preload="none"
            />
            {!playing && (
              <button
                aria-label="Play"
                onClick={onPlay}
                className="absolute inset-0 grid place-items-center bg-black/40 backdrop-blur-sm transition-colors hover:bg-black/30"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--accent-bronze)]/50 bg-[rgba(232,217,181,0.14)] px-4 py-2 text-sm font-medium text-[color:var(--text-pale)]">
                  <Play className="h-5 w-5" /> Play
                </span>
              </button>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-[color:var(--text-pale)]"
          >
            Legend of YMIR is one of the few AAA-level MMORPGs developed with the latest technology of Unreal Engine 5. Set in the world of Norse mythology, the costumes, hairstyles, and personalities of key mythical heroes and figures have been meticulously crafted, featuring a world that authentically represents the vivid living environment of that era.
          </motion.p>
        </div>
      </div>
      <div className="divider-gold mx-auto mt-8 w-full max-w-6xl px-4" />
    </section>
  );
}

function Classes() {
  const classes = [
    {
      name: "BERSERKER",
      tagline: "Ruthless and Bloodthirsty Fighter",
      video: "/videos/berserker.mp4",
      poster: "/images/berserker-poster.jpg",
    },
    {
      name: "VOLVA",
      tagline: "Bearer of the Great Will",
      video: "/videos/volva.mp4",
      poster: "/images/volva-poster.jpg",
    },
    {
      name: "SKALD",
      tagline: "The Melodies that Promise Victory",
      video: "/videos/skald.mp4",
      poster: "/images/skald-poster.jpg",
    },
    {
      name: "WARLORD",
      tagline: "Soul-Piercing Strikes",
      video: "/videos/warlord.mp4",
      poster: "/images/warlord-poster.jpg",
    },
    {
      name: "ARCHER",
      tagline: "The ultimate sharpshooter bringing victory",
      video: "/videos/archer.mp4",
      poster: "/images/archer-poster.jpg",
    },
    {
      name: "RUNE FIGHTER",
      tagline: "Unleash the Storm of Runes",
      video: "/videos/rune-fighter.mp4",
      poster: "/images/rune-fighter-poster.jpg",
    },
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

      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-6 w-screen">
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`bg-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute inset-0 -z-10"
            >
              <div
                className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40 [filter:saturate(0.9)]"
                style={{ backgroundImage: `url(${activeItem.poster})` }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(1000px_400px_at_50%_-100px,rgba(232,217,181,0.08),transparent),linear-gradient(180deg,rgba(0,0,0,0.62),rgba(0,0,0,0.86))]" />
            </motion.div>
          </AnimatePresence>

          <div className="relative mx-auto grid min-h-[70svh] w-full max-w-6xl items-center gap-6 px-4 py-8 lg:min-h-[84svh] lg:grid-cols-[0.44fr_0.56fr_auto]">
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
                    <div className="mx-auto inline-block whitespace-nowrap text-[clamp(22px,4.2vw,44px)] bg-[linear-gradient(180deg,var(--accent-cream),var(--accent-bronze),var(--accent-cream))] [background-clip:text] [-webkit-background-clip:text] text-transparent [-webkit-text-fill-color:transparent]">
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
                  key={`video-${active}`}
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl p-[1px] bg-[linear-gradient(135deg,rgba(168,135,90,0.35),transparent)]"
                >
                  <div className="rounded-2xl bg-[color:var(--bg-panel)] p-2 sm:p-3">
                    <div className="relative flex h-[74svh] sm:h-[78svh] w-full items-center justify-center overflow-hidden rounded-xl border border-[color:var(--text-muted)]/20">
                      <video
                        key={activeItem.video}
                        className="h-full w-auto max-w-full object-contain bg-black/20"
                        src={activeItem.video}
                        poster={activeItem.poster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="none"
                      />
                    </div>
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
                        ? "inline-flex items-center justify-center rounded-lg p-[2px] shadow-[0_0_18px_rgba(232,217,181,0.18)]"
                        : "inline-flex items-center justify-center rounded-lg p-[2px]"
                    }
                  >
                    <div className={
                      activeState
                        ? "rounded-md p-[1px] bg-[linear-gradient(135deg,rgba(232,217,181,0.65),rgba(168,135,90,0.45))]"
                        : "rounded-md p-[1px] bg-[linear-gradient(135deg,rgba(168,135,90,0.35),transparent)]"
                    }>
                      <div className={
                        activeState
                          ? "overflow-hidden rounded-[10px] border border-[color:var(--accent-cream)]/60"
                          : "overflow-hidden rounded-[10px] border border-[color:var(--text-muted)]/25"
                      }>
                        <img
                          src={c.poster}
                          alt={c.name}
                          className={
                            activeState
                              ? "block h-16 w-16 lg:h-20 lg:w-20 object-cover"
                              : "block h-16 w-16 lg:h-20 lg:w-20 object-cover brightness-50"
                          }
                          draggable={false}
                        />
                      </div>
                    </div>
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
        {/* PC */}
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

        {/* Mobile */}
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

 
