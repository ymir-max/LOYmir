import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-white/10 bg-black/40 backdrop-blur sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-wider text-white">
          Legend of Ymir
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/shop" className="text-zinc-300 hover:text-white transition-colors">
            Shop
          </Link>
          <Link href="/events" className="text-zinc-300 hover:text-white transition-colors">
            Events
          </Link>
        </nav>
      </div>
    </header>
  );
}
