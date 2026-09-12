import { LINKS } from "@/config/links";

export default function Footer() {
  return (
    <footer className="mt-12 w-full border-t border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-sm text-zinc-400">
        <div className="flex items-center gap-5">
          <a
            href={LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-200"
            aria-label="Discord"
          >
            Discord
          </a>
          <a
            href={LINKS.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-200"
            aria-label="TikTok"
          >
            TikTok
          </a>
          <a
            href={LINKS.cumulativeRewards}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-200"
          >
            Cumulative Rewards
          </a>
        </div>
        <div className="text-center">© 2026 Astral. All rights reserved.</div>
      </div>
    </footer>
  );
}
