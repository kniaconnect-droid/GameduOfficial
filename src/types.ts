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
