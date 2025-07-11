// src/services/MissionService.ts
import api from "./api";
import { MissionItem } from "../types/missions";

export async function getMissions(): Promise<MissionItem[]> {
  const response = await api.get<MissionItem[]>("/missions/");
  return response.data;
}

export async function createMission(
  payload: Omit<MissionItem, "id">
): Promise<MissionItem> {
  const response = await api.post<MissionItem>("/missions/", payload);
  return response.data;
}

export async function updateMission(
  id: number,
  payload: Partial<Omit<MissionItem, "id">>
): Promise<MissionItem> {
  const response = await api.put<MissionItem>(`/missions/${id}/`, payload);
  return response.data;
}

export async function deleteMission(id: number): Promise<void> {
  await api.delete(`/missions/${id}/`);
}

export async function patchMission(
  id: number,
  payload: Partial<Omit<MissionItem, "id">>
): Promise<MissionItem> {
  console.log(`PATCH /missions/${id}/`, payload);
  const response = await api.patch<MissionItem>(`/missions/${id}/`, payload);
  return response.data;
}

export async function associateMissionToMonitoring(
  missionId: number,
  monitoringId: number
): Promise<MissionItem> {
  // Reutiliza o endpoint de atualização parcial para alterar só o campo "monitoring"
  return patchMission(missionId, { monitoring: monitoringId });
}
