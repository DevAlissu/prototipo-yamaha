// src/hooks/useUserDetails.ts
import { useState } from "react";
import {
  getUserAchievements,
  AchievementItem,
} from "../services/AchievementService";
import { getUserClaims, ClaimItem } from "../services/ClaimService";

// <-- this path must exactly match the service file name
import { getRewardById, RewardItem } from "../services/RewardService";

export function useUserDetails() {
  const [cache, setCache] = useState<
    Record<number, { achievements: AchievementItem[]; rewards: RewardItem[] }>
  >({});

  async function load(userId: number) {
    if (cache[userId]) return;
    const [ach, claims] = await Promise.all([
      getUserAchievements(userId),
      getUserClaims(userId),
    ]);
    // now fetch each reward by its ID
    const rewards = await Promise.all(
      claims.map((c) => getRewardById(c.reward))
    );
    setCache((c) => ({ ...c, [userId]: { achievements: ach, rewards } }));
  }

  return { cache, load };
}
