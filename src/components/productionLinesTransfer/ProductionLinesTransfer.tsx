import React from "react";
import { Transfer } from "antd";
import type { TransferDirection } from "antd/es/transfer";
import type { Key } from "react";
import { ProductionLine } from "../../types/ProductionLinesTypes"; // 🔹 Importando corretamente

interface TransferItem {
  key: string;
  title: string;
  value_mensuration_estimated: number;
}

interface ProductionLinesTransferProps {
  availableLines: ProductionLine[];
  selectedKeys: Key[];
  onChange: (keys: Key[], direction: TransferDirection, moveKeys: Key[]) => void;
}

const ProductionLinesTransfer: React.FC<ProductionLinesTransferProps> = ({
  availableLines,
  selectedKeys,
  onChange,
}) => {
  // 🔹 Transformando para o formato aceito pelo Transfer do Ant Design
  const dataSource: TransferItem[] = availableLines.map((line) => ({
    key: String(line.id),
    title: `${line.name} - ${line.value_mensuration_estimated} kWh`,
    value_mensuration_estimated: line.value_mensuration_estimated,
  }));

  // 🔹 Ajustando para o formato correto esperado pelo `onChange`
  const handleChange = (targetKeys: Key[], direction: TransferDirection, moveKeys: Key[]) => {
    onChange(targetKeys, direction, moveKeys);
  };

  return (
    <Transfer
      dataSource={dataSource}
      titles={["Linhas Disponíveis", "Linhas Associadas"]}
      targetKeys={selectedKeys.map(String)} // ✅ Converte para string, já que Ant Design usa `string[]`
      onChange={handleChange}
      render={(item) => item.title}
      showSearch
      rowKey={(item) => item.key}
      style={{ width: "100%" }}
    />
  );
};

export default ProductionLinesTransfer;