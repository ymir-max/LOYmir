import { Product, LoyaltyTier, GameEvent, LoyaltyMilestone } from "./types";

export const products: Product[] = [
  {
    id: "p1",
    name: "Sample Diamond Pack $10",
    category: "currency",
    priceUSD: 10,
    rewards: [
      { name: "Diamonds", qty: 1000 },
    ],
    badge: "NEW",
  },
  {
    id: "p2",
    name: "Sample Support Pack A",
    category: "support-package",
    priceUSD: 25,
    rewards: [
      { name: "Boosters", qty: 3 },
      { name: "Skips", qty: 2 },
    ],
  },
  {
    id: "p3",
    name: "Sample Seasonal Pack",
    category: "seasonal-package",
    priceUSD: 50,
    rewards: [
      { name: "Pass Levels", qty: 15 },
      { name: "Keys", qty: 5 },
    ],
  },
];

export const loyaltyMilestones: LoyaltyMilestone[] = [
  { threshold: 10, rewardsStatus: "coming_soon" },
  { threshold: 50, rewardsStatus: "coming_soon" },
  { threshold: 100, rewardsStatus: "coming_soon" },
  { threshold: 300, rewardsStatus: "coming_soon" },
  { threshold: 500, rewardsStatus: "coming_soon" },
  { threshold: 1000, rewardsStatus: "coming_soon" },
  { threshold: 1500, rewardsStatus: "coming_soon" },
  { threshold: 2000, rewardsStatus: "coming_soon" },
  { threshold: 3000, rewardsStatus: "coming_soon" },
  { threshold: 3500, rewardsStatus: "coming_soon" },
  { threshold: 4000, rewardsStatus: "coming_soon" },
  { threshold: 4500, rewardsStatus: "coming_soon" },
  { threshold: 5000, rewardsStatus: "coming_soon" },
  { threshold: 6000, rewardsStatus: "coming_soon" },
  { threshold: 7000, rewardsStatus: "coming_soon" },
  { threshold: 8000, rewardsStatus: "coming_soon" },
  { threshold: 9000, rewardsStatus: "coming_soon" },
  { threshold: 10000, rewardsStatus: "coming_soon" },
  { threshold: 11000, rewardsStatus: "coming_soon" },
  { threshold: 12000, rewardsStatus: "coming_soon" },
  { threshold: 13000, rewardsStatus: "coming_soon" },
  { threshold: 14000, rewardsStatus: "coming_soon" },
  { threshold: 15000, rewardsStatus: "coming_soon" },
  { threshold: 18000, rewardsStatus: "coming_soon" },
  { threshold: 20000, rewardsStatus: "coming_soon" },
];

export const loyaltyTiers: LoyaltyTier[] = [
  {
    id: "t1",
    thresholdUSD: 50,
    rewards: [
      { name: "Bonus Diamonds", qty: 200 },
    ],
  },
  {
    id: "t2",
    thresholdUSD: 150,
    rewards: [
      { name: "Bonus Keys", qty: 10 },
      { name: "Exclusive Title", qty: 1 },
    ],
  },
  {
    id: "t3",
    thresholdUSD: 300,
    rewards: [
      { name: "Exclusive Skin", qty: 1 },
    ],
  },
];

export const gameEvents: GameEvent[] = [
  {
    id: "invite-earn-cash",
    displayCode: "#001",
    icon: "UserPlus",
    title: "Invite & Earn Cash",
    status: "active",
    description:
      "Invite friends to the Legend of YMIR Discord using your personal invite link and earn real cash rewards for every verified, genuine sign-up.",
    startsAt: undefined,
    endsAt: "2026-09-30",
    mechanics: [
      "Create your personal Discord invite link and share it with your friends.",
      "Invite your friends to join the Legend of YMIR Discord.",
      "Your invited players must complete verification in the Verify channel.",
      "All three steps must be completed for an invite to count.",
      "Track your verified invite count anytime in the Invite Tracker channel.",
    ],
    rewards: [
      { name: "USDT per verified invite", qty: 0.2 },
      { name: "Minimum verified invites required for payout", qty: 10 },
    ],
    rulesNote:
      "No spam or newly created Discord accounts — only genuine, verified players count. PHP payouts are converted using the daily exchange rate. Payouts are processed weekly.",
  },
  {
    id: "fb-follow-share",
    displayCode: "#002",
    icon: "Share2",
    title: "Share & Win — Facebook",
    status: "active",
    description:
      "Follow our Facebook page and share our post for a chance to win real cash prizes — up to 500 PHP.",
    startsAt: undefined,
    endsAt: "2026-09-01",
    mechanics: [
      "Follow the official Legend of YMIR Facebook page.",
      "Share our post in Legend of YMIR–related or other MMO-related Facebook community groups.",
      "1 valid share in a Legend of YMIR–related group = 1 raffle entry; 3 valid shares in other MMO-related groups = 1 raffle entry.",
      "Submit links to your shared posts through the entry form.",
      "Shared posts must remain public until the event ends so they can be verified.",
    ],
    rewards: [
      { name: "Grand Prize (PHP)", qty: 500 },
      { name: "Second Prize (PHP) — 2 winners", qty: 200 },
      { name: "Third Prize (PHP) — 3 winners", qty: 100 },
    ],
    rulesNote:
      "All valid raffle entries are recorded against your Discord ID. Prizes can be converted to another currency using the daily exchange rate on request.",
  },
  {
    id: "tiktok-follow-share",
    displayCode: "#003",
    icon: "Video",
    title: "Share & Win — TikTok",
    status: "active",
    description:
      "Follow our TikTok channel and repost our video for a chance to win real cash prizes.",
    startsAt: undefined,
    endsAt: "2026-09-12",
    mechanics: [
      "Follow the official Legend of YMIR TikTok channel.",
      "Share or repost the official TikTok video.",
      "Each valid share counts as 1 raffle entry — share from multiple TikTok accounts for more entries.",
      "Submit links to your shared posts through the entry form.",
      "Shared posts must remain public until the event ends so they can be verified.",
    ],
    rewards: [
      { name: "Grand Prize (USDT)", qty: 15 },
      { name: "Second Prize (USDT) — 2 winners", qty: 10 },
      { name: "Third Prize (USDT) — 3 winners", qty: 5 },
    ],
    rulesNote:
      "All valid raffle entries are recorded against your Discord ID. Prizes can be converted to another currency using the daily exchange rate on request.",
  },
];

// --- Official shop mock data (no checkout/back-end/wallet) ---

export const currencyProducts: Product[] = [
  {
    id: "c-167",
    name: "16,700 YMIR Points",
    category: "currency",
    priceUSD: 167,
    rewards: [{ name: "YMIR Points", qty: 16700 }],
  },
  {
    id: "c-333",
    name: "33,400 YMIR Points",
    category: "currency",
    priceUSD: 333,
    rewards: [{ name: "YMIR Points", qty: 33400 }],
  },
  {
    id: "c-997",
    name: "100,000 YMIR Points",
    category: "currency",
    priceUSD: 997,
    rewards: [{ name: "YMIR Points", qty: 100000 }],
  },
];

export const specialPackages: Product[] = [
  {
    id: "sp-weekly-summon",
    name: "Weekly Special Summon Package",
    category: "support-package",
    priceUSD: 167,
    rewards: [
      { name: "Diamond", qty: 3000 },
      { name: "Sol's Summon Ticket x11 Selection Chest", qty: 26 },
      { name: "Radiant Story Deck Point Chest", qty: 10 },
      { name: "Middle Scroll Package", qty: 10 },
    ],
  },
  {
    id: "sp-weekly-blazon",
    name: "Weekly Special Blazon Package",
    category: "support-package",
    priceUSD: 167,
    rewards: [
      { name: "Diamond", qty: 3000 },
      { name: "Blazon x11 Selection Chest", qty: 26 },
      { name: "Option Enchant Scroll", qty: 20 },
      { name: "Middle Scroll Package", qty: 10 },
    ],
  },
  {
    id: "sp-monthly-summon",
    name: "Monthly Special Summon Package",
    category: "support-package",
    priceUSD: 333,
    rewards: [
      { name: "Diamond", qty: 6000 },
      { name: "Sol's Summon Ticket x11 Selection Chest", qty: 56 },
      { name: "Noble Story Deck Point Chest", qty: 4 },
      { name: "Radiant Story Deck Point Chest", qty: 20 },
      { name: "Middle Scroll Package", qty: 20 },
    ],
    badge: "MONTHLY",
  },
  {
    id: "sp-monthly-blazon",
    name: "Monthly Special Blazon Package",
    category: "support-package",
    priceUSD: 333,
    rewards: [
      { name: "Diamond", qty: 6000 },
      { name: "Blazon x11 Selection Chest", qty: 56 },
      { name: "Option Enchant Scroll", qty: 40 },
      { name: "Middle Scroll Package", qty: 20 },
    ],
    badge: "MONTHLY",
  },
  {
    id: "sp-weekly-all-in-one",
    name: "Weekly All-in-One Package",
    category: "support-package",
    priceUSD: 997,
    rewards: [
      { name: "Ymir's Supply I", qty: 1 },
      { name: "Ymir's Supply II", qty: 1 },
      { name: "Ymir's Supply III", qty: 1 },
      { name: "Asgard's Veteran Soldier", qty: 1 },
      { name: "Heart of Asgard I", qty: 1 },
      { name: "Heart of Asgard II", qty: 1 },
      { name: "Heart of Asgard III", qty: 1 },
      { name: "Fate Enhancement Premium Package", qty: 1 },
      { name: "Fate Enhancement Support Package", qty: 1 },
      { name: "Epic Crystal Stone of Promotion Support Chest", qty: 1 },
    ],
    badge: "BEST VALUE",
  },
];
