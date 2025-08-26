import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message, Tag } from "antd";
import StandardPageLayout from "../../components/Layout/StandardPageLayout";
import StandardTable, { createDeleteAction, ActionButton } from "../../components/Table/StandardTable";
import { useInspecaoStore } from "../../store/inspecaoStore";
import { EditOutlined } from '@ant-design/icons';

const MSIM: React.FC = () => {
  const navigate = useNavigate();
  const { 
    msims, 
    deleteMSIM, 
    initializeData 
  } = useInspecaoStore();
  
  const [searchValue, setSearchValue] = useState('');
  
  useEffect(() => {
    initializeData();
  }, []);
  
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Modelo de IA',
      dataIndex: 'modeloIA',
      key: 'modeloIA',
    },
    {
      title: 'Código',
      dataIndex: 'codigo',
      key: 'codigo',
      render: (text: string) => (
        <Tag color="blue">{text}</Tag>
      )
    },
    {
      title: 'Status',
      dataIndex: 'ativo',
      key: 'ativo',
      render: (ativo: boolean) => (
        <Tag color={ativo ? 'green' : 'red'}>
          {ativo ? 'ATIVO' : 'INATIVO'}
        </Tag>
      )
    },
  ];
  
  // Filtrar MSIMs baseado na busca
  const filteredMSIMs = useMemo(() => {
    if (!searchValue.trim()) return msims;
    
    return msims.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [msims, searchValue]);
  
  const handleDelete = async (id: number) => {
    deleteMSIM(id);
    message.success('MSIM excluído com sucesso!');
  };
  
  const createEditAction = (record: any): ActionButton => ({
    key: 'edit',
    icon: <EditOutlined />,
    label: 'Editar',
    type: 'default',
    onClick: () => navigate(`/msim/edit/${record.id}`),
  });
  
  const createActionButtons = (record: any) => [
    createEditAction(record),
    createDeleteAction(
      async () => {
        if (record.id) {
          await handleDelete(record.id);
        }
      },
      'Tem certeza que deseja excluir este MSIM?'
    ),
  ];
  
  return (
    <>
      <StandardPageLayout
        title="MSIM - Dispositivos IoT"
        subtitle="Lista de dispositivos MSIM cadastrados"
        primaryAction={{
          key: 'create',
          label: 'Cadastrar MSIM',
          onClick: () => navigate("/msim/register"),
        }}
        showSearch={true}
        searchPlaceholder="Buscar MSIM..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      >
        <StandardTable
          columns={columns}
          dataSource={filteredMSIMs}
          loading={false}
          actionButtons={createActionButtons}
          rowKey="id"
        />
      </StandardPageLayout>
    </>
  );
};

export default MSIM;