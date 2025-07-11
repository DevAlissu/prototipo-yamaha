// types/sections.ts
import { IoTDevice } from "./IoTDevice";

export interface SectionItem {
  id: number;
  name: string;
  description: string | null;
  is_monitored: boolean;
  monitoring: number | null;
  device_iots: number[];

  setor: number | null;
  productionLine: number | null;
  equipament: number | null;

  // Se um dia vier objetos completos:
  DeviceIots?: IoTDevice[];

  type_section: number | null;
  secticon_parent: number | null;
  sections_filhas?: SectionItem[];
  estimated_consumption?: number;
  power?: number | null;
  tension?: number | null;
  min_consumption?: number | null;
  max_consumption?: number | null;
  type?: "sector" | "productionLine" | "equipment";

  // Novos campos para alerta de funcionamento
  alert_funcionamento?: boolean;
  funcionamento_inicio?: string | null;
  funcionamento_fim?: string | null;
}
