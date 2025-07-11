import React from "react";
import { Table } from "antd";
import type { TableProps as AntTableProps, ColumnsType } from "antd/es/table";

interface TableProps<T> {
  columns: ColumnsType<T>;
  data: T[];
  loading?: boolean;
  rowKey?: string;
}

/**
 * Componente reutilizável de tabela
 * @param columns - Definição das colunas da tabela
 * @param data - Dados a serem exibidos na tabela
 * @param loading - Define se a tabela está carregando
 * @param rowKey - Chave única de cada linha da tabela
 */
const CustomTable = <T extends object>({
  columns,
  data,
  loading = false,
  rowKey = "id",
}: TableProps<T>) => {
  return (
    <div className="table-container">
      <Table<T>
  columns={columns}
  dataSource={data}
  loading={loading}
  rowKey={rowKey}
  pagination={{ pageSize: 5 }}
  scroll={{ x: true }}  
/>

    </div>
  );
};

export default CustomTable;