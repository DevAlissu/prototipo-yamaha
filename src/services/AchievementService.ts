// src/services/AchievementService.ts
import api from "./api";

export interface AchievementItem {
  id: number;
  description: string;
  nansen_coins: number;
  quantity_xp: number;
  nivel: number;
  created_at: string;
  updated_at: string;
  user_achievement: number;
  mission: number | null;
}

// GET /achivements/?user_achievement={userId}
export function getUserAchievements(
  userId: number
): Promise<AchievementItem[]> {
  return api
    .get<AchievementItem[]>("/achivements/", {
      params: { user_achievement: userId },
    })
    .then((r) => r.data);
}
