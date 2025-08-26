import React, { useEffect, useState } from "react";
import { Layout as AntLayout, Card, Row, Col, Button, Empty, Spin, Badge } from "antd";
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined,
  WifiOutlined,
  ToolOutlined
} from '@ant-design/icons';
import ItemHeader from "../../layout/Header/ItemHeader";
import ItemSideBar from "../../layout/Sidebar/ItemSideBar";
import { useInspecaoStore } from "../../store/inspecaoStore";
import "./Home.css";

const { Content } = AntLayout;

const HomePage: React.FC = () => {
  const { 
    inspecoes,
    msims,
    initializeData,
    marcarComoLida,
    getTotalInspecionadas,
    getTotalFalhas,
    getTotalMSIMAtivos,
    getInspecoesFalhas
  } = useInspecaoStore();
  
  const [loading, setLoading] = useState(true);
  const [falhasNaoLidas, setFalhasNaoLidas] = useState<any[]>([]);
  
  useEffect(() => {
    initializeData();
    setLoading(false);
  }, []);
  
  useEffect(() => {
    const falhas = getInspecoesFalhas().filter(i => !i.lida);
    setFalhasNaoLidas(falhas);
  }, [inspecoes]);
  
  const handleMarcarComoLida = (id: number) => {
    marcarComoLida(id);
  };
  
  const metrics = [
    {
      title: "MSIM Ativos",
      value: getTotalMSIMAtivos(),
      icon: <WifiOutlined style={{ fontSize: 24, color: '#1890ff' }} />,
      color: '#e6f7ff',
      borderColor: '#1890ff'
    },
    {
      title: "Motocicletas Inspecionadas",
      value: getTotalInspecionadas(),
      icon: <ToolOutlined style={{ fontSize: 24, color: '#52c41a' }} />,
      color: '#f6ffed',
      borderColor: '#52c41a'
    },
    {
      title: "Falhas Identificadas",
      value: getTotalFalhas(),
      icon: <CloseCircleOutlined style={{ fontSize: 24, color: '#ff4d4f' }} />,
      color: '#fff1f0',
      borderColor: '#ff4d4f'
    },
    {
      title: "Falhas Pendentes",
      value: falhasNaoLidas.length,
      icon: <Badge status="processing" />,
      color: '#fff7e6',
      borderColor: '#faad14'
    }
  ];
  
  const getResultColor = (resultado: string) => {
    switch(resultado) {
      case "Ruído de válvula":
        return { bg: '#ff7875', text: '#fff' };
      case "Ruído de Aperto":
        return { bg: '#ff9c6e', text: '#fff' };
      case "Ruído de folga":
        return { bg: '#ffa940', text: '#fff' };
      default:
        return { bg: '#ff4d4f', text: '#fff' };
    }
  };
  
  if (loading) {
    return (
      <AntLayout style={{ height: "100vh" }}>
        <ItemSideBar />
        <AntLayout>
          <ItemHeader />
          <Content style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}>
            <Spin size="large" />
          </Content>
        </AntLayout>
      </AntLayout>
    );
  }
  
  return (
    <AntLayout style={{ height: "100vh" }}>
      <ItemSideBar />
      <AntLayout>
        <ItemHeader />
        <Content style={{ 
          padding: 24, 
          overflowY: "auto",
          background: '#f0f2f5'
        }}>
          {/* Métricas */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            {metrics.map((metric, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card
                  style={{ 
                    background: metric.color,
                    borderLeft: `4px solid ${metric.borderColor}`,
                    height: '100%'
                  }}
                  bodyStyle={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px'
                  }}
                >
                  <div>
                    <div style={{ 
                      fontSize: 14, 
                      color: '#666',
                      marginBottom: 8
                    }}>
                      {metric.title}
                    </div>
                    <div style={{ 
                      fontSize: 32, 
                      fontWeight: 'bold',
                      color: metric.borderColor
                    }}>
                      {metric.value}
                    </div>
                  </div>
                  <div>{metric.icon}</div>
                </Card>
              </Col>
            ))}
          </Row>
          
          {/* Título da seção */}
          <div style={{ 
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <h2 style={{ margin: 0 }}>Inspeções com Falhas</h2>
            {falhasNaoLidas.length > 0 && (
              <Badge 
                count={falhasNaoLidas.length} 
                style={{ backgroundColor: '#ff4d4f' }}
              />
            )}
          </div>
          
          {/* Cards de Inspeções com Falhas */}
          {falhasNaoLidas.length === 0 ? (
            <Card>
              <Empty 
                description="Nenhuma falha pendente de leitura"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </Card>
          ) : (
            <Row gutter={[16, 16]}>
              {falhasNaoLidas.map((inspecao) => {
                const msim = msims.find(m => m.codigo === inspecao.msimCodigo);
                const colors = getResultColor(inspecao.resultado);
                
                return (
                  <Col xs={24} sm={12} lg={8} xl={6} key={inspecao.id}>
                    <Card
                      hoverable
                      style={{ 
                        height: '100%',
                        borderTop: `3px solid ${colors.bg}`
                      }}
                      bodyStyle={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        height: '100%'
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        {/* Header do Card */}
                        <div style={{ 
                          marginBottom: 16,
                          paddingBottom: 12,
                          borderBottom: '1px solid #f0f0f0'
                        }}>
                          <div style={{ 
                            fontSize: 16, 
                            fontWeight: 'bold',
                            marginBottom: 4
                          }}>
                            {inspecao.modeloMoto}
                          </div>
                          <div style={{ 
                            fontSize: 12, 
                            color: '#999'
                          }}>
                            {inspecao.periodo}
                          </div>
                        </div>
                        
                        {/* Resultado */}
                        <div style={{ marginBottom: 12 }}>
                          <div style={{ 
                            fontSize: 12, 
                            color: '#666',
                            marginBottom: 4
                          }}>
                            Resultado:
                          </div>
                          <div style={{ 
                            padding: '4px 8px',
                            background: colors.bg,
                            color: colors.text,
                            borderRadius: 4,
                            fontSize: 12,
                            fontWeight: 'bold',
                            display: 'inline-block'
                          }}>
                            {inspecao.resultado}
                          </div>
                        </div>
                        
                        {/* MSIM */}
                        <div style={{ marginBottom: 12 }}>
                          <div style={{ 
                            fontSize: 12, 
                            color: '#666',
                            marginBottom: 4
                          }}>
                            Dispositivo MSIM:
                          </div>
                          <div style={{ fontSize: 14 }}>
                            <strong>{inspecao.msimCodigo}</strong>
                            {msim && (
                              <div style={{ 
                                fontSize: 11, 
                                color: '#999',
                                marginTop: 2
                              }}>
                                {msim.nome}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Botão */}
                      <Button
                        type="primary"
                        block
                        icon={<CheckCircleOutlined />}
                        onClick={() => handleMarcarComoLida(inspecao.id)}
                        style={{ marginTop: 'auto' }}
                      >
                        Marcar como Lido
                      </Button>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          )}
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default HomePage;