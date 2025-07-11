// Definindo tipos permitidos para o campo 'type' do FormField
// Definindo tipos permitidos para o campo 'type' do FormField
export type FormFieldType =
  | "text"
  | "input"
  | "select"
  | "number"
  | "upload"
  | "textarea"
  | "file"
  | "password"
  | "transfer"
  | "checkbox"
  | "switch"
  | "readonly"
  | "multiselect" // <-- CORRETO, sem ; no meio!
  | "date"; // <--- NOVO!
// A interface que descreve o campo do formulário
// formTypes.ts
export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  options?: { value: string | number; label: string }[];
  fetchOptions?: () => Promise<{ value: string | number; label: string }[]>;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: any) => void;
  value?: string | number | boolean | null;
  colSpan?: number; // << ADICIONE AQUI
}
// Interface para o componente de formulário dinâmico
export interface DynamicFormProps {
  fields: FormField[]; // Lista de campos do formulário
  initialValues?: Record<string, any>; // Valores iniciais para os campos do formulário
  onSubmit: (values: Record<string, any>) => void; // Função de envio com os valores do formulário
}
