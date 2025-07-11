// src/services/ClaimService.ts
import api from "./api";

export interface ClaimItem {
  id: number;
  data_claim: string;
  description: string;
  user_claim: number;
  reward: number;
}

// GET /claims/?user_claim={userId}
export function getUserClaims(userId: number): Promise<ClaimItem[]> {
  return api
    .get<ClaimItem[]>("/claims/", { params: { user_claim: userId } })
    .then((r) => r.data);
}
