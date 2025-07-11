import React from "react";
import { Typography, Space, Divider } from "antd";

const { Title, Text } = Typography;

interface ItemHeaderCabecalhoProps {
  title: string;
  subTitle?: string;
}

const ItemHeaderCabecalho: React.FC<ItemHeaderCabecalhoProps> = ({
  title,
  subTitle,
}) => {
  return (
    <Space direction="vertical" style={{ width: "100%", marginBottom: "20px" }}>
      <Title level={2} style={{ color: "#8B0015" }}>
        {title}
      </Title>
      {subTitle && <Text type="secondary">{subTitle}</Text>}
      <Divider style={{ borderColor: "rgba(10,42,102,0.14)" }} />
    </Space>
  );
};

export default ItemHeaderCabecalho;
