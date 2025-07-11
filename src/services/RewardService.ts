// src/services/RewardService.ts
import api from "./api";

export interface RewardItem {
  id: number;
  description: string;
  points: number;
  type_reward: "TIPO_REWARD_A" | "TIPO_REWARD_B";
  mission: number | null;
}

// named export ✅
export function getRewardById(id: number): Promise<RewardItem> {
  return api.get<RewardItem>(`/rewards/${id}/`).then((r) => r.data);
}
