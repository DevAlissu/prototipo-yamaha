// src/pages/equipments/hooks/useEquipamentsTable.tsx
import { useEffect, useState } from "react";
import { message } from "antd";
import { SortOrder } from "antd/es/table/interface";
import { useEquipamentsStore } from "../../../store/equipaments";
import { EquipamentItem } from "../../../types/equipaments";

export const useEquipamentsTable = () => {
  const { equipaments, fetchEquipaments } = useEquipamentsStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEquipamentsFromAPI = async () => {
      try {
        setLoading(true);
        await fetchEquipaments();
      } catch (error) {
        console.error("Erro ao buscar equipamentos:", error);
        message.error("Erro ao carregar os equipamentos!");
      } finally {
        setLoading(false);
      }
    };

    fetchEquipamentsFromAPI();
  }, []);

  // Definição das colunas da tabela
  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      sorter: (a: EquipamentItem, b: EquipamentItem) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (text: string | undefined) => <strong>{text ?? "Sem nome"}</strong>,
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
      render: (text: string | undefined) => <span>{text ?? "Sem descrição"}</span>,
    },
    {
      title: "Potência (W)",
      dataIndex: "power",
      key: "power",
      render: (text: number | undefined) => <span>{text ?? "Não informado"}</span>,
    },
    {
      title: "Tensão (V)",
      dataIndex: "tension",
      key: "tension",
      render: (text: number | undefined) => <span>{text ?? "Não informado"}</span>,
    },
    {
      title: "Consumo de Energia (kWh)",
      dataIndex: "energy_consumption",
      key: "energy_consumption",
      render: (text: number | undefined) => <span>{text ?? "Não informado"}</span>,
    },
  ];

  return { columns, equipaments, loading };
};