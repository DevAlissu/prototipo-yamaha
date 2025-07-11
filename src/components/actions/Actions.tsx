import React from "react";
import { Button, Tooltip, Popconfirm } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";

interface ActionsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onConfigure?: () => void;
  onSubmit?: () => void;
  onCancel?: () => void;
  loading?: boolean;
  showLabels?: boolean; // Nova prop para controlar se mostra texto nos botões
}

const Actions: React.FC<ActionsProps> = ({
  onView,
  onEdit,
  onDelete,
  onConfigure,
  onSubmit,
  onCancel,
  loading = false,
  showLabels = true, // Por padrão mostra labels (para não quebrar outros usos)
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "flex-end",
        marginTop: "20px",
      }}
    >
      {onView && (
        <Tooltip title="Visualizar">
          <Button icon={<EyeOutlined />} onClick={onView} size="small" />
        </Tooltip>
      )}
      {onEdit && (
        <Tooltip title="Editar">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={onEdit}
            size="small"
          >
            {showLabels ? "Editar" : ""}
          </Button>
        </Tooltip>
      )}
      {onConfigure && (
        <Tooltip title="Configurar">
          <Button
            icon={<SettingOutlined />}
            onClick={onConfigure}
            size="small"
          >
            {showLabels ? "Configurar" : ""}
          </Button>
        </Tooltip>
      )}
      {onDelete && (
        <Popconfirm
          title="Deseja excluir este item?"
          onConfirm={onDelete}
          okText="Sim"
          cancelText="Não"
        >
          <Button
            icon={<DeleteOutlined />}
            danger
            size="small"
            title="Excluir"
          >
            {showLabels ? "Excluir" : ""}
          </Button>
        </Popconfirm>
      )}
      {onCancel && (
        <Button type="default" onClick={onCancel}>
          Cancelar
        </Button>
      )}
      {onSubmit && (
        <Button 
          type="primary" 
          className="primary-btn" 
          onClick={onSubmit}
          loading={loading}
        >
          Enviar
        </Button>
      )}
    </div>
  );
};

export default Actions;