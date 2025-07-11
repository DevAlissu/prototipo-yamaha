// src/pages/equipments/Equipments.tsx
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { EnvironmentOutlined } from '@ant-design/icons';
import StandardPageLayout from "../../components/Layout/StandardPageLayout";
import StandardTable, { createDeleteAction, ActionButton } from "../../components/Table/StandardTable";
import ZoneMapModal from "../../components/ZoneMap/ZoneMapModal";
// import { useEquipamentsTable } from "./hooks/useEquipamentsTable";
// import { useEquipamentsStore } from "../../store/equipaments";

interface Motocicleta {
  id: number;
  codigo: string;
  modelo: string;
  chassi: string;
  cor: string;
  unidadeRastreamento: string;
  zona: number;
  posicao: { x: number; y: number };
}

const Equipments: React.FC = () => {
  const navigate = useNavigate();
  
  // Estado para gerenciar a lista de motocicletas
  const [motocicletas, setMotocicletas] = useState<Motocicleta[]>([]);

  // Carrega dados iniciais do localStorage ou usa dados mock
  useEffect(() => {
    const savedMotos = localStorage.getItem('motocicletas');
    const version = localStorage.getItem('motocicletas_version');
    
    // Forçar atualização se não tem versão ou dados
    if (savedMotos && version === '5.0') {
      const parsedMotos = JSON.parse(savedMotos);
      // Verificar se tem campo zona
      if (parsedMotos.length > 0 && parsedMotos[0].zona !== undefined) {
        setMotocicletas(parsedMotos);
        return;
      }
    }
    
    // Criar dados novos
      // Mock data inicial - Apenas motos Yamaha
      const initialData = [
        {
          id: 1,
          codigo: "MOTO001",
          modelo: "Yamaha Factor 125",
          chassi: "9C6KE1110JR123456",
          cor: "Vermelha",
          unidadeRastreamento: "IOT001 - LoRaWAN Tracker",
          zona: 1,
          posicao: { x: 95, y: 515 }
        },
        {
          id: 2,
          codigo: "MOTO002", 
          modelo: "Yamaha NMAX 160",
          chassi: "9C6KE2220LR234567",
          cor: "Azul",
          unidadeRastreamento: "IOT002 - GPS Tracker",
          zona: 2,
          posicao: { x: 695, y: 120 }
        },
        {
          id: 3,
          codigo: "MOTO003",
          modelo: "Yamaha MT-03",
          chassi: "9C6RF1110LR345678", 
          cor: "Preta",
          unidadeRastreamento: "IOT003 - LoRaWAN Device",
          zona: 3,
          posicao: { x: 695, y: 330 }
        },
        {
          id: 4,
          codigo: "MOTO004",
          modelo: "Yamaha PCX 150",
          chassi: "9C6KE5020KR789012",
          cor: "Branca",
          unidadeRastreamento: "IOT004 - Bluetooth Tracker",
          zona: 4,
          posicao: { x: 620, y: 500 }
        },
        {
          id: 5,
          codigo: "MOTO005",
          modelo: "Yamaha XTZ 250",
          chassi: "9C6DF2220LR890123",
          cor: "Azul",
          unidadeRastreamento: "IOT005 - Satellite Tracker",
          zona: 5,
          posicao: { x: 935, y: 300 }
        },
        {
          id: 6,
          codigo: "MOTO006",
          modelo: "Yamaha R3",
          chassi: "9C6RC6030MR901234",
          cor: "Azul Yamaha",
          unidadeRastreamento: "IOT006 - LoRaWAN Tracker",
          zona: 2,
          posicao: { x: 720, y: 150 }
        },
        {
          id: 7,
          codigo: "MOTO007",
          modelo: "Yamaha FZ25",
          chassi: "9C6RG5140NR012345",
          cor: "Preta",
          unidadeRastreamento: "IOT007 - GPS Tracker",
          zona: 3,
          posicao: { x: 750, y: 280 }
        }
      ];
      setMotocicletas(initialData);
      localStorage.setItem('motocicletas', JSON.stringify(initialData));
      localStorage.setItem('motocicletas_version', '5.0');
  }, []);
  
  const columns = [
    {
      title: 'Código',
      dataIndex: 'codigo',
      key: 'codigo',
    },
    {
      title: 'Modelo',
      dataIndex: 'modelo',
      key: 'modelo',
    },
    {
      title: 'Chassi',
      dataIndex: 'chassi',
      key: 'chassi',
    },
    {
      title: 'Cor',
      dataIndex: 'cor',
      key: 'cor',
    },
    {
      title: 'Unidade de Rastreamento',
      dataIndex: 'unidadeRastreamento',
      key: 'unidadeRastreamento',
    },
  ];
  
  const loading = false;
  const [searchValue, setSearchValue] = useState('');
  const [selectedMotorcycle, setSelectedMotorcycle] = useState<Motocicleta | null>(null);
  const [mapModalVisible, setMapModalVisible] = useState(false);

  // Filtrar motocicletas baseado na busca
  const filteredMotocicletas = useMemo(() => {
    if (!searchValue.trim()) return motocicletas;
    
    return motocicletas.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [motocicletas, searchValue]);

  const handleDelete = async (id: number) => {
    const updatedMotos = motocicletas.filter(moto => moto.id !== id);
    setMotocicletas(updatedMotos);
    localStorage.setItem('motocicletas', JSON.stringify(updatedMotos));
    message.success('Motocicleta excluída com sucesso!');
  };

  const handleViewOnMap = (motorcycle: Motocicleta) => {
    setSelectedMotorcycle(motorcycle);
    setMapModalVisible(true);
  };

  const createMapAction = (motorcycle: Motocicleta): ActionButton => ({
    key: 'map',
    icon: <EnvironmentOutlined />,
    label: 'Ver no Mapa',
    type: 'default',
    onClick: () => handleViewOnMap(motorcycle),
  });

  const createActionButtons = (record: any) => [
    createMapAction(record),
    // Edição removida - Para desenvolvimento futuro ass. alissu
    createDeleteAction(
      async () => {
        if (record.id) {
          await handleDelete(record.id);
        }
      },
      'Tem certeza que deseja excluir esta motocicleta?'
    ),
  ];

  return (
    <>
      <StandardPageLayout
        title="Motocicletas"
        subtitle="Lista de motocicletas já cadastradas"
        primaryAction={{
          key: 'create',
          label: 'Cadastrar motocicleta',
          onClick: () => navigate("/motocicletas/register"),
        }}
        showSearch={true}
        searchPlaceholder="Buscar motocicleta..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      >
        <StandardTable
          columns={columns}
          dataSource={filteredMotocicletas}
          loading={loading}
          actionButtons={createActionButtons}
          rowKey="id"
        />
      </StandardPageLayout>

      {selectedMotorcycle && (
        <ZoneMapModal
          visible={mapModalVisible}
          onClose={() => setMapModalVisible(false)}
          motorcycle={selectedMotorcycle}
        />
      )}
    </>
  );
};

export default Equipments;