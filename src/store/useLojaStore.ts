import { create } from "zustand";
import { message } from "antd";
import {
  getStoreProducts,
  createStoreProduct,
  updateStoreProduct,
  deleteStoreProduct,
} from "../services/lojaService";
import { ProductLojaItem } from "../types/lojaTypes";

interface LojaState {
  products: ProductLojaItem[];
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: number) => Promise<ProductLojaItem>;
  createProduct: (data: FormData) => Promise<void>;
  editProduct: (id: number, data: FormData) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

export const useLojaStore = create<LojaState>((set, get) => ({
  products: [],

  fetchProducts: async () => {
    try {
      const products = await getStoreProducts();
      set({ products });
    } catch (error) {
      console.error(error);
      message.error("Erro ao carregar produtos!");
    }
  },

  fetchProductById: async (id) => {
    const product = get().products.find((p) => p.id === id);
    if (product) return product;
    throw new Error("Produto não encontrado");
  },

  createProduct: async (data) => {
    try {
      const product = await createStoreProduct(data);
      set({ products: [...get().products, product] });
    } catch (error: any) {
      console.error('Erro completo:', error);
      
      let errorMessage = "Erro ao criar produto!";
      if (error.response?.data) {
        console.error('Dados do erro:', error.response.data);
        if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        } else if (typeof error.response.data === 'object') {
          const firstError = Object.values(error.response.data)[0];
          if (Array.isArray(firstError)) {
            errorMessage = firstError[0];
          } else if (typeof firstError === 'string') {
            errorMessage = firstError;
          }
        }
      }
      
      message.error(errorMessage);
      throw error;
    }
  },

  editProduct: async (id, data) => {
    try {
      const updated = await updateStoreProduct(id, data);
      set({
        products: get().products.map((p) => (p.id === id ? updated : p)),
      });
    } catch (error: any) {
      console.error('Erro completo:', error);
      
      let errorMessage = "Erro ao editar produto!";
      if (error.response?.data) {
        console.error('Dados do erro:', error.response.data);
        if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        } else if (typeof error.response.data === 'object') {
          const firstError = Object.values(error.response.data)[0];
          if (Array.isArray(firstError)) {
            errorMessage = firstError[0];
          } else if (typeof firstError === 'string') {
            errorMessage = firstError;
          }
        }
      }
      
      message.error(errorMessage);
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      await deleteStoreProduct(id);
      set({ products: get().products.filter((p) => p.id !== id) });
      message.success("Produto excluído!");
    } catch (error) {
      console.error(error);
      message.error("Erro ao excluir produto!");
      throw error;
    }
  },
}));
