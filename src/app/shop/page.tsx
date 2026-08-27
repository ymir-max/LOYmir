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
    <div className="space-y-8 pt-28 md:pt-36">
      <h1 className="font-display heading-metallic text-3xl font-semibold tracking-[0.14em]">Web Shop</h1>

      {/* Tabs */}
      <div className="relative w-full overflow-x-auto">
        <div className="inline-flex tabs-list">
          {tabs.map((t) => {
            const isActive = t.key === active;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={clsx(
                  "tab-trigger",
                  isActive ? "tab-trigger--active" : "tab-trigger--inactive"
                )}
              >
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
                  className="group relative rounded-xl p-[1px] bg-[linear-gradient(135deg,rgba(168,135,90,0.35),transparent)]"
                >
                  <div className="rounded-xl border border-[color:var(--text-muted)]/20 bg-[color:var(--bg-panel)] p-4">
                    {p.badge && (
                      <div className="-mt-2 -ml-2 mb-2">
                        <div
                          className={
                            p.badge === "NEW"
                              ? "px-3 py-1 text-xs font-semibold inline-block rounded-full border border-[rgba(200,84,64,0.45)] bg-[rgba(200,84,64,0.18)] text-[rgba(255,204,184,0.95)]"
                              : p.badge === "HOT"
                              ? "px-3 py-1 text-xs font-semibold inline-block rounded-full border border-[rgba(224,146,54,0.45)] bg-[rgba(224,146,54,0.18)] text-[rgba(255,222,180,0.95)]"
                              : "px-3 py-1 text-xs font-semibold inline-block rounded-full border border-[rgba(124,174,140,0.4)] bg-[rgba(124,174,140,0.16)] text-[rgba(224,244,232,0.95)]"
                          }
                        >
                          {p.badge}
                        </div>
                      </div>
                    )}

                    {p.image && (
                      <div className="mb-3 grid place-items-center overflow-hidden rounded-lg border border-[color:var(--text-muted)]/15 bg-black/20 p-3">
                        {/* Ensure transparent PNGs read well on dark */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-28 w-full max-w-[260px] object-contain"
                          draggable={false}
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <h3 className="font-display text-lg font-semibold text-[color:var(--text-pale)] leading-tight">
                        {p.name}
                      </h3>
                      <p className="text-sm text-[color:var(--text-muted)]">${p.priceUSD.toFixed(2)} USD</p>
                      {p.purchaseLimit && (
                        <div className="text-xs text-[color:var(--text-muted)]">{p.purchaseLimit}</div>
                      )}
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={() => setModalProduct(p)}
                        className="btn-outline inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors"
                      >
                        <Info className="h-4 w-4 text-[color:var(--accent-bronze)]" /> View Rewards
                      </button>
                      <button
                        onClick={() => router.push(`/shop/checkout?productId=${p.id}`)}
                        className="btn-primary inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold transition-all active:scale-[0.98]"
                      >
                        <Check className="h-4 w-4" /> Select
                      </button>
                    </div>
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
            <div className="rounded-xl p-[1px] bg-[linear-gradient(135deg,rgba(168,135,90,0.35),transparent)]">
              <div className="rounded-xl border border-[color:var(--text-muted)]/20 bg-[color:var(--bg-panel)] p-5">
                <div className="text-sm text-[color:var(--text-muted)]">Your Cumulative Spend:</div>
                <div className="mt-1 text-2xl font-semibold text-[color:var(--text-pale)]">$0</div>
                <div className="mt-1 text-xs text-[color:var(--text-muted)]">Updates automatically based on your order history once the server is live.</div>
              </div>
            </div>

            {/* Milestones */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {loyaltyMilestones.map((m, idx) => (
                <motion.div
                  key={m.threshold}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.03 }}
                  className="rounded-xl p-[1px] bg-[linear-gradient(135deg,rgba(168,135,90,0.25),transparent)]"
                >
                  <div className="rounded-xl border border-[color:var(--text-muted)]/25 bg-[color:var(--bg-panel)] p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg font-semibold text-[color:var(--text-pale)]">${m.threshold.toLocaleString()}</h3>
                      <Lock className="h-5 w-5 text-[color:var(--accent-bronze)]" />
                    </div>
                    <div className="mt-3 inline-block badge-bronze px-3 py-1 text-xs font-semibold">
                      Rewards: Coming Soon
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Claim CTA */}
            <div className="rounded-xl p-[1px] bg-[linear-gradient(135deg,rgba(168,135,90,0.35),transparent)] text-right">
              <div className="rounded-xl border border-[color:var(--text-muted)]/20 bg-[color:var(--bg-panel)] p-5">
                <button
                  disabled
                  className="cursor-not-allowed btn-primary rounded-lg px-4 py-2 text-sm font-semibold opacity-50"
                >
                  Claim Cumulative Rewards (Available once the server launches)
                </button>
              </div>
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
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="relative z-10 m-4 w-full max-w-md rounded-xl p-[1px] bg-[linear-gradient(135deg,rgba(168,135,90,0.35),transparent)] shadow-2xl"
          >
            <div className="rounded-xl border border-[color:var(--text-muted)]/20 bg-[color:var(--bg-panel)] p-4 text-[color:var(--text-pale)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-xl font-semibold heading-metallic">{product.name}</h2>
                  <p className="mt-1 text-sm text-[color:var(--text-muted)]">
                    ${product.priceUSD.toFixed(2)} USD
                  </p>
                </div>
                <button
                  aria-label="Close"
                  onClick={onClose}
                  className="rounded-md p-1 text-[color:var(--accent-bronze)] hover:bg-white/5"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium text-[color:var(--text-pale)]/90">Rewards</h3>
                {product.rewardsText && product.rewardsText.length > 0 ? (
                  <ul className="mt-2 space-y-2 text-sm">
                    {product.rewardsText.map((line, i) => (
                      <li key={i} className="rounded-lg border border-[color:var(--text-muted)]/20 bg-black/20 px-3 py-2 text-[color:var(--text-pale)]">
                        {line}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="mt-2 space-y-2 text-sm">
                    {product.rewards.map((r, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between rounded-lg border border-[color:var(--text-muted)]/20 bg-black/20 px-3 py-2"
                      >
                        <span className="text-[color:var(--text-pale)]">{r.name}</span>
                        <span className="text-[color:var(--text-muted)]">×{r.qty}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={onClose}
                  className="btn-primary rounded-lg px-4 py-1.5 text-sm font-semibold active:scale-[0.98]"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

 
