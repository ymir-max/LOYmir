"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info, X, Lock } from "lucide-react";
import clsx from "clsx";
import { currencyProducts, specialPackages, loyaltyMilestones } from "@/lib/mock-data";
import type { Product } from "@/lib/types";
import { useRouter } from "next/navigation";

type TabKey = "currency" | "special" | "loyalty";

// no month-based seasonal tab in official shop

export default function ShopPage() {
  const router = useRouter();
  const [active, setActive] = useState<TabKey>("currency");
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  const tabs: { key: TabKey; label: string }[] = [
    { key: "currency", label: "YMIR Points" },
    { key: "special", label: "Special Packages" },
    { key: "loyalty", label: "Cumulative Rewards" },
  ];

  const products = useMemo(() => {
    switch (active) {
      case "currency":
        return currencyProducts;
      case "special":
        return specialPackages;
      default:
        return [] as Product[];
    }
  }, [active]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold tracking-wide">Web Shop</h1>

      {/* Tabs */}
      <div className="relative w-full overflow-x-auto">
        <div className="inline-flex rounded-full border border-white/10 bg-black/40 p-1">
          {tabs.map((t) => {
            const isActive = t.key === active;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={clsx(
                  "relative px-4 py-2 text-sm rounded-full transition-colors",
                  isActive
                    ? "text-black"
                    : "text-zinc-300 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="pill"
                    className="absolute inset-0 rounded-full bg-zinc-100"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
                <span className="relative z-10 font-medium">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {active !== "loyalty" ? (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {products.map((p, idx) => {
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.04 }}
                  className={
                    "group relative rounded-xl border bg-black/40 border-white/10 p-4 backdrop-blur"
                  }
                >
                  {p.badge && (
                    <div className="absolute -top-2 -left-2">
                      <div className="rounded-full bg-violet-500/20 text-violet-200 border border-violet-400/40 px-3 py-1 text-xs font-semibold shadow">
                        {p.badge}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white leading-tight">
                      {p.name}
                    </h3>
                    <p className="text-sm text-zinc-400">${p.priceUSD.toFixed(2)} USD</p>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={() => setModalProduct(p)}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-sm text-zinc-200 hover:bg-white/5 transition-colors"
                    >
                      <Info className="h-4 w-4" /> View Rewards
                    </button>
                    <button
                      onClick={() => router.push(`/shop/checkout?productId=${p.id}`)}
                      className={
                        "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors bg-zinc-100 text-black hover:bg-zinc-200"
                      }
                    >
                      <Check className="h-4 w-4" /> Select
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="loyalty"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Progress Header */}
            <div className="rounded-xl border border-white/10 bg-black/40 p-5">
              <div className="text-sm text-zinc-300">Your Cumulative Spend:</div>
              <div className="mt-1 text-2xl font-semibold text-white">$0</div>
              <div className="mt-1 text-xs text-zinc-500">Updates automatically based on your order history once the server is live.</div>
            </div>

            {/* Milestones */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {loyaltyMilestones.map((m, idx) => (
                <motion.div
                  key={m.threshold}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.03 }}
                  className="rounded-xl border border-dashed border-white/15 bg-black/30 p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">${m.threshold.toLocaleString()}</h3>
                    <Lock className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div className="mt-3 inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-300">
                    Rewards: Coming Soon
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Claim CTA */}
            <div className="rounded-xl border border-white/10 bg-black/40 p-5 text-right">
              <button
                disabled
                className="cursor-not-allowed rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-black opacity-50"
              >
                Claim Cumulative Rewards (Available once the server launches)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <RewardsModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
      />
    </div>
  );
}

function RewardsModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="relative z-10 m-4 w-full max-w-md rounded-xl border border-white/10 bg-[#111016] p-4 text-zinc-200 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">{product.name}</h2>
                <p className="mt-1 text-sm text-zinc-400">
                  ${product.priceUSD.toFixed(2)} USD
                </p>
              </div>
              <button
                aria-label="Close"
                onClick={onClose}
                className="rounded-md p-1 text-zinc-400 hover:text-white hover:bg-white/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-zinc-300">Rewards</h3>
              <ul className="mt-2 space-y-2 text-sm">
                {product.rewards.map((r, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-3 py-2"
                  >
                    <span className="text-zinc-200">{r.name}</span>
                    <span className="text-zinc-400">×{r.qty}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="rounded-lg bg-zinc-100 px-4 py-1.5 text-sm font-medium text-black hover:bg-zinc-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

 
