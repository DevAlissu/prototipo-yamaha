export interface UserItem {
  id: number;
  username: string;
  email: string;
  name: string | null;
  role: "ADMIN" | "LIDER" | "GAME";
  avatar_url: string;
  avatar: string;
}

export interface UserRegister {
  username: string;
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "LIDER" | "GAME";
}
