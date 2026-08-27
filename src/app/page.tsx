"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Monitor, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      <Hero />

      <Welcome />

      <Classes />

      <SystemRequirements />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="https://video.wixstatic.com/video/cdedf0_ef2025d867514273aa0145b82e7da45a/1080p/mp4/file.mp4"
        poster="https://static.wixstatic.com/media/cdedf0_ef2025d867514273aa0145b82e7da45af000.jpg"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[#0f0b13]" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
          className="text-4xl font-semibold tracking-[0.2em] text-white sm:text-5xl"
        >
          LEGEND OF YMIR
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-4 max-w-2xl text-zinc-300"
        >
          Closed Beta Test — Late August to Early September 2026
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/shop"
            className="rounded-lg bg-zinc-100 px-5 py-2.5 text-sm font-medium text-black hover:bg-zinc-200"
          >
            Enter the Shop
          </Link>
          <Link
            href="/events"
            className="rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-zinc-200 hover:bg-white/10"
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0f0b13] via-[#0b0b0f] to-[#0f0b13]" />
      <div className="mx-auto max-w-6xl px-4 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.35 }}
          className="text-2xl font-semibold text-white"
        >
          Welcome to Legend of Ymir
        </motion.h2>

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40"
          >
            <video
              ref={vidRef}
              className="h-full w-full"
              src="https://video.wixstatic.com/video/cdedf0_bf1fe5db7c0549dd9ea93c8fc4301889/1080p/mp4/file.mp4"
              poster="https://static.wixstatic.com/media/cdedf0_bf1fe5db7c0549dd9ea93c8fc4301889f000.jpg"
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
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-zinc-100">
                  <Play className="h-5 w-5" /> Play
                </span>
              </button>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="text-zinc-300"
          >
            Legend of YMIR is one of the few AAA-level MMORPGs developed with the latest technology of Unreal Engine 5. Set in the world of Norse mythology, the costumes, hairstyles, and personalities of key mythical heroes and figures have been meticulously crafted, featuring a world that authentically represents the vivid living environment of that era.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function Classes() {
  const classes = [
    {
      name: "BERSERKER",
      tagline: "Ruthless and Bloodthirsty Fighter",
      video:
        "https://video.wixstatic.com/video/cdedf0_c8c8d18abd7643ad96485ce85c900b56/1080p/mp4/file.mp4",
      poster:
        "https://static.wixstatic.com/media/cdedf0_c8c8d18abd7643ad96485ce85c900b56f000.jpg",
    },
    {
      name: "VOLVA",
      tagline: "Bearer of the Great Will",
      video:
        "https://video.wixstatic.com/video/cdedf0_ef74eb0eebcb472a89ef1a2af65fd60d/1080p/mp4/file.mp4",
      poster:
        "https://static.wixstatic.com/media/cdedf0_ef74eb0eebcb472a89ef1a2af65fd60df000.jpg",
    },
    {
      name: "SKALD",
      tagline: "The Melodies that Promise Victory",
      video:
        "https://video.wixstatic.com/video/cdedf0_d63933aaee244df4a9da15f309775be2/1080p/mp4/file.mp4",
      poster:
        "https://static.wixstatic.com/media/cdedf0_d63933aaee244df4a9da15f309775be2f000.jpg",
    },
    {
      name: "WARLORD",
      tagline: "Soul-Piercing Strikes",
      video:
        "https://video.wixstatic.com/video/cdedf0_def2c314373f478f93a5683b11664ac4/1080p/mp4/file.mp4",
      poster:
        "https://static.wixstatic.com/media/cdedf0_def2c314373f478f93a5683b11664ac4f000.jpg",
    },
    {
      name: "ARCHER",
      tagline: "The ultimate sharpshooter bringing victory",
      video:
        "https://video.wixstatic.com/video/cdedf0_9b91f166f30f4dfab7fd303bdaa13339/1080p/mp4/file.mp4",
      poster:
        "https://static.wixstatic.com/media/cdedf0_9b91f166f30f4dfab7fd303bdaa13339f000.jpg",
    },
    {
      name: "RUNE FIGHTER",
      tagline: "Unleash the Storm of Runes",
      video:
        "https://video.wixstatic.com/video/cdedf0_12b8c418d5b04948b8658915faf386a0/1080p/mp4/file.mp4",
      poster:
        "https://static.wixstatic.com/media/cdedf0_12b8c418d5b04948b8658915faf386a0f000.jpg",
    },
  ] as const;

  return (
    <section className="mx-auto w-full max-w-6xl px-4">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.35 }}
        className="text-2xl font-semibold text-white"
      >
        CHOOSE YOUR DESTINY
      </motion.h2>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((c, idx) => (
          <ClassCard key={c.name} idx={idx} {...c} />
        ))}
      </div>
    </section>
  );
}

function ClassCard({
  name,
  tagline,
  video,
  poster,
  idx,
}: {
  name: string;
  tagline: string;
  video: string;
  poster: string;
  idx: number;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.35, delay: idx * 0.04 }}
      className="overflow-hidden rounded-xl border border-white/10 bg-black/40 p-3"
      onMouseEnter={() => ref.current?.play()}
      onMouseLeave={() => ref.current?.pause()}
    >
      <div className="aspect-square overflow-hidden rounded-lg border border-white/10">
        <video
          ref={ref}
          className="h-full w-full object-cover"
          src={video}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
        />
      </div>
      <div className="mt-3">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <p className="text-sm text-zinc-400">{tagline}</p>
      </div>
    </motion.div>
  );
}

function SystemRequirements() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.35 }}
        className="text-2xl font-semibold text-white"
      >
        SYSTEM REQUIREMENTS
      </motion.h2>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* PC */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="rounded-xl border border-white/10 bg-black/40 p-5"
        >
          <div className="mb-3 flex items-center gap-2 text-zinc-300">
            <Monitor className="h-5 w-5 text-violet-300" />
            <span className="text-sm">PC</span>
          </div>
          <div className="overflow-hidden rounded-lg border border-white/10">
            <div className="grid grid-cols-4 bg-white/5 text-xs font-medium text-zinc-200">
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
                <div className="border-t border-white/10 px-3 py-2 text-zinc-400">{row[0]}</div>
                <div className="border-t border-white/10 px-3 py-2 text-zinc-200">{row[1]}</div>
                <div className="border-t border-white/10 px-3 py-2 text-zinc-200">{row[2]}</div>
                <div className="border-t border-white/10 px-3 py-2 text-zinc-200">{row[3]}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="rounded-xl border border-white/10 bg-black/40 p-5"
        >
          <div className="mb-3 flex items-center gap-2 text-zinc-300">
            <Smartphone className="h-5 w-5 text-violet-300" />
            <span className="text-sm">Mobile</span>
          </div>
          <div className="overflow-hidden rounded-lg border border-white/10">
            <div className="grid grid-cols-3 bg-white/5 text-xs font-medium text-zinc-200">
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
                <div className="border-t border-white/10 px-3 py-2 text-zinc-400">{row[0]}</div>
                <div className="border-t border-white/10 px-3 py-2 text-zinc-200">{row[1]}</div>
                <div className="border-t border-white/10 px-3 py-2 text-zinc-200">{row[2]}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

 
