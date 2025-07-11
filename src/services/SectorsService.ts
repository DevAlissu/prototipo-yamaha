import api from "./api";
import { Sector } from "../types/sectors";

export const getSectors = async (): Promise<Sector[]> => {
  const response = await api.get<Sector[]>("/setors/");
  return response.data;
};

export const getSectorById = async (id: number): Promise<Sector> => {
  const response = await api.get<Sector>(`/setors/${id}/`);
  return response.data;
};

export const createSector = async (data: Omit<Sector, "id" | "created_at">) => {
  const response = await api.post("/setors/", data);
  return response.data;
};


export const updateSector = async (id: number, data: Omit<Sector, "id" | "created_at">) => {
  const response = await api.put(`/setors/${id}/`, data);
  return response.data;
};


export const deleteSector = async (id: number) => {
  await api.delete(`/setors/${id}/`);
};
