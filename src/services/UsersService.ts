// src/services/UsersService.ts
import api from "./api";
import { UserItem, UserRegister } from "../types/users";

// GET /users/
export async function getUsers(): Promise<UserItem[]> {
  const resp = await api.get<UserItem[]>("/users/");
  return resp.data;
}

// POST /register/  ← endpoint correto para cadastro de usuário
export async function createUser(data: UserRegister): Promise<UserItem> {
  const resp = await api.post<UserItem>("/register/", data);
  return resp.data;
}

// PUT /users/{id}/
export async function updateUser(
  id: number,
  data: Partial<UserItem>
): Promise<UserItem> {
  const resp = await api.put<UserItem>(`/users/${id}/`, data);
  return resp.data;
}

// DELETE /users/{id}/
export async function deleteUser(id: number): Promise<void> {
  await api.delete(`/users/${id}/`);
}
