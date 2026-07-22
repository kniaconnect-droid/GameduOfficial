export interface GameRecord {
  gameId: string;
  gameName: string;
  date: string;
  score: number;
  mistakes: number;
  durationSec: number;
  cognitiveGain: string;
}

export interface CustomNote {
  id: string;
  date: string;
  text: string;
  author: string;
}

export interface UserProfile {
  id: string;
  name: string;
  role: "parent" | "teacher" | "therapist";
  isPremium: boolean;
  // Timestamp (ms) kapan langganan premium berakhir. Dipakai buat nampilin
  // teks welcoming + reminder expired di PremiumStatusBanner.
  premiumUntil?: number | null;
  studentName: string;
  studentAge: number;
  history: GameRecord[];
}

export interface Game {
  id: string;
  name: string;
  ageRange: string;
  premium: boolean;
  description: string;
  coverImage: string;
}
