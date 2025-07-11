import React from 'react';
import { Table, TableProps, Dropdown, Button, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { 
  EditOutlined, 
  DeleteOutlined, 
  MoreOutlined,
  SettingOutlined,
  EyeOutlined 
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import './StandardTable.css';

export interface ActionButton {
  key: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  type?: 'primary' | 'default' | 'danger';
  confirm?: {
    title: string;
    okText?: string;
    cancelText?: string;
  };
}

export interface StandardTableProps<T = any> extends Omit<TableProps<T>, 'columns'> {
  columns: ColumnsType<T>;
  actionButtons?: (record: T) => ActionButton[];
  showActions?: boolean;
  actionWidth?: number;
  responsiveActions?: boolean;
  tableTitle?: string;
  tableSubtitle?: string;
}

function StandardTable<T extends { id: number | string }>({
  columns,
  actionButtons,
  showActions = true,
  actionWidth = 120,
  responsiveActions = true,
  tableTitle,
  tableSubtitle,
  ...tableProps
}: StandardTableProps<T>) {
  
  // Criar coluna de ações se necessário
  const actionsColumn: ColumnsType<T>[0] = {
    title: 'Ações',
    key: 'actions',
    width: actionWidth,
    fixed: 'right',
    render: (_: any, record: T) => {
      if (!actionButtons) return null;
      
      const buttons = actionButtons(record);
      
      if (!buttons.length) return null;

      // Versão para mobile - dropdown menu
      const menuItems: MenuProps['items'] = buttons.map(button => ({
        key: button.key,
        icon: button.icon,
        label: button.label,
        danger: button.type === 'danger',
        onClick: () => {
          if (button.confirm) {
            if (window.confirm(button.confirm.title)) {
              button.onClick();
            }
          } else {
            button.onClick();
          }
        },
      }));

      return (
        <div className="standard-table-actions">
          {/* Versão desktop - botões individuais */}
          <div className="desktop-actions">
            {buttons.map(button => {
              if (button.confirm) {
                return (
                  <Popconfirm
                    key={button.key}
                    title={button.confirm.title}
                    onConfirm={button.onClick}
                    okText={button.confirm.okText || 'Sim'}
                    cancelText={button.confirm.cancelText || 'Não'}
                    placement="topLeft"
                  >
                    <Button
                      type={button.type === 'danger' ? 'default' : button.type || 'default'}
                      danger={button.type === 'danger'}
                      icon={button.icon}
                      size="small"
                      title={button.label}
                    />
                  </Popconfirm>
                );
              }

              return (
                <Button
                  key={button.key}
                  type={button.type === 'danger' ? 'default' : button.type || 'default'}
                  danger={button.type === 'danger'}
                  icon={button.icon}
                  onClick={button.onClick}
                  size="small"
                  title={button.label}
                />
              );
            })}
          </div>
          
          {/* Versão mobile - dropdown */}
          {responsiveActions && (
            <div className="mobile-actions">
              <Dropdown
                menu={{ items: menuItems }}
                trigger={['click']}
                placement="bottomLeft"
              >
                <Button 
                  icon={<MoreOutlined />} 
                  size="small"
                  title="Mais ações"
                />
              </Dropdown>
            </div>
          )}
        </div>
      );
    },
  };

  // Adicionar coluna de ações se necessário
  const finalColumns = showActions && actionButtons 
    ? [...columns, actionsColumn] 
    : columns;

  // Configurações padrão da tabela
  const defaultTableProps: TableProps<T> = {
    size: 'middle',
    scroll: { x: 800 },
    pagination: {
      responsive: true,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total, range) => 
        `${range[0]}-${range[1]} de ${total} itens`,
      pageSizeOptions: ['5', '10', '20', '50'],
      defaultPageSize: 10,
    },
    ...tableProps,
  };

  return (
    <div className="standard-table-container">
      {(tableTitle || tableSubtitle) && (
        <div className="standard-table-header">
          {tableTitle && (
            <h2 className="standard-table-title">{tableTitle}</h2>
          )}
          {tableSubtitle && (
            <p className="standard-table-subtitle">{tableSubtitle}</p>
          )}
        </div>
      )}
      
      <div className="standard-table-wrapper">
        <Table<T>
          columns={finalColumns}
          {...defaultTableProps}
        />
      </div>
    </div>
  );
}

// Funções utilitárias para criar botões de ação comuns
export const createEditAction = (onEdit: () => void): ActionButton => ({
  key: 'edit',
  icon: <EditOutlined />,
  label: 'Editar',
  type: 'primary',
  onClick: onEdit,
});

export const createViewAction = (onView: () => void): ActionButton => ({
  key: 'view',
  icon: <EyeOutlined />,
  label: 'Visualizar',
  onClick: onView,
});

export const createConfigAction = (onConfig: () => void): ActionButton => ({
  key: 'config',
  icon: <SettingOutlined />,
  label: 'Configurar',
  onClick: onConfig,
});

export const createDeleteAction = (onDelete: () => void, confirmTitle?: string): ActionButton => ({
  key: 'delete',
  icon: <DeleteOutlined />,
  label: 'Excluir',
  type: 'danger',
  onClick: onDelete,
  confirm: {
    title: confirmTitle || 'Tem certeza que deseja excluir este item?',
    okText: 'Sim',
    cancelText: 'Não',
  },
});

export default StandardTable;