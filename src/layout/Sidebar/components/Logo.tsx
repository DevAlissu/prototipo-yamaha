import React from "react";
import { Link } from "react-router-dom";
import LogoLarge from "../../../assets/logo3yamaha.png";
import LogoMini from "../../../assets/yamahamini.png";

interface LogoProps {
  collapsed: boolean;
}

const Logo: React.FC<LogoProps> = ({ collapsed }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#B1001C",
        padding: "10px 0",
        height: 64,
      }}
    >
      <Link to="/">
        <img
          src={collapsed ? LogoMini : LogoLarge}
          alt="Logo"
          style={{
            height: 50,
            width: "auto",
            maxWidth: "160px",
          }}
        />
      </Link>
    </div>
  );
};

export default Logo;
