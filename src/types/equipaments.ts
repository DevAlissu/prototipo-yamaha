export interface EquipamentItem {
  id: number;
  name: string;
  description?: string | null;
  power: number | null;
  tension: number | null;
  energy_consumption: number | null;
  max_consumption: number | null;
  min_consumption: number | null;
  production_line: number | null;
  created_at: string;
}