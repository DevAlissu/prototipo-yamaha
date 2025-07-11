import api from "./api";
import { ProductLojaItem } from "../types/lojaTypes";

// 🔹 Listar produtos da loja
export const getStoreProducts = async (): Promise<ProductLojaItem[]> =>
  (await api.get("/products_loja/")).data;

// 🔹 Criar novo produto da loja
export const createStoreProduct = async (
  data: FormData
): Promise<ProductLojaItem> => {
  const response = await api.post("/products_loja/", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// 🔹 Atualizar produto existente
export const updateStoreProduct = async (
  id: number,
  data: FormData
): Promise<ProductLojaItem> => {
  const response = await api.put(`/products_loja/${id}/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// 🔹 Deletar produto
export const deleteStoreProduct = async (id: number): Promise<void> =>
  await api.delete(`/products_loja/${id}/`);
