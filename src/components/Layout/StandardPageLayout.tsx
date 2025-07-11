import React from 'react';
import { Button, Input, Space } from 'antd';
import { PlusOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import ItemSideBar from '../../layout/Sidebar/ItemSideBar';
import ItemHeader from '../../layout/Header/ItemHeader';
import ItemHeaderCabecalho from '../../layout/Header/components/ItemHeaderCabecalho';
import './StandardPageLayout.css';

const { Search } = Input;

export interface PageAction {
  key: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  danger?: boolean;
  loading?: boolean;
}

export interface StandardPageLayoutProps {
  // Header
  title: string;
  subtitle?: string;
  
  // Ações principais
  primaryAction?: PageAction;
  secondaryActions?: PageAction[];
  
  // Busca e filtros
  showSearch?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showFilters?: boolean;
  onFiltersClick?: () => void;
  
  // Conteúdo
  children: React.ReactNode;
  
  // Layout
  containerClassName?: string;
  contentClassName?: string;
  
  // Estados
  loading?: boolean;
}

const StandardPageLayout: React.FC<StandardPageLayoutProps> = ({
  title,
  subtitle,
  primaryAction,
  secondaryActions = [],
  showSearch = false,
  searchPlaceholder = 'Buscar...',
  searchValue,
  onSearchChange,
  showFilters = false,
  onFiltersClick,
  children,
  containerClassName = '',
  contentClassName = '',
  loading = false,
}) => {
  return (
    <div className={`standard-layout-container ${containerClassName}`}>
      <ItemSideBar />
      
      <div className="standard-content-container">
        <ItemHeader />
        
        <main className={`standard-content ${contentClassName}`}>
          {/* Cabeçalho da página */}
          <ItemHeaderCabecalho
            title={title}
            subTitle={subtitle}
          />

          {/* Seção de ações e busca */}
          {(primaryAction || secondaryActions.length > 0 || showSearch || showFilters) && (
            <div className="standard-actions-section">
              <div className="standard-actions-left">
                {/* Ação primária */}
                {primaryAction && (
                  <Button
                    type={primaryAction.type || 'primary'}
                    icon={primaryAction.icon || <PlusOutlined />}
                    onClick={primaryAction.onClick}
                    loading={primaryAction.loading || loading}
                    danger={primaryAction.danger}
                    size="middle"
                  >
                    {primaryAction.label}
                  </Button>
                )}

                {/* Ações secundárias */}
                {secondaryActions.map(action => (
                  <Button
                    key={action.key}
                    type={action.type || 'default'}
                    icon={action.icon}
                    onClick={action.onClick}
                    loading={action.loading || loading}
                    danger={action.danger}
                    size="middle"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>

              <div className="standard-actions-right">
                <Space size="middle">
                  {/* Busca */}
                  {showSearch && (
                    <Search
                      placeholder={searchPlaceholder}
                      allowClear
                      value={searchValue}
                      onChange={(e) => onSearchChange?.(e.target.value)}
                      onSearch={onSearchChange}
                      style={{ width: 300 }}
                      size="middle"
                    />
                  )}

                  {/* Filtros */}
                  {showFilters && (
                    <Button
                      icon={<FilterOutlined />}
                      onClick={onFiltersClick}
                      size="middle"
                    >
                      Filtros
                    </Button>
                  )}
                </Space>
              </div>
            </div>
          )}

          {/* Conteúdo principal */}
          <div className="standard-main-content">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StandardPageLayout;