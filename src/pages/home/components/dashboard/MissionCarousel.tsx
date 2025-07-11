// src/pages/home/components/dashboard/MissionCarousel.tsx
import React from "react";
import { Skeleton } from "antd";
import { 
  RocketOutlined, 
  UserOutlined, 
  CalendarOutlined,
  AlertOutlined,
  CheckCircleOutlined,
  LeftOutlined,
  RightOutlined
} from "@ant-design/icons";
import { MissionCardData } from "../../hooks/useMissionData";
import { useCarouselScroll } from "../../hooks/useCarouselScroll";
import "./carousel.css";

interface MissionCarouselProps {
  data: MissionCardData[];
  loading: boolean;
  onViewDetails: (missionId: number) => void;
}

const MissionCarousel: React.FC<MissionCarouselProps> = ({
  data,
  loading,
  onViewDetails,
}) => {
  const { scroll, carouselProps } = useCarouselScroll();

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Em Andamento":
        return "em-andamento";
      case "Finalizada":
        return "finalizada";
      case "Pendente":
        return "pendente";
      default:
        return "pendente";
    }
  };

  if (loading) {
    return (
      <div className="carousel-container">
        <div className="carousel-loading">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="carousel-loading-card">
              <Skeleton active paragraph={{ rows: 5 }} />
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
          <RocketOutlined style={{ fontSize: "48px", marginBottom: "16px" }} />
          <p>Nenhuma missão encontrada</p>
        </div>
      </div>
    );
  }

  return (
    <div className="carousel-container">
      <div className="carousel-track" {...carouselProps}>
        {data.map((mission) => (
          <div key={mission.id} className="carousel-card">
            <div className="carousel-card-header">
              <div className="carousel-card-title">
                <RocketOutlined style={{ color: "#004281" }} />
                <span>{mission.name}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {mission.alerta && (
                  <AlertOutlined style={{ color: "#ef4444", fontSize: "14px" }} />
                )}
                <span className={`mission-status-tag ${getStatusClass(mission.status)}`}>
                  {mission.status}
                </span>
              </div>
            </div>
            
            <div className="carousel-card-body">
              <div className="carousel-description">
                {mission.description}
              </div>

              <div className="carousel-info-section">
                <div className="carousel-info-row">
                  <UserOutlined />
                  <span>{mission.responsavel}</span>
                </div>
                <div className="carousel-info-row">
                  <span><strong>Monitoramento:</strong></span>
                  <span>{mission.monitoringName}</span>
                </div>
                <div className="carousel-info-row">
                  <CalendarOutlined />
                  <span>{mission.periodo}</span>
                </div>
                <div className="carousel-info-row">
                  <CheckCircleOutlined />
                  <span>Consumo: <strong>{mission.consumo}</strong></span>
                </div>
              </div>

              <div className="carousel-metrics">
                <div className="carousel-metric">
                  <div className="carousel-metric-value">
                    {mission.itensMonitorados}
                  </div>
                  <div className="carousel-metric-label">
                    Itens Monitorados
                  </div>
                </div>
              </div>

              <button
                className={`carousel-details-button ${mission.status === 'Pendente' ? 'disabled' : ''}`}
                onClick={() => {
                  console.log('🎯 Botão desktop clicado - Missão:', mission.id, 'Status:', mission.status);
                  if (mission.status !== 'Pendente') {
                    onViewDetails(mission.id);
                  }
                }}
                disabled={mission.status === 'Pendente'}
                title={mission.status === 'Pendente' ? 'Missão ainda não iniciada' : ''}
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

export default MissionCarousel;