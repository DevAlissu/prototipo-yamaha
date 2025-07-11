export interface ProductionLine {
  id: number;
  name: string;
  description?: string | null;
  value_mensuration_estimated: number;
  setor?: number | null;
  created_at: string;
}

export interface ProductionLineCreate {
  name: string;
  description?: string | null;
  value_mensuration_estimated: number;
  setor?: number | null;
}