// src/services/monitoringSensorService.ts

import api from "./api";
import type { MonitoringItem } from "../types/monitoringTypes";

/**
 * 1) Buscar todos os monitoramentos do tipo “Nansenson”
 */
export const fetchMonitoringsSensor = async (): Promise<MonitoringItem[]> => {
  const response = await api.get<MonitoringItem[]>("/monitorings/");
  // → filtra exatamente pelo valor “Nansenson” que o backend devolve
  return response.data.filter((m) => m.type_mmonitoring === "Nansenson");
};

/**
 * 2) Buscar um monitoramento Sensor por ID
 */
export const fetchMonitoringSensorById = async (
  id: number
): Promise<MonitoringItem> => {
  const response = await api.get<MonitoringItem>(`/monitorings/${id}/`);
  return response.data;
};

/**
 * 3) Criar novo monitoramento Sensor
 */
export const createMonitoringSensor = async (
  data: Omit<MonitoringItem, "id" | "created_at" | "type_mmonitoring">
): Promise<MonitoringItem> => {
  const payload = {
    ...data,
    type_mmonitoring: "Nansenson" as const, // → força “Nansenson” no POST
  };
  const response = await api.post<MonitoringItem>("/monitorings/", payload);
  return response.data;
};

/**
 * 4) Atualizar monitoramento Sensor (mantendo type_mmonitoring)
 */
export const updateMonitoringSensor = async (
  id: number,
  data: Partial<Omit<MonitoringItem, "id" | "created_at" | "type_mmonitoring">>
): Promise<MonitoringItem> => {
  const response = await api.put<MonitoringItem>(`/monitorings/${id}/`, data);
  return response.data;
};

/**
 * 5) Deletar monitoramento Sensor
 */
export const deleteMonitoringSensor = async (id: number): Promise<void> => {
  await api.delete(`/monitorings/${id}/`);
};

/**
 * 6) Buscar lista de seções vinculadas a um monitoramento Sensor
 */
export const fetchSectionsForSensor = async (
  monitoringId: number
): Promise<any[]> => {
  const response = await api.get<any[]>(
    `/sections/?monitoring=${monitoringId}`
  );
  return response.data;
};

/**
 * 7) Criar seção para monitoramento Sensor
 */
export const createSectionForSensor = async (
  data: Partial<any> & { monitoring: number }
): Promise<any> => {
  const response = await api.post<any>("/sections/", data);
  return response.data;
};

/**
 * 8) Buscar seção específica (usada no editar seção)
 */
export const getSectionByIdForSensor = async (
  sectionId: number
): Promise<any> => {
  const response = await api.get<any>(`/sections/${sectionId}/`);
  return response.data;
};

/**
 * 9) Atualizar seção de Sensor
 */
export const updateSectionForSensor = async (
  id: number,
  data: Partial<any>
): Promise<any> => {
  const response = await api.patch<any>(`/sections/${id}/`, data);
  return response.data;
};

/**
 * 10) Deletar seção de Sensor (corresponde a remover uma seção específica)
 */
export const deleteSectionForSensor = async (id: number): Promise<void> => {
  await api.delete(`/sections/${id}/`);
};
