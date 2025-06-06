interface Diagnostic {
  id?: string;
  recommendations: string[];
  current_kwh: number;
  optimized_kwh: number;
  total_saving_percent: number;
  create_date: string;
}

export interface CreateDiagnosticForm {
  current_kwh: number;
  selected_ids: number[];
}
