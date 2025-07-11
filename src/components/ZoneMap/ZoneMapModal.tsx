import React from 'react';
import { Modal } from 'antd';
import ZoneMap from './ZoneMap';

interface ZoneMapModalProps {
  visible: boolean;
  onClose: () => void;
  motorcycle?: {
    id: number;
    codigo: string;
    modelo: string;
    chassi: string;
    cor: string;
    unidadeRastreamento: string;
    zona: number;
    posicao: { x: number; y: number };
  };
}

const ZoneMapModal: React.FC<ZoneMapModalProps> = ({
  visible,
  onClose,
  motorcycle
}) => {
  const [iotActive, setIotActive] = React.useState(false);
  
  // Reset do estado quando modal fecha/abre com nova moto
  React.useEffect(() => {
    if (visible && motorcycle) {
      setIotActive(false); // Sempre inicia como inativo
    }
  }, [visible, motorcycle?.id]);
  
  return (
    <Modal
      title="Localização da Motocicleta no Galpão"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1000}
      centered
      destroyOnClose
      styles={{ body: { padding: '16px' } }}
    >
      {motorcycle && (
        <div>
          <ZoneMap
            highlightedZone={motorcycle.zona}
            showHeatMap={true}
            heatMapPosition={motorcycle.posicao}
            iotActive={iotActive}
          />
          
          {/* Legenda embaixo do mapa */}
          <div style={{ 
            marginTop: '10px', 
            padding: '8px', 
            backgroundColor: 'white', 
            border: '1px solid #dee2e6', 
            borderRadius: '6px',
            display: 'flex',
            justifyContent: 'center',
            gap: '25px',
            fontSize: '11px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ 
                width: '12px', 
                height: '12px', 
                backgroundColor: '#C8E6C9', 
                border: '2px solid #81C784',
                borderRadius: '2px'
              }}></div>
              <span>Zona da Motocicleta</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ 
                width: '12px', 
                height: '12px', 
                backgroundColor: '#f5f5f5', 
                border: '1px solid #bdbdbd',
                borderRadius: '2px'
              }}></div>
              <span>Outras Zonas</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ 
                width: '12px', 
                height: '12px', 
                backgroundColor: 'rgba(255, 87, 34, 0.3)', 
                border: '2px dashed #FF5722',
                borderRadius: '50%'
              }}></div>
              <span>Raio LoRaWAN (5m)</span>
            </div>
          </div>
          
          {/* Info da motocicleta - FORA do mapa */}
          <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '6px', border: '1px solid #dee2e6' }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#495057', fontSize: '14px' }}>Motocicleta Localizada</h4>
            
            {/* Layout em colunas */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              {/* Info da Moto - Coluna 1 */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <div style={{ fontSize: '12px' }}><strong>Código:</strong> {motorcycle.codigo}</div>
                <div style={{ fontSize: '12px' }}><strong>Modelo:</strong> {motorcycle.modelo}</div>
              </div>
              
              {/* Info da Moto - Coluna 2 */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <div style={{ fontSize: '12px' }}><strong>Chassi:</strong> {motorcycle.chassi}</div>
                <div style={{ fontSize: '12px' }}><strong>Zona:</strong> {motorcycle.zona}</div>
              </div>
              
              {/* Controles IoT - Coluna 3 */}
              <div style={{ minWidth: '180px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    backgroundColor: iotActive ? '#4CAF50' : '#757575', 
                    marginRight: '6px',
                    boxShadow: iotActive ? '0 0 6px rgba(76, 175, 80, 0.6)' : 'none',
                    transition: 'all 0.3s ease'
                  }}></span>
                  <span style={{ fontSize: '11px', fontWeight: '600' }}>
                    Sinalização: {iotActive ? 'ATIVO' : 'INATIVO'}
                  </span>
                </div>
                <button 
                  onClick={() => setIotActive(!iotActive)}
                  style={{ 
                    width: '100%', 
                    padding: '6px 10px', 
                    border: '1px solid #dee2e6', 
                    borderRadius: '4px', 
                    background: iotActive ? '#FF5722' : '#f8f9fa',
                    color: iotActive ? 'white' : '#495057',
                    cursor: 'pointer',
                    fontSize: '10px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {iotActive ? 'Desativar Sinalização' : 'Ativar Sinalização'}
                </button>
                <div style={{ marginTop: '4px', textAlign: 'center' }}>
                  <small style={{ color: '#28a745', fontSize: '9px' }}>Rastreamento sempre ativo</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ZoneMapModal;