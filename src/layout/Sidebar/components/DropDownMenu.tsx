import React, { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Dropdown, Space, MenuProps } from "antd";
import { Link } from "react-router-dom";

const menuItems: MenuProps["items"] = [
  { key: "/home", label: <Link to="/home">Home</Link> },
  { key: "/products", label: <Link to="/products">Produtos</Link> },
  { key: "/equipments", label: <Link to="/equipments">Equipamentos</Link> },
  { key: "/users", label: <Link to="/users">Usuários</Link> },
  { key: "/sectors", label: <Link to="/sectors">Setores</Link> },
  {
    key: "/production-lines",
    label: <Link to="/production-lines">Linhas de Produção</Link>,
  },
  { key: "/iotdevices", label: <Link to="/iotdevices">Dispositivos IoT</Link> },
  { key: "/monitoring", label: <Link to="/monitoring">Monitoramentos</Link> },
  { key: "/quizzes", label: <Link to="/quizzes">Quizzes</Link> },
  { key: "/missions", label: <Link to="/missions">Missões</Link> },
  {
    key: "logout",
    label: <span style={{ color: "red", fontWeight: "bold" }}>Sair</span>,
  },
];

const DropDownMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 999,
          }}
        />
      )}

      <Dropdown
        menu={{ items: menuItems }}
        trigger={["click"]}
        open={open}
        onOpenChange={(flag) => setOpen(flag)}
        overlayStyle={{
          position: "fixed",
          top: 60,
          left: 0,
          width: "80%",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          zIndex: 1000,
        }}
      >
        <a
          onClick={(e) => e.preventDefault()}
          style={{ display: "block", width: "100%", cursor: "pointer" }}
        >
          <Space
            style={{
              justifyContent: "space-between",
              width: "100%",
              height: "50%",
            }}
          >
            <MenuOutlined />
          </Space>
        </a>
      </Dropdown>
    </>
  );
};

export default DropDownMenu;
