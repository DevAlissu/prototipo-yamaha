import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

import Logo from "../../../assets/nansen_logo.svg";
import LogoMini from "../../../assets/logo_mini.png";

const { Sider } = Layout;

const MenuSideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: <Link to="/create">Create</Link>,
    },
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ padding: 0, background: "#FFF" }}
      >
        <div
          className="demo-logo-vertical"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <img
            src={collapsed ? LogoMini : Logo}
            alt="Logo"
            style={{
              height: collapsed ? "auto" : 70,
              marginTop: 30,
              marginLeft: 20,
            }}
          />
        </div>

        <Menu
          style={{ padding: 0, background: "#FFF", marginTop: 20 }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems}
        />
      </Sider>
    </Layout>
  );
};

export default MenuSideBar;