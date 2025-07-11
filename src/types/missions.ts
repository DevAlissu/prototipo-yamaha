// src/types/missions.ts
export interface MissionItem {
  id: number;
  users: number[];
  name: string;
  description: string;
  //quantity_na: number; // sempre vem como número
  energy_meta: number;
  nansen_coins: number;
  quantity_xp: number;
  status: "Pendente" | "Em Andamento" | "Finalizada";
  date_start: string; // ISO date-time
  date_end: string | null; // ISO date-time ou null
  order_production: number | null;
  quantity_product: number | null;
  is_order_production: boolean;
  monitoring: number | { id: number } | null;
  product: number | null;
  quiz: number | null;
}
