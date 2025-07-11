import { useState, useCallback, useMemo } from 'react';
import { message } from 'antd';
import { ColumnsType } from 'antd/es/table';

export interface UseStandardTableOptions<T> {
  // Dados
  data: T[];
  loading?: boolean;
  
  // Paginação
  defaultPageSize?: number;
  pageSizeOptions?: string[];
  
  // Busca e filtros
  searchableFields?: (keyof T)[];
  defaultSearchValue?: string;
  
  // Operações CRUD
  onEdit?: (record: T) => void;
  onDelete?: (id: string | number) => Promise<void>;
  onView?: (record: T) => void;
  
  // Configurações customizadas
  onConfigure?: (record: T) => void;
  
  // Mensagens
  deleteConfirmMessage?: string;
  deleteSuccessMessage?: string;
  deleteErrorMessage?: string;
}

export interface UseStandardTableReturn<T> {
  // Dados filtrados
  filteredData: T[];
  loading: boolean;
  
  // Busca
  searchValue: string;
  setSearchValue: (value: string) => void;
  
  // Seleção
  selectedRowKeys: React.Key[];
  selectedRows: T[];
  setSelectedRowKeys: (keys: React.Key[]) => void;
  onSelectChange: (newSelectedRowKeys: React.Key[], newSelectedRows: T[]) => void;
  
  // Operações
  handleEdit: (record: T) => void;
  handleDelete: (record: T) => Promise<void>;
  handleView: (record: T) => void;
  handleConfigure: (record: T) => void;
  
  // Configurações da tabela
  tableProps: {
    rowSelection?: any;
    loading: boolean;
    dataSource: T[];
  };
}

function useStandardTable<T extends { id: string | number }>({
  data,
  loading = false,
  defaultPageSize = 10,
  pageSizeOptions = ['5', '10', '20', '50'],
  searchableFields = [],
  defaultSearchValue = '',
  onEdit,
  onDelete,
  onView,
  onConfigure,
  deleteConfirmMessage = 'Tem certeza que deseja excluir este item?',
  deleteSuccessMessage = 'Item excluído com sucesso!',
  deleteErrorMessage = 'Erro ao excluir item.',
}: UseStandardTableOptions<T>): UseStandardTableReturn<T> {
  
  // Estados
  const [searchValue, setSearchValue] = useState(defaultSearchValue);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Dados filtrados baseado na busca
  const filteredData = useMemo(() => {
    if (!searchValue.trim() || searchableFields.length === 0) {
      return data;
    }

    const searchLower = searchValue.toLowerCase();
    return data.filter(item => 
      searchableFields.some(field => {
        const value = item[field];
        if (value == null) return false;
        return String(value).toLowerCase().includes(searchLower);
      })
    );
  }, [data, searchValue, searchableFields]);

  // Linhas selecionadas
  const selectedRows = useMemo(() => 
    filteredData.filter(item => selectedRowKeys.includes(item.id)),
    [filteredData, selectedRowKeys]
  );

  // Handlers
  const handleEdit = useCallback((record: T) => {
    if (onEdit) {
      onEdit(record);
    }
  }, [onEdit]);

  const handleDelete = useCallback(async (record: T) => {
    if (!onDelete) return;

    setIsDeleting(true);
    try {
      await onDelete(record.id);
      message.success(deleteSuccessMessage);
      
      // Remove da seleção se estava selecionado
      setSelectedRowKeys(prev => prev.filter(key => key !== record.id));
    } catch (error) {
      console.error('Erro ao excluir:', error);
      message.error(deleteErrorMessage);
    } finally {
      setIsDeleting(false);
    }
  }, [onDelete, deleteSuccessMessage, deleteErrorMessage]);

  const handleView = useCallback((record: T) => {
    if (onView) {
      onView(record);
    }
  }, [onView]);

  const handleConfigure = useCallback((record: T) => {
    if (onConfigure) {
      onConfigure(record);
    }
  }, [onConfigure]);

  // Seleção de linhas
  const onSelectChange = useCallback((newSelectedRowKeys: React.Key[], newSelectedRows: T[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  }, []);

  // Configuração de seleção de linha
  const rowSelection = useMemo(() => ({
    selectedRowKeys,
    onChange: onSelectChange,
    preserveSelectedRowKeys: true,
  }), [selectedRowKeys, onSelectChange]);

  // Props da tabela
  const tableProps = useMemo(() => ({
    rowSelection: selectedRowKeys.length > 0 ? rowSelection : undefined,
    loading: loading || isDeleting,
    dataSource: filteredData,
    rowKey: 'id' as keyof T,
  }), [rowSelection, loading, isDeleting, filteredData, selectedRowKeys.length]);

  return {
    // Dados
    filteredData,
    loading: loading || isDeleting,
    
    // Busca
    searchValue,
    setSearchValue,
    
    // Seleção
    selectedRowKeys,
    selectedRows,
    setSelectedRowKeys,
    onSelectChange,
    
    // Operações
    handleEdit,
    handleDelete,
    handleView,
    handleConfigure,
    
    // Configurações da tabela
    tableProps,
  };
}

export default useStandardTable;