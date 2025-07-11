// src/services/api.ts
import axios from "axios";

export const BASE_URL = `http://200.129.168.197:20163/api`;
//export const BASE_URL = `http://localhost:10000/api`;
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Adicionar token automaticamente se existir
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de resposta
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";
    const method = error.config?.method || "";

    // 1) Se for 401 **na rota de login**, só rejeita para
    // que o catch local exiba a notificação
    if (
      status === 401 &&
      method.toLowerCase() === "post" &&
      url.endsWith("/login/")
    ) {
      return Promise.reject(error);
    }

    // 2) Senão, continua seu fluxo de refresh / logout habitual
    if (status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const r = await axios.post(`${BASE_URL}/auth/refresh/`, {
            refresh: refreshToken,
          });
          const newAccess = r.data.access;
          localStorage.setItem("userToken", newAccess);
          error.config.headers["Authorization"] = `Bearer ${newAccess}`;
          return axios(error.config);
        } catch {
          localStorage.removeItem("userToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
      } else {
        localStorage.removeItem("userToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
