import React from "react";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { MenuProps } from "antd/es/menu";
import { useAuth } from "../../../contexts/auth/AuthContext";

// Ícones
import HomeIcon from "@mui/icons-material/Home";
import BuildIcon from "@mui/icons-material/Build";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const ItensMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const items: MenuProps["items"] = [
    {
      key: "/home",
      icon: <HomeIcon fontSize="small" />,
      label: "Home",
      onClick: () => navigate("/home"),
    },
    {
      key: "/motocicletas",
      icon: <BuildIcon fontSize="small" />,
      label: "Motocicletas",
      onClick: () => navigate("/motocicletas"),
    },
    { key: "divider", type: "divider" },
    {
      key: "logout",
      icon: <ExitToAppIcon fontSize="small" />,
      label: <span style={{ color: "red" }}>Sair</span>,
      onClick: logout,
    },
  ];

  return (
    <Menu
      className="custom-menu"
      mode="inline"
      selectedKeys={[location.pathname]}
      items={items}
    />
  );
};

export default ItensMenu;
