// src/pages/home/components/dashboard/MonitoringCarousel.tsx
import React from "react";
import { Skeleton } from "antd";
import { 
  ThunderboltOutlined, 
  AlertOutlined, 
  CheckCircleOutlined,
  LeftOutlined,
  RightOutlined
} from "@ant-design/icons";
import { MonitoringCardData } from "../../hooks/useMonitoringData";
import { useCarouselScroll } from "../../hooks/useCarouselScroll";
import "./carousel.css";

interface MonitoringCarouselProps {
  data: MonitoringCardData[];
  loading: boolean;
  onViewDetails: (monitoringId: number) => void;
}

const MonitoringCarousel: React.FC<MonitoringCarouselProps> = ({
  data,
  loading,
  onViewDetails,
}) => {
  const { scroll, carouselProps } = useCarouselScroll();

  if (loading) {
    return (
      <div className="carousel-container">
        <div className="carousel-loading">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="carousel-loading-card">
              <Skeleton active paragraph={{ rows: 4 }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="carousel-container">
        <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
          <ThunderboltOutlined style={{ fontSize: "48px", marginBottom: "16px" }} />
          <p>Nenhum monitoramento encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="carousel-container">
      <div className="carousel-track" {...carouselProps}>
        {data.map((monitoring) => (
          <div key={monitoring.id} className="carousel-card">
            <div className="carousel-card-header">
              <div className="carousel-card-title">
                <ThunderboltOutlined style={{ color: "#004281" }} />
                <span>{monitoring.name}</span>
              </div>
              {monitoring.alerta && (
                <AlertOutlined style={{ color: "#ef4444", fontSize: "14px" }} />
              )}
            </div>
            
            <div className="carousel-card-body">
              <div className="carousel-description">
                {monitoring.description}
              </div>

              <div className="carousel-metrics">
                <div className="carousel-metric">
                  <div className="carousel-metric-value">
                    {monitoring.itensMonitorados}
                  </div>
                  <div className="carousel-metric-label">
                    Itens Monitorados
                  </div>
                </div>
                <div className="carousel-metric">
                  <div className="carousel-metric-value">
                    {monitoring.missoesAtivas}
                  </div>
                  <div className="carousel-metric-label">
                    Missões Ativas
                  </div>
                </div>
              </div>

              <div className="carousel-info-section">
                <div className="carousel-info-row">
                  <CheckCircleOutlined />
                  <span>Consumo: <strong>{monitoring.consumo}</strong></span>
                </div>
                <div className="carousel-info-row">
                  <span>Tipo: <strong>{monitoring.type_mmonitoring}</strong></span>
                </div>
              </div>

              <button
                className="carousel-details-button"
                onClick={() => {
                  console.log('🎯 Botão desktop monitoramento clicado - ID:', monitoring.id);
                  onViewDetails(monitoring.id);
                }}
              >
                Ver Detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {data.length > 1 && (
        <div className="carousel-navigation">
          <button 
            className="carousel-nav-button"
            onClick={() => scroll('left')}
          >
            <LeftOutlined />
          </button>
          <button 
            className="carousel-nav-button"
            onClick={() => scroll('right')}
          >
            <RightOutlined />
          </button>
        </div>
      )}
    </div>
  );
};

export default MonitoringCarousel;