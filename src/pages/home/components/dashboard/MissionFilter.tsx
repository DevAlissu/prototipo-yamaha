// src/pages/home/components/dashboard/MissionFilter.tsx
import React from "react";
import { Select } from "antd";
import { FilterOutlined } from "@ant-design/icons";

interface MissionFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const MissionFilter: React.FC<MissionFilterProps> = ({ value, onChange }) => {
  const options = [
    { value: "all", label: "Todas" },
    { value: "Em Andamento", label: "Em Andamento" },
    { value: "Finalizada", label: "Finalizadas" },
    { value: "Pendente", label: "Pendentes" },
  ];

  return (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      gap: "8px",
      background: "white",
      padding: "8px 12px",
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
    }}>
      <FilterOutlined style={{ color: "#64748b", fontSize: "14px" }} />
      <Select
        value={value}
        onChange={onChange}
        options={options}
        style={{ minWidth: 120 }}
        size="small"
        variant="borderless"
      />
    </div>
  );
};

export default MissionFilter;