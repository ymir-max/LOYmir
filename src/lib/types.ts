export interface Product {
  id: string;
  name: string;
  category: "currency" | "support-package" | "seasonal-package";
  priceUSD: number;
  badge?: string;
  rewards: Array<{ name: string; qty: number }>;
}

export interface LoyaltyTier {
  id: string;
  thresholdUSD: number;
  rewards: Array<{ name: string; qty: number }>;
}

export interface LoyaltyMilestone {
  threshold: number;
  rewardsStatus: "coming_soon";
}

export interface GameEvent {
  id: string;
  displayCode: string; // e.g. "#001"
  icon: string; // lucide-react icon name, e.g. "Users"
  title: string;
  status: "active" | "ended";
  description: string;
  startsAt?: string;
  endsAt?: string;
  mechanics: string[];
  rewards: Array<{ name: string; qty: number }>;
  rulesNote: string;
}

export interface EventClaim {
  discordUsername: string;
  characterName: string;
  playerId: string;
  communityLinks: string[];
  status: "pending" | "approved" | "rejected";
  referenceCode: string;
}
