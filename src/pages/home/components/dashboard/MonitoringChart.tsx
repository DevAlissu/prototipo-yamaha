import React from "react";
import { Card } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  title: string;
  data: { name: string; value: number }[];
  stroke?: string;
}

const MonitoringChart: React.FC<Props> = ({
  title,
  data,
  stroke = "#8884d8",
}) => {
  return (
    <Card title={title} style={{ marginBottom: "20px" }}>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke={stroke} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default MonitoringChart;
