import React, { useState, useEffect } from "react";
import { Button, Drawer } from "antd";
import { MenuOutlined, HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { FaMotorcycle } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/auth/AuthContext"; // ajuste se necessário

const menuItems = [
  { 
    key: "/home", 
    label: "Home", 
    icon: <HomeOutlined style={{ fontSize: '18px' }} />,
    description: "Página principal com mapa" 
  },
  { 
    key: "/motocicletas", 
    label: "Motocicletas", 
    icon: <FaMotorcycle size={18} />,
    description: "Gerenciar motocicletas"
  },
  { 
    key: "logout", 
    label: "Sair", 
    icon: <LogoutOutlined style={{ fontSize: '18px' }} />,
    logout: true 
  },
];

const DrawMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const { logout } = useAuth();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMobile) return null;

  return (
    <>
      <Button 
        onClick={() => setOpen(true)} 
        style={{ 
          marginLeft: 10,
          border: 'none',
          background: 'transparent',
          color: 'white',
          fontSize: '18px'
        }}
        type="text"
      >
        <MenuOutlined />
      </Button>
      <Drawer
        title={
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            color: '#8B0015'
          }}>
            <MenuOutlined style={{ fontSize: '20px' }} />
            <span style={{ fontSize: '18px', fontWeight: '600' }}>Menu</span>
          </div>
        }
        onClose={() => setOpen(false)}
        open={open}
        placement="left"
        width={280}
        styles={{
          header: { 
            borderBottom: '1px solid #f0f0f0',
            background: '#fafafa'
          },
          body: { 
            padding: "0",
            background: '#ffffff'
          }
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {menuItems.map((item) =>
            item.logout ? (
              <div
                key={item.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: "16px 20px",
                  cursor: "pointer",
                  borderTop: '1px solid #f0f0f0',
                  color: "#d32f2f",
                  background: '#fff',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#ffebee';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fff';
                }}
              >
                {item.icon}
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '500' }}>
                    {item.label}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.key}
                to={item.key}
                style={{ 
                  textDecoration: 'none',
                  color: 'inherit'
                }}
                onClick={() => setOpen(false)}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: "16px 20px",
                    color: "#333",
                    background: '#fff',
                    transition: 'all 0.2s ease',
                    borderBottom: '1px solid #f0f0f0'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f5f5f5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#fff';
                  }}
                >
                  {item.icon}
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '500' }}>
                      {item.label}
                    </div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: '#666',
                      marginTop: '2px'
                    }}>
                      {item.description}
                    </div>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
      </Drawer>
    </>
  );
};

export default DrawMenu;
