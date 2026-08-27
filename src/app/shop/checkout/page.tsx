"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { currencyProducts, specialPackages } from "@/lib/mock-data";
import type { Product } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const steps = [
  { key: 1, label: "Amount" },
  { key: 2, label: "Player Info" },
  { key: 3, label: "Payment" },
  { key: 4, label: "Receipt" },
  { key: 5, label: "Complete" },
] as const;

type Currency = "USD" | "PHP" | "GBP";

function formatCurrency(value: number, c: Currency): string {
  const symbol = c === "USD" ? "$" : c === "PHP" ? "₱" : "£";
  return `${symbol}${value.toFixed(2)} ${c}`;
}

function randomRef(prefix = "ORD-") {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 8; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return prefix + s;
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold">Checkout</h1>
          <div className="rounded-xl border border-white/10 bg-black/40 p-6 text-zinc-300">Loading…</div>
        </div>
      }
    >
      <CheckoutInner />
    </Suspense>
  );
}

function CheckoutInner() {
  const router = useRouter();
  const search = useSearchParams();
  const productId = search.get("productId") || "";

  const product: Product | undefined = useMemo(() => {
    const all = [...currencyProducts, ...specialPackages];
    return all.find((p) => p.id === productId);
  }, [productId]);

  // overall state
  const [step, setStep] = useState<number>(1);
  const [username, setUsername] = useState("");
  const [character, setCharacter] = useState("");
  const [qty, setQty] = useState(1);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [promo, setPromo] = useState("");
  const [promoMsg, setPromoMsg] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [orderRef] = useState(randomRef());

  const totalUSD = useMemo(() => (product ? product.priceUSD * qty : 0), [product, qty]);

  if (!product) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">Checkout</h1>
        <div className="rounded-xl border border-white/10 bg-black/40 p-6">
          <p className="text-zinc-300">Package not found.</p>
          <button
            onClick={() => router.push("/shop")}
            className="mt-4 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const canContinue = () => {
    if (step === 1) return true;
    if (step === 2) return username.trim() && character.trim();
    if (step === 3) return Boolean(paymentMethod);
    if (step === 4) return Boolean(receiptFile);
    return true;
  };

  const next = () => setStep((s) => Math.min(5, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const applyPromo = () => {
    if (promo.trim().toUpperCase() === "TEST10") {
      setPromoMsg("10% off applied (mock)");
    } else if (promo.trim()) {
      setPromoMsg("Invalid or expired code");
    } else {
      setPromoMsg(null);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold tracking-wide">Checkout</h1>

      {/* Stepper */}
      <div className="rounded-xl border border-white/10 bg-black/40 p-4">
        <ol className="grid grid-cols-5 gap-2">
          {steps.map((s, i) => {
            const isActive = step === s.key;
            const isDone = step > s.key;
            const isLocked = step < s.key;
            return (
              <li key={s.key} className="flex items-center gap-2">
                <div
                  className={clsx(
                    "relative flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold",
                    isActive && "bg-zinc-100 text-black border-zinc-100",
                    isDone && "bg-violet-500/80 text-black border-violet-400",
                    isLocked && !isActive && !isDone && "border-white/20 text-zinc-400"
                  )}
                >
                  {s.key}
                </div>
                <span className={clsx("text-sm", isLocked && !isActive ? "text-zinc-400" : "text-zinc-200")}>{s.label}</span>
                {i < steps.length - 1 && <div className="mx-2 h-px flex-1 bg-white/10" />}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Content */}
      <div className="relative min-h-[320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border border-white/10 bg-black/40 p-6"
          >
            {step === 1 && (
              <StepAmount product={product} onChangePackage={() => router.push("/shop")} />
            )}
            {step === 2 && (
              <StepPlayerInfo
                username={username}
                character={character}
                qty={qty}
                currency={currency}
                price={product.priceUSD}
                onUsername={setUsername}
                onCharacter={setCharacter}
                onQty={(n) => setQty(Math.min(10, Math.max(1, n)))}
                onCurrency={setCurrency}
              />
            )}
            {step === 3 && (
              <StepPayment
                product={product}
                qty={qty}
                username={username}
                character={character}
                totalUSD={totalUSD}
                promo={promo}
                promoMsg={promoMsg}
                onPromo={setPromo}
                onApplyPromo={applyPromo}
                paymentMethod={paymentMethod}
                onPaymentMethod={setPaymentMethod}
              />
            )}
            {step === 4 && (
              <StepReceipt
                file={receiptFile}
                onFile={setReceiptFile}
                notes={notes}
                onNotes={(v) => setNotes(v.slice(0, 1000))}
              />
            )}
            {step === 5 && (
              <StepComplete
                orderRef={orderRef}
                product={product}
                qty={qty}
                totalUSD={totalUSD}
                onBackToShop={() => router.push("/shop")}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={prev}
          disabled={step === 1}
          className={clsx(
            "rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-200 hover:bg-white/5",
            step === 1 && "opacity-50 cursor-not-allowed"
          )}
        >
          Back
        </button>
        {step < 5 ? (
          <button
            onClick={() => canContinue() && next()}
            disabled={!canContinue()}
            className={clsx(
              "rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200",
              !canContinue() && "opacity-50 cursor-not-allowed"
            )}
          >
            Continue
          </button>
        ) : (
          <button
            onClick={() => router.push("/shop")}
            className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
          >
            Back to Shop
          </button>
        )}
      </div>
    </div>
  );
}

function StepAmount({ product, onChangePackage }: { product: Product; onChangePackage: () => void }) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-lg bg-white/5 border border-white/10" />
        <div>
          <h2 className="text-lg font-semibold text-white">{product.name}</h2>
          <p className="text-sm text-zinc-400">${product.priceUSD.toFixed(2)} USD</p>
        </div>
      </div>
      <button onClick={onChangePackage} className="text-sm text-violet-300 hover:text-violet-200">
        Change Package
      </button>
    </div>
  );
}

function StepPlayerInfo(props: {
  username: string;
  character: string;
  qty: number;
  currency: Currency;
  price: number;
  onUsername: (v: string) => void;
  onCharacter: (v: string) => void;
  onQty: (n: number) => void;
  onCurrency: (c: Currency) => void;
}) {
  const total = props.price * props.qty;
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-zinc-300">Username (Login ID)</label>
          <input
            value={props.username}
            onChange={(e) => props.onUsername(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-200 outline-none focus:ring-2 focus:ring-violet-400/60"
            placeholder="Enter your Login ID"
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-300">Character Name</label>
          <input
            value={props.character}
            onChange={(e) => props.onCharacter(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-200 outline-none focus:ring-2 focus:ring-violet-400/60"
            placeholder="Enter your Character Name"
          />
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-black/30 p-4">
        <h3 className="text-sm font-medium text-zinc-300">Support Amount</h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => props.onQty(props.qty - 1)}
              className="h-9 w-9 rounded-lg border border-white/10 text-lg hover:bg-white/5"
              disabled={props.qty <= 1}
            >
              −
            </button>
            <input
              type="number"
              min={1}
              max={10}
              value={props.qty}
              onChange={(e) => props.onQty(parseInt(e.target.value || "1", 10))}
              className="h-9 w-16 rounded-lg border border-white/10 bg-black/30 text-center text-sm"
            />
            <button
              onClick={() => props.onQty(props.qty + 1)}
              className="h-9 w-9 rounded-lg border border-white/10 text-lg hover:bg-white/5"
              disabled={props.qty >= 10}
            >
              +
            </button>
          </div>
          <div>
            <label className="block text-xs text-zinc-400">Currency</label>
            <div className="mt-1 inline-flex rounded-lg border border-white/10 p-1">
              {["USD", "PHP", "GBP"].map((c) => (
                <button
                  key={c}
                  onClick={() => props.onCurrency(c as Currency)}
                  className={clsx(
                    "px-3 py-1 text-sm rounded-md",
                    props.currency === c
                      ? "bg-zinc-100 text-black"
                      : "text-zinc-300 hover:text-white"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 text-sm text-zinc-300">
          Total Payment: <span className="font-semibold">{formatCurrency(total, props.currency)}</span>
          <span className="ml-2 text-xs text-zinc-500">(USD amount used for payment processing: ${total.toFixed(2)})</span>
        </div>
      </div>
    </div>
  );
}

function StepPayment(props: {
  product: Product;
  qty: number;
  username: string;
  character: string;
  totalUSD: number;
  promo: string;
  promoMsg: string | null;
  onPromo: (v: string) => void;
  onApplyPromo: () => void;
  paymentMethod: string | null;
  onPaymentMethod: (m: string) => void;
}) {
  const cards = [
    { key: "PayPal", desc: "PayPal account info (mock)" },
    { key: "GCash", desc: "Scan the QR or use account details (mock)" },
    { key: "Wise", desc: "Wise transfer details (mock)" },
    { key: "Bybit (USDT TRC20)", desc: "Wallet address (mock)" },
  ];
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-white/10 bg-black/30 p-4 text-sm text-zinc-300">
        <h3 className="text-base font-semibold text-white">Order Summary</h3>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <div>Username: <span className="text-zinc-200">{props.username || "-"}</span></div>
          <div>Character: <span className="text-zinc-200">{props.character || "-"}</span></div>
          <div>Package: <span className="text-zinc-200">{props.product.name}</span></div>
          <div>Quantity: <span className="text-zinc-200">{props.qty}</span></div>
          <div>Total (USD): <span className="text-zinc-200">${props.totalUSD.toFixed(2)}</span></div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto] items-end">
        <div>
          <label className="block text-sm text-zinc-300">Promo Code</label>
          <input
            value={props.promo}
            onChange={(e) => props.onPromo(e.target.value)}
            placeholder="Enter code (try TEST10)"
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-200 outline-none focus:ring-2 focus:ring-violet-400/60"
          />
          {props.promoMsg && (
            <p className="mt-1 text-xs text-zinc-400">{props.promoMsg}</p>
          )}
        </div>
        <button
          onClick={props.onApplyPromo}
          className="h-9 rounded-lg bg-zinc-100 px-4 text-sm font-medium text-black hover:bg-zinc-200"
        >
          Apply
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <button
            key={c.key}
            onClick={() => props.onPaymentMethod(c.key)}
            className={clsx(
              "rounded-xl border border-white/10 bg-black/30 p-4 text-left hover:bg-white/5",
              props.paymentMethod === c.key && "ring-2 ring-violet-400/60"
            )}
          >
            <div className="text-base font-semibold text-white">{c.key}</div>
            <div className="mt-1 text-sm text-zinc-400">{c.desc}</div>
            {props.paymentMethod === c.key && (
              <div className="mt-3 rounded-lg border border-white/10 bg-black/20 p-3 text-sm text-zinc-300">
                {c.key === "GCash" ? (
                  <div>
                    <div className="mb-2 h-28 w-full rounded-lg bg-white/5" />
                    <div>Account Name: <span className="text-zinc-200">Legend of Ymir (Mock)</span></div>
                    <div>Account Number: <span className="text-zinc-200">09XX-XXX-XXXX</span></div>
                  </div>
                ) : (
                  <div>
                    <div>Account / Wallet: <span className="text-zinc-200">Provided on request (Mock)</span></div>
                    <div>Reference: <span className="text-zinc-200">Use order ref on next step</span></div>
                  </div>
                )}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepReceipt(props: {
  file: File | null;
  onFile: (f: File | null) => void;
  notes: string;
  onNotes: (v: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-zinc-300">Upload Receipt</label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.pdf"
          onChange={(e) => props.onFile(e.target.files?.[0] ?? null)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-200 file:mr-4 file:rounded-md file:border-0 file:bg-zinc-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-black hover:file:bg-zinc-200"
        />
        <p className="mt-2 text-xs text-zinc-400">
          Max 5MB. Ensure the receipt clearly shows: amount, recipient, date, and transaction ID.
        </p>
        {props.file && (
          <p className="mt-2 text-sm text-zinc-300">Selected: {props.file.name}</p>
        )}
      </div>
      <div>
        <label className="block text-sm text-zinc-300">Additional Notes (optional)</label>
        <textarea
          value={props.notes}
          onChange={(e) => props.onNotes(e.target.value)}
          rows={5}
          className="mt-1 w-full resize-y rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-200 outline-none focus:ring-2 focus:ring-violet-400/60"
          placeholder="Anything else we should know about this payment"
        />
        <div className="mt-1 text-right text-xs text-zinc-400">{props.notes.length}/1000</div>
      </div>
      <div className="rounded-lg border border-white/10 bg-black/30 p-4 text-sm text-zinc-300">
        After submitting, our team will manually review your receipt and confirm the order.
      </div>
    </div>
  );
}

function StepComplete(props: {
  orderRef: string;
  product: Product;
  qty: number;
  totalUSD: number;
  onBackToShop: () => void;
}) {
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto h-16 w-16 rounded-full bg-violet-500/20 border border-violet-400/40" />
      <h2 className="text-2xl font-semibold text-white">Order Submitted</h2>
      <p className="text-sm text-zinc-300">Reference Code: <span className="font-mono">{props.orderRef}</span></p>
      <div className="mx-auto max-w-md rounded-lg border border-white/10 bg-black/30 p-4 text-left text-sm text-zinc-300">
        <div>Package: <span className="text-zinc-200">{props.product.name}</span></div>
        <div>Quantity: <span className="text-zinc-200">{props.qty}</span></div>
        <div>Total (USD): <span className="text-zinc-200">${props.totalUSD.toFixed(2)}</span></div>
      </div>
      <button
        onClick={props.onBackToShop}
        className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
      >
        Back to Shop
      </button>
    </div>
  );
}
