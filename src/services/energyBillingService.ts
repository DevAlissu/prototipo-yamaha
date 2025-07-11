import api from "./api";
import { EnergyBillingItem } from "../types/energyBilling";

// Listar todos
export const getAllBillings = async (): Promise<EnergyBillingItem[]> => {
  const res = await api.get("/energy-billing/");
  return res.data;
};

// Buscar por ID
export const getBillingById = async (
  id: number
): Promise<EnergyBillingItem> => {
  const res = await api.get(`/energy-billing/${id}/`);
  return res.data;
};

// Criar (AGORA ACEITA FORMDATA)
export const createBilling = async (
  billing: FormData // <--- aqui troca!
): Promise<EnergyBillingItem> => {
  const res = await api.post("/energy-billing/", billing, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Atualizar (AGORA ACEITA FORMDATA)
export const updateBilling = async (
  id: number,
  billing: FormData // <--- aqui troca!
): Promise<EnergyBillingItem> => {
  const res = await api.put(`/energy-billing/${id}/`, billing, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const patchBilling = async (
  id: number,
  billing: Partial<EnergyBillingItem>
): Promise<EnergyBillingItem> => {
  const res = await api.patch(`/energy-billing/${id}/`, billing);
  return res.data;
};

// Deletar
export const deleteBilling = async (id: number): Promise<void> => {
  await api.delete(`/energy-billing/${id}/`);
};
