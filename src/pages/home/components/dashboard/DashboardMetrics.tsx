// src/pages/home/components/dashboard/DashboardMetrics.tsx
import React from "react";
import { Row, Col } from "antd";
import MetricCard, { MetricCardProps } from "./MetricCard";

export interface DashboardMetricsProps {
  items: MetricCardProps[];
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ items }) => (
  <Row gutter={[8, 8]} wrap={true} align="middle">
    {items.map((item, idx) => (
      <Col xs={12} sm={12} md={6} lg={6} xl={6} key={idx}>
        <MetricCard icon={item.icon} title={item.title} value={item.value} />
      </Col>
    ))}
  </Row>
);

export default DashboardMetrics;
