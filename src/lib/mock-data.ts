import { GameEvent } from "./types";

export const gameEvents: GameEvent[] = [
  {
    id: "invite-earn-cash",
    displayCode: "#001",
    icon: "UserPlus",
    title: "Invite & Earn Cash",
    status: "active",
    description:
      "Invite friends to the Astral Discord using your personal invite link and earn real cash rewards for every verified, genuine sign-up.",
    startsAt: undefined,
    endsAt: "2026-09-30",
    mechanics: [
      "Create your personal Discord invite link and share it with your friends.",
      "Invite your friends to join the Astral Discord.",
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
      "Follow the official Astral Facebook page.",
      "Share our post in Astral-related or other MMO-related Facebook community groups.",
      "1 valid share in an Astral-related group = 1 raffle entry; 3 valid shares in other MMO-related groups = 1 raffle entry.",
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
      "Follow the official Astral TikTok channel.",
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
