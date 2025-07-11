// src/store/missions.ts
import { create } from "zustand";
import { MissionItem } from "../types/missions";
import {
  getMissions,
  createMission as svcCreateMission,
  updateMission as svcUpdateMission,
  patchMission as svcPatchMission,
  deleteMission as svcDeleteMission,
  associateMissionToMonitoring as svcAssociateMission,
} from "../services/MissionService";

interface MissionStore {
  missions: MissionItem[];
  fetchMissions: () => Promise<void>;
  createMission: (missionData: Omit<MissionItem, "id">) => Promise<void>;
  updateMission: (
    id: number,
    missionData: Partial<Omit<MissionItem, "id">>
  ) => Promise<void>;
  patchMission: (
    id: number,
    missionData: Partial<Omit<MissionItem, "id">>
  ) => Promise<void>;
  deleteMission: (id: number) => Promise<void>;
  associateMissionToMonitoring: (
    missionId: number,
    monitoringId: number
  ) => Promise<void>;
}

export const useMissionStore = create<MissionStore>((set) => ({
  missions: [],

  fetchMissions: async () => {
    try {
      const data = await getMissions();
      set({ missions: data });
    } catch (error) {
      console.error("Erro ao buscar missões", error);
    }
  },

  createMission: async (missionData) => {
    try {
      const newMission = await svcCreateMission(missionData);
      set((state) => ({
        missions: [...state.missions, newMission],
      }));
    } catch (error) {
      console.error("Erro ao criar missão", error);
    }
  },

  updateMission: async (id, missionData) => {
    try {
      const updated = await svcUpdateMission(id, missionData);
      set((state) => ({
        missions: state.missions.map((m) => (m.id === id ? updated : m)),
      }));
    } catch (error) {
      console.error("Erro ao atualizar missão", error);
    }
  },

  patchMission: async (id, missionData) => {
    try {
      const updated = await svcPatchMission(id, missionData);
      set((state) => ({
        missions: state.missions.map((m) => (m.id === id ? updated : m)),
      }));
    } catch (error) {
      console.error("Erro ao fazer patch da missão", error);
    }
  },

  deleteMission: async (id) => {
    try {
      await svcDeleteMission(id);
      set((state) => ({
        missions: state.missions.filter((m) => m.id !== id),
      }));
    } catch (error) {
      console.error("Erro ao deletar missão", error);
    }
  },

  associateMissionToMonitoring: async (missionId, monitoringId) => {
    try {
      const updated = await svcAssociateMission(missionId, monitoringId);
      set((state) => ({
        missions: state.missions.map((m) => (m.id === missionId ? updated : m)),
      }));
    } catch (error) {
      console.error("Erro ao associar missão ao monitoramento", error);
    }
  },
}));
