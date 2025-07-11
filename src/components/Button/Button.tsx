import React from "react";
import { Button as AntButton } from "antd";

interface ButtonProps {
  type?: "primary" | "default" | "dashed" | "link" | "text";
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  danger?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = "default",
  icon,
  children,
  onClick,
  className,
  danger = false,
}) => {
  return (
    <AntButton
      type={type}
      icon={icon}
      onClick={onClick}
      className={`custom-btn ${className}`}
      danger={danger}
    >
      {children}
    </AntButton>
  );
};

export default Button;