export interface ProductLojaItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;
  disponivel: boolean;
  created_at: string;
  updated_at: string;
}
