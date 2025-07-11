// src/pages/home/components/dashboard/MetricCard.tsx
import React from "react";
import "./metrics.css";

export interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, title, value }) => (
  <div className="metric-card">
    <div className="metric-card-content">
      <div className="metric-card-header">
        <div className="metric-card-icon">{icon}</div>
        <h3 className="metric-card-title">{title}</h3>
      </div>
      <div className="metric-card-value">{value}</div>
    </div>
  </div>
);

export default MetricCard;
