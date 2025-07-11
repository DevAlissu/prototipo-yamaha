import React from "react";
import { Link } from "react-router-dom";
import LogoInovaImage from "../../../assets/inova_logo.png";

interface LogoInovaProps {
  collapsed: boolean;
}

const LogoInova: React.FC<LogoInovaProps> = ({ collapsed }) => {
  return (
    <div
      style={{
        position: "relative",
        bottom: "0px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: collapsed ? "5px" : "10px",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Link to="/">
        <img
          src={LogoInovaImage}
          alt="Logo Inova"
          style={{
            height: collapsed ? 20 : 40,
            width: collapsed ? 50 : 100,
            transition: "all 0.3s ease-in-out",
          }}
        />
      </Link>
    </div>
  );
};

export default LogoInova;