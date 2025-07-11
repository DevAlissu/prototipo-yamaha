import React, { useState, useEffect } from "react";
import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import ItensMenu from "./components/ItensMenu";
import Logo from "./components/Logo";
import LogoInova from "./components/LogoInova";

const { Sider } = Layout;

const ItemSideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) return null;

  return (
    <Sider
      className="menu flex flex-column justify-content-between shadow-2 bg-white"
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={220}
      style={{ minHeight: "100vh" }} // não tem utilitário direto pra 100vh no antd, mas se quiser tirar, use height: "100vh" em CSS externo
    >
      <div>
        <Logo collapsed={collapsed} />
        <div className="flex justify-content-center my-3">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="p-0"
            style={{ fontSize: "24px", color: "#000" }}
          />
        </div>
        <ItensMenu />
      </div>

      <LogoInova collapsed={collapsed} />
    </Sider>
  );
};

export default ItemSideBar;
