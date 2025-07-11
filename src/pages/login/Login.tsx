import { useState } from "react";
import { Input, Button, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Lock, Eye, EyeClosed, User } from "lucide-react";
import { useAuth } from "../../contexts/auth/AuthContext";
import api from "../../services/api";

import "primeflex/primeflex.css";

import BackgroundImage from "../../assets/background.jpg";
import ImageLogoLogin from "../../assets/logo-footer1.png";
import EmbrapiLogo from "../../assets/embrapi_logo.png";
import InovaLogo from "../../assets/inova_logo.png";
import ImageLogin from "../../assets/OperadorNansenRedimensionada.jpg";

interface LoginDTO {
  username: string;
  password: string;
}

export type NotificationType = "success" | "info" | "warning" | "error";

export default function Login() {
  const { login } = useAuth();
  const [loginObject, setLoginObject] = useState<LoginDTO>({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [apiNotification, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    apiNotification[type]({ message, description });
  };

  const loginMethod = async () => {
    if (!loginObject.username || !loginObject.password) {
      openNotificationWithIcon(
        "warning",
        "Campos vazios",
        "Preencha todos os campos!"
      );
      return;
    }
    setLoading(true);

    try {
      const response = await api.post("/login/", loginObject);

      if (response.status === 200 || response.status === 201) {
        login(response.data.access, response.data.refresh);
      } else {
        openNotificationWithIcon(
          "error",
          "Erro de login",
          "Usuário ou senha inválidos."
        );
      }
    } catch (err: any) {
      if (err.response) {
        const status = err.response.status;
        if (status === 400 || status === 401) {
          openNotificationWithIcon(
            "error",
            "Credenciais inválidas",
            "Usuário ou senha incorretos."
          );
        } else {
          openNotificationWithIcon(
            "error",
            "Erro de login",
            err.response.data?.detail || "Algo deu errado."
          );
        }
      } else {
        openNotificationWithIcon(
          "error",
          "Erro de conexão",
          "Não foi possível conectar à API."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {contextHolder}

      <div className="w-full max-w-[850px] bg-white rounded-lg shadow-lg flex flex-col md:flex-row align-items-stretch overflow-hidden h-auto md:h-[500px]">
        {/* Lado Esquerdo – Formulário */}
        <div className="w-full md:w-1/2 p-6 flex flex-col items-center text-center justify-center max-w-md mx-auto">
          <img src={ImageLogoLogin} alt="Logo" className="mb-4 w-10" />
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
            Acesse sua conta
          </h1>

          {/* Form captura Enter */}
          <form
            className="flex flex-col items-center"
            onSubmit={(e) => {
              e.preventDefault();
              loginMethod();
            }}
          >
            <Input
              placeholder="Nome de usuário"
              prefix={<User color="#4892D7" size={20} />}
              className="w-full max-w-[300px] h-12 text-lg border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={loginObject.username}
              onChange={(e) =>
                setLoginObject({ ...loginObject, username: e.target.value })
              }
            />
            <Input.Password
              placeholder="Senha"
              prefix={<Lock color="#4892D7" size={20} />}
              className="w-full max-w-[300px] h-12 text-lg border border-gray-300 rounded-md px-4 py-2 mt-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={loginObject.password}
              onChange={(e) =>
                setLoginObject({ ...loginObject, password: e.target.value })
              }
              iconRender={(visible) =>
                visible ? <Eye size={20} /> : <EyeClosed size={20} />
              }
            />
            <Button
              type="primary"
              htmlType="submit"
              block
              className={`w-full max-w-[300px] h-12 text-lg mt-4 font-semibold rounded-md transition-all flex items-center justify-center`}
              style={{
                backgroundColor: loading ? "#004a99" : "#0057B8",
                color: "#fff",
                border: "none",
                opacity: 1,
                boxShadow: "none",
                cursor: loading ? "not-allowed" : "pointer",
              }}
              disabled={loading}
            >
              {loading ? (
                <>
                  Entrando... <LoadingOutlined className="ml-2" spin />
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>

          {/* Logos inferiores */}
          <div className="flex justify-center items-center mt-6 space-x-6">
            <img src={InovaLogo} alt="Inova" className="w-20 h-auto" />
            <img src={EmbrapiLogo} alt="Embrapi" className="w-24 h-auto" />
          </div>
        </div>

        {/* Lado Direito – Imagem */}
        <div className="hidden md:flex w-full md:w-1/2 h-auto md:h-[500px] relative">
          <img
            src={ImageLogin}
            alt="Operador"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#112A42] opacity-50"></div>
        </div>
      </div>
    </div>
  );
}
