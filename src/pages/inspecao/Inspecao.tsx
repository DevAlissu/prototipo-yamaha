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
            .row-success {
              background-color: #e8f5e9 !important;
            }
            .row-success:hover td {
              background-color: #c8e6c9 !important;
            }
            .row-error {
              background-color: #ffebee !important;
            }
            .row-error:hover td {
              background-color: #ffcdd2 !important;
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