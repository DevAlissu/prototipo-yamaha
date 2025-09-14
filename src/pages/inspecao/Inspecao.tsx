import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import StandardPageLayout from "../../components/Layout/StandardPageLayout";
import StandardTable, { createDeleteAction, ActionButton } from "../../components/Table/StandardTable";
import { useInspecaoStore } from "../../store/inspecaoStore";
import { EditOutlined } from '@ant-design/icons';

const Inspecao: React.FC = () => {
  const navigate = useNavigate();
  const { 
    inspecoes, 
    deleteInspecao, 
    initializeData 
  } = useInspecaoStore();
  
  const [searchValue, setSearchValue] = useState('');
  
  useEffect(() => {
    initializeData();
  }, []);
  
  const columns = [
    {
      title: 'Período',
      dataIndex: 'periodo',
      key: 'periodo',
      width: 180,
    },
    {
      title: 'Modelo da Moto',
      dataIndex: 'modeloMoto',
      key: 'modeloMoto',
    },
    {
      title: 'Resultado',
      dataIndex: 'resultado',
      key: 'resultado',
      render: (text: string, record: any) => (
        <span style={{
          color: text === "Motocicleta com ruído aceitável" ? '#4CAF50' : '#f44336',
          fontWeight: 'bold'
        }}>
          {text}
        </span>
      )
    },
    {
      title: 'MSIM (Código)',
      dataIndex: 'msimCodigo',
      key: 'msimCodigo',
    },
  ];
  
  // Filtrar inspeções baseado na busca
  const filteredInspecoes = useMemo(() => {
    if (!searchValue.trim()) return inspecoes;
    
    return inspecoes.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [inspecoes, searchValue]);
  
  // Adicionar classe de estilo para as linhas baseado no resultado
  const getRowClassName = (record: any) => {
    return record.resultado === "Motocicleta com ruído aceitável" 
      ? 'row-success' 
      : 'row-error';
  };
  
  const handleDelete = async (id: number) => {
    deleteInspecao(id);
    message.success('Inspeção excluída com sucesso!');
  };
  
  const createEditAction = (record: any): ActionButton => ({
    key: 'edit',
    icon: <EditOutlined />,
    label: 'Editar',
    type: 'default',
    onClick: () => navigate(`/inspecao/edit/${record.id}`),
  });
  
  const createActionButtons = (record: any) => [
    createEditAction(record),
    createDeleteAction(
      async () => {
        if (record.id) {
          await handleDelete(record.id);
        }
      },
      'Tem certeza que deseja excluir esta inspeção?'
    ),
  ];
  
  return (
    <>
      <StandardPageLayout
        title="Inspeção"
        subtitle="Lista de inspeções realizadas"
        primaryAction={{
          key: 'create',
          label: 'Cadastrar inspeção',
          onClick: () => navigate("/inspecao/register"),
        }}
        showSearch={true}
        searchPlaceholder="Buscar inspeção..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      >
        <style>
          {`
            .row-success td {
              background-color: #e8f5e9 !important;
            }
            .row-success:hover td {
              background-color: #c8e6c9 !important;
            }
            .row-error td {
              background-color: #ffebee !important;
            }
            .row-error:hover td {
              background-color: #ffcdd2 !important;
            }
            /* Garantir que os botões de ação também tenham a cor de fundo */
            .row-success td .standard-table-actions {
              background: transparent;
            }
            .row-error td .standard-table-actions {
              background: transparent;
            }
            /* Garantir que os botões dentro das ações mantenham cor transparente */
            .row-success .standard-table-actions .ant-btn,
            .row-error .standard-table-actions .ant-btn {
              background: transparent !important;
              border: 1px solid rgba(0,0,0,0.15);
            }
            .row-success .standard-table-actions .ant-btn:hover,
            .row-error .standard-table-actions .ant-btn:hover {
              background: rgba(255,255,255,0.2) !important;
            }
          `}
        </style>
        <StandardTable
          columns={columns}
          dataSource={filteredInspecoes}
          loading={false}
          actionButtons={createActionButtons}
          rowKey="id"
          rowClassName={getRowClassName}
        />
      </StandardPageLayout>
    </>
  );
};

export default Inspecao;