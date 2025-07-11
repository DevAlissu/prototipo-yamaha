import { create } from "zustand";
import { message } from "antd";
import { ProductItem } from "@/types/products";
import api from "@/services/api";

// Definição do estado do store
interface ProductsState {
  products: ProductItem[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: number) => Promise<ProductItem>; // 🔹 Busca produto por ID
  createProduct: (data: FormData) => Promise<void>;
  updateProduct: (id: number, data: FormData) => Promise<void>; // 🔹 Atualiza produto
  deleteProduct: (id: number) => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  loading: false,

  // Buscar produtos da API
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await api.get<ProductItem[]>("/products/");
      set(() => ({ products: response.data }));
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      message.error("Erro ao carregar os produtos!");
    } finally {
      set(() => ({ loading: false }));
    }
  },

  // 🔹 Buscar produto por ID para edição
  fetchProductById: async (id: number) => {
    try {
      const response = await api.get<ProductItem>(`/products/${id}/`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      message.error("Erro ao carregar os dados do produto!");
      throw error; // Retorna erro para ser tratado no componente
    }
  },

  // Criar produto
  createProduct: async (data: FormData) => {
    try {
      const response = await api.post("/products/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      
      set((state) => ({
        products: [...state.products, response.data], 
      }));
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      message.error("Erro ao cadastrar produto!");
    }
  },

  // 🔹 Atualizar produto
  updateProduct: async (id: number, data: FormData) => {
    try {
      await api.put(`/products/${id}/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      
      set((state) => ({
        products: state.products.map((product) =>
          product.id === id ? { ...product, ...Object.fromEntries(data) } : product
        ),
      }));
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      message.error("Erro ao atualizar produto!");
    }
  },
  

  // Excluir produto
  deleteProduct: async (id: number) => {
    try {
      await api.delete(`/products/${id}/`);
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
      }));
      message.success("Produto excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      message.error("Erro ao excluir o produto!");
    }
  },
}));