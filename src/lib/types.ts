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
