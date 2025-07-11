import { create } from "zustand";
import * as UsersService from "../services/UsersService";
import { UserItem, UserRegister } from "../types/users";

interface UsersStore {
  users: UserItem[];
  fetchUsers: () => Promise<void>;
  addUser: (data: UserRegister) => Promise<void>;
  updateUser: (id: number, data: Partial<UserItem>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

export const useUsersStore = create<UsersStore>((set) => ({
  users: [],

  fetchUsers: async () => {
    try {
      const users = await UsersService.getUsers();
      set({ users });
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    }
  },

  addUser: async (data) => {
    try {
      const newUser = await UsersService.createUser(data);
      set((state) => ({ users: [...state.users, newUser] }));
    } catch (err) {
      console.error("Erro ao cadastrar usuário:", err);
    }
  },

  updateUser: async (id, data) => {
    try {
      const updated = await UsersService.updateUser(id, data);
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? updated : u)),
      }));
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
    }
  },

  deleteUser: async (id) => {
    try {
      await UsersService.deleteUser(id);
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
      }));
    } catch (err) {
      console.error("Erro ao excluir usuário:", err);
    }
  },
}));
