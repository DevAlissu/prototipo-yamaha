export interface EnergyBillingItem {
  id: number;
  year: number;
  month: string;
  generator_issue_date: string;
  generator_consumed: number;
  generator_cost: number;
  generator_invoice_file?: string;
  distributor_issue_date: string;
  distributor_consumed: number;
  distributor_cost: number;
  distributor_invoice_file?: string;
  units_produced: number;
  total_consumed?: number;
  total_cost?: number;
  cost_per_unit?: number;
  total_carbon_footprint?: number;
  carbon_per_unit?: number;
  created_at?: string;
  updated_at?: string;
}
