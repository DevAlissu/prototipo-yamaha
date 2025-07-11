import React, { useState, useEffect, useMemo } from "react";
import { Layout as AntLayout, Switch, Input } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import ItemHeader from "../../layout/Header/ItemHeader";
import ItemSideBar from "../../layout/Sidebar/ItemSideBar";
import ZoneMap from "../../components/ZoneMap/ZoneMap";
import "./Home.css";

const { Content } = AntLayout;

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

const HomePage: React.FC = () => {
  const [motocicletas, setMotocicletas] = useState<Motocicleta[]>([]);
  const [selectedMotorcycle, setSelectedMotorcycle] = useState<Motocicleta | null>(null);
  const [iotStates, setIotStates] = useState<{ [key: number]: boolean }>({});
  const [searchValue, setSearchValue] = useState('');

  // Carrega dados do localStorage ou usa dados mock
  useEffect(() => {
    const savedMotos = localStorage.getItem('motocicletas');
    const version = localStorage.getItem('motocicletas_version');
    
    // Forçar atualização se não tem versão ou dados
    if (savedMotos && version === '5.0') {
      const parsedMotos = JSON.parse(savedMotos);
      // Verificar se tem campo zona
      if (parsedMotos.length > 0 && parsedMotos[0].zona !== undefined) {
        setMotocicletas(parsedMotos);
        // Seleciona a primeira moto por padrão
        if (parsedMotos.length > 0) {
          setSelectedMotorcycle(parsedMotos[0]);
        }
        return;
      }
    }
    
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
        posicao: { x: 323, y: 595 }
      },
      {
        id: 2,
        codigo: "MOTO002",
        modelo: "Yamaha NMAX 160",
        chassi: "9C6KE2220LR234567",
        cor: "Azul",
        unidadeRastreamento: "IOT002 - LoRaWAN Tracker",
        zona: 2,
        posicao: { x: 784, y: 280 }
      },
      {
        id: 3,
        codigo: "MOTO003",
        modelo: "Yamaha MT-03",
        chassi: "9C6RF1110LR345678",
        cor: "Preta",
        unidadeRastreamento: "IOT003 - LoRaWAN Tracker",
        zona: 3,
        posicao: { x: 784, y: 445 }
      },
      {
        id: 4,
        codigo: "MOTO004",
        modelo: "Yamaha PCX 150",
        chassi: "9C6KE5020KR789012",
        cor: "Branca",
        unidadeRastreamento: "IOT004 - LoRaWAN Tracker",
        zona: 4,
        posicao: { x: 724, y: 580 }
      },
      {
        id: 5,
        codigo: "MOTO005",
        modelo: "Yamaha XTZ 250",
        chassi: "9C6DF2220LR890123",
        cor: "Amarela",
        unidadeRastreamento: "IOT005 - LoRaWAN Tracker",
        zona: 3,
        posicao: { x: 784, y: 445 }
      },
      {
        id: 6,
        codigo: "MOTO006",
        modelo: "Yamaha R3",
        chassi: "9C6RC6030MR901234",
        cor: "Azul",
        unidadeRastreamento: "IOT006 - LoRaWAN Tracker",
        zona: 2,
        posicao: { x: 784, y: 280 }
      }
    ];

    // Salva no localStorage
    localStorage.setItem('motocicletas', JSON.stringify(initialData));
    localStorage.setItem('motocicletas_version', '5.0');
    setMotocicletas(initialData);
    
    // Seleciona a primeira moto por padrão
    if (initialData.length > 0) {
      setSelectedMotorcycle(initialData[0]);
    }
  }, []);

  const handleMotorcycleSelect = (motorcycle: Motocicleta) => {
    setSelectedMotorcycle(motorcycle);
  };

  const handleIotToggle = (motorcycleId: number, active: boolean) => {
    setIotStates(prev => ({
      ...prev,
      [motorcycleId]: active
    }));
  };

  // Filtrar motocicletas baseado na busca
  const filteredMotocicletas = useMemo(() => {
    if (!searchValue.trim()) return motocicletas;
    
    return motocicletas.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [motocicletas, searchValue]);

  return (
    <AntLayout style={{ height: "100vh", overflow: "hidden" }}>
      <ItemSideBar />
      <AntLayout>
        <ItemHeader />
        <Content style={{ 
          padding: 16, 
          height: "100%", 
          overflowY: "auto"
        }}>
          <div className="home-container">
            {/* Lado Esquerdo - Mapa */}
            <div className="map-section">
              <ZoneMap
                highlightedZone={selectedMotorcycle?.zona}
                showHeatMap={!!selectedMotorcycle}
                heatMapPosition={selectedMotorcycle?.posicao || { x: 400, y: 300 }}
                iotActive={selectedMotorcycle ? iotStates[selectedMotorcycle.id] || false : false}
              />
              
              {/* Informações da motocicleta selecionada - Desktop apenas */}
              {selectedMotorcycle && (
                <div className="motorcycle-info-panel">
                  <h3>Motocicleta Localizada</h3>
                  
                  <div className="info-grid">
                    <div className="info-item">
                      <strong>Código:</strong> {selectedMotorcycle.codigo}
                    </div>
                    <div className="info-item">
                      <strong>Modelo:</strong> {selectedMotorcycle.modelo}
                    </div>
                    <div className="info-item">
                      <strong>Chassi:</strong> {selectedMotorcycle.chassi}
                    </div>
                    <div className="info-item">
                      <strong>Cor:</strong> {selectedMotorcycle.cor}
                    </div>
                    <div className="info-item">
                      <strong>Zona:</strong> {selectedMotorcycle.zona}
                    </div>
                    <div className="info-item">
                      <strong>Rastreamento:</strong> {selectedMotorcycle.unidadeRastreamento}
                    </div>
                  </div>

                  {/* Controle de Sinalização */}
                  <div className="iot-control">
                    <div className="iot-status">
                      <span className={`status-indicator ${iotStates[selectedMotorcycle.id] ? 'active' : 'inactive'}`}></span>
                      <span className="status-text">
                        Sinalização: {iotStates[selectedMotorcycle.id] ? 'ATIVO' : 'INATIVO'}
                      </span>
                    </div>
                    <Switch 
                      checked={iotStates[selectedMotorcycle.id] || false}
                      onChange={(checked) => handleIotToggle(selectedMotorcycle.id, checked)}
                      checkedChildren="ATIVO"
                      unCheckedChildren="INATIVO"
                    />
                    <div className="tracking-info">
                      <small>Rastreamento sempre ativo</small>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Lista de Chassi - Lado direito no desktop, abaixo no mobile */}
            <div className="chassis-list-section">
              <div className="chassis-list-header">
                <h3>Lista de Motocicletas</h3>
                <Input
                  placeholder="Buscar motocicleta..."
                  prefix={<SearchOutlined />}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="chassis-search"
                />
              </div>
              <div className="chassis-list">
                {filteredMotocicletas.map((motorcycle) => (
                  <div 
                    key={motorcycle.id}
                    className={`chassis-item ${selectedMotorcycle?.id === motorcycle.id ? 'selected' : ''}`}
                    onClick={() => handleMotorcycleSelect(motorcycle)}
                  >
                    <div className="chassis-info">
                      <div className="chassis-main">
                        <strong>{motorcycle.chassi}</strong>
                      </div>
                      <div className="chassis-details">
                        <span>{motorcycle.codigo} - {motorcycle.modelo}</span>
                        <span className="zone-badge">Zona {motorcycle.zona}</span>
                      </div>
                    </div>
                    
                    {/* Switch individual na lista */}
                    <div className="chassis-iot-control">
                      <div className="iot-label">
                        <span>Sinalização</span>
                        <span className={`iot-status-text ${iotStates[motorcycle.id] ? 'active' : 'inactive'}`}>
                          {iotStates[motorcycle.id] ? 'ATIVO' : 'INATIVO'}
                        </span>
                      </div>
                      <Switch 
                        size="small"
                        checked={iotStates[motorcycle.id] || false}
                        onChange={(checked) => handleIotToggle(motorcycle.id, checked)}
                        onClick={(e) => (e as any).stopPropagation?.()} // Evita seleção quando clica no switch
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default HomePage;