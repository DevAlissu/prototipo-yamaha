import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import ItemSideBar from "../../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../../layout/Header/components/ItemHeaderCabecalho";
import DynamicForm from "../../../components/form/DynamicForm";
import { useEquipamentsStore } from "../../../store/equipaments";
import { getProductionLines } from "../../../services/ProductionLinesService";

const EditEquipment: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { fetchEquipamentById, updateEquipament } = useEquipamentsStore();
  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);

  // Usando index signature pra TS não encher o saco
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({
    name: "",
    description: "",
    power: "",
    tension: "",
    energy_consumption: "",
    max_consumption: "",
    min_consumption: "",
    production_line: null,
  });

  const [productionLinesOptions, setProductionLinesOptions] = useState<
    { value: number; label: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id || isNaN(Number(id))) {
        message.error("ID inválido para edição.");
        return;
      }

      setLoading(true);
      try {
        const data = await fetchEquipamentById(Number(id));
        setFormValues({
          name: data.name || "",
          description: data.description || "",
          power: data.power ?? "",
          tension: data.tension ?? "",
          energy_consumption: data.energy_consumption ?? "",
          max_consumption: data.max_consumption ?? "",
          min_consumption: data.min_consumption ?? "",
          production_line: data.production_line ?? null,
        });

        const productionLinesData = await getProductionLines();
        setProductionLinesOptions(
          productionLinesData.map((line) => ({
            value: line.id,
            label: line.name,
          }))
        );
      } catch (error) {
        message.error("Erro ao carregar os dados do equipamento.");
        console.error("Erro ao buscar equipamento:", error);
      } finally {
        setLoading(false);
        setLoadingOptions(false);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [id]);

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // Lista dos campos obrigatórios
    const requiredFields = [
      { key: "name", label: "Nome" },
      { key: "description", label: "Descrição" },
      { key: "power", label: "Potência (W)" },
      { key: "tension", label: "Tensão (V)" },
      { key: "energy_consumption", label: "Consumo de Energia (kWh)" },
      { key: "max_consumption", label: "Consumo Máximo (kWh)" },
      { key: "min_consumption", label: "Consumo Mínimo (kWh)" },
      { key: "production_line", label: "Linha de Produção" },
    ];

    // Validação dinâmica
    const missing = requiredFields.filter(
      (f) =>
        formValues[f.key] === "" ||
        formValues[f.key] === null ||
        formValues[f.key] === undefined ||
        (typeof formValues[f.key] === "string" &&
          !formValues[f.key].toString().trim())
    );

    if (missing.length > 0) {
      message.error(
        `Preencha os campos obrigatórios: ${missing
          .map((m) => m.label)
          .join(", ")}`
      );
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      await updateEquipament(Number(id), {
        name: formValues.name,
        description: formValues.description,
        power: Number(formValues.power),
        tension: Number(formValues.tension),
        energy_consumption: Number(formValues.energy_consumption),
        max_consumption: Number(formValues.max_consumption),
        min_consumption: Number(formValues.min_consumption),
        production_line: Number(formValues.production_line),
      });

      message.success("Equipamento atualizado com sucesso!");
      navigate("/equipments");
    } catch (error) {
      message.error("Erro ao atualizar equipamento.");
      console.error("Erro ao atualizar equipamento:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout-container">
      <ItemSideBar />
      <div className="content-container">
        <ItemHeader />
        <main className="content">
          <ItemHeaderCabecalho
            title="Editar Equipamento"
            subTitle="Atualize os dados do equipamento"
          />
          <DynamicForm
            fields={[
              { name: "name", label: "Nome", type: "input", required: true },
              {
                name: "description",
                label: "Descrição",
                type: "textarea",
                required: true,
              },
              {
                name: "power",
                label: "Potência (W)",
                type: "number",
                required: true,
              },
              {
                name: "tension",
                label: "Tensão (V)",
                type: "number",
                required: true,
              },
              {
                name: "energy_consumption",
                label: "Consumo de Energia (kWh)",
                type: "number",
                required: true,
              },
              {
                name: "max_consumption",
                label: "Consumo Máximo (kWh)",
                type: "number",
                required: true,
              },
              {
                name: "min_consumption",
                label: "Consumo Mínimo (kWh)",
                type: "number",
                required: true,
              },
              {
                name: "production_line",
                label: "Linha de Produção",
                type: "select",
                options: productionLinesOptions,
                disabled: loadingOptions,
                required: true,
              },
            ]}
            values={formValues}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            onCancel={() => navigate("/equipments")}
          />
        </main>
      </div>
    </div>
  );
};

export default EditEquipment;
