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

  // Carrega dados do localStorage
  useEffect(() => {
    const savedMotos = localStorage.getItem('motocicletas');
    if (savedMotos) {
      const parsedMotos = JSON.parse(savedMotos);
      setMotocicletas(parsedMotos);
      // Seleciona a primeira moto por padrão
      if (parsedMotos.length > 0) {
        setSelectedMotorcycle(parsedMotos[0]);
      }
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
              
              {/* Informações da motocicleta selecionada */}
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

            {/* Lado Direito - Lista de Chassi */}
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
                        onClick={(e) => e.stopPropagation()} // Evita seleção quando clica no switch
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