import React, { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import ItemSideBar from "../../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../../layout/Header/components/ItemHeaderCabecalho";
import DynamicForm from "../../../components/form/DynamicForm";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState<{ [key: string]: any }>({
    codigo: "",
    modelo: "",
    chassi: "",
    cor: "",
    unidadeRastreamento: "",
    zona: "",
  });

  // Mock options para os selects
  const modeloOptions = [
    { value: "Honda CG 160", label: "Honda CG 160" },
    { value: "Yamaha Factor 125", label: "Yamaha Factor 125" },
    { value: "Suzuki Burgman 125", label: "Suzuki Burgman 125" },
    { value: "Honda PCX 150", label: "Honda PCX 150" },
    { value: "Yamaha NMAX 160", label: "Yamaha NMAX 160" },
    { value: "Honda CB 600F", label: "Honda CB 600F" },
  ];

  const corOptions = [
    { value: "Vermelha", label: "Vermelha" },
    { value: "Azul", label: "Azul" },
    { value: "Preta", label: "Preta" },
    { value: "Branca", label: "Branca" },
    { value: "Prata", label: "Prata" },
    { value: "Verde", label: "Verde" },
  ];

  const unidadeRastreamentoOptions = [
    { value: "IOT001 - LoRaWAN Tracker", label: "IOT001 - LoRaWAN Tracker" },
    { value: "IOT002 - GPS Tracker", label: "IOT002 - GPS Tracker" },
    { value: "IOT003 - LoRaWAN Device", label: "IOT003 - LoRaWAN Device" },
    { value: "IOT004 - Bluetooth Tracker", label: "IOT004 - Bluetooth Tracker" },
    { value: "IOT005 - Satellite Tracker", label: "IOT005 - Satellite Tracker" },
  ];

  const zonaOptions = [
    { value: 1, label: "Zona 1" },
    { value: 2, label: "Zona 2" },
    { value: 3, label: "Zona 3" },
    { value: 4, label: "Zona 4" },
    { value: 5, label: "Zona 5" },
  ];

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const requiredFields = [
      { key: "codigo", label: "Código" },
      { key: "modelo", label: "Modelo" },
      { key: "chassi", label: "Chassi" },
      { key: "cor", label: "Cor" },
      { key: "unidadeRastreamento", label: "Unidade de Rastreamento" },
      { key: "zona", label: "Zona" },
    ];

    // Validação dinâmica dos campos obrigatórios
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
      // Verificar se já existe uma motocicleta com o mesmo código
      const existingMotos = JSON.parse(localStorage.getItem('motocicletas') || '[]');
      const codeExists = existingMotos.some((moto: any) => moto.codigo === formValues.codigo);
      
      if (codeExists) {
        message.error("Já existe uma motocicleta com este código!");
        setLoading(false);
        return;
      }

      // Gerar novo ID
      const newId = existingMotos.length > 0 ? Math.max(...existingMotos.map((m: any) => m.id)) + 1 : 1;
      
      // Gerar posição baseada na zona
      const getZonePosition = (zona: number) => {
        const positions = {
          1: { x: 95, y: 520 },   // Zona 1 - centro da zona
          2: { x: 695, y: 120 },  // Zona 2 - centro da zona
          3: { x: 695, y: 330 },  // Zona 3 - centro da zona
          4: { x: 620, y: 500 },  // Zona 4 - centro da zona
          5: { x: 935, y: 300 }   // Zona 5 - centro da zona
        };
        // Adiciona variação aleatória para não sobrepor motos na mesma zona
        const basePos = positions[zona as keyof typeof positions] || positions[1];
        return {
          x: basePos.x + (Math.random() - 0.5) * 60, // ±30px de variação
          y: basePos.y + (Math.random() - 0.5) * 60
        };
      };
      
      // Criar nova motocicleta
      const newMotocicleta = {
        id: newId,
        codigo: formValues.codigo,
        modelo: formValues.modelo,
        chassi: formValues.chassi,
        cor: formValues.cor,
        unidadeRastreamento: formValues.unidadeRastreamento,
        zona: formValues.zona,
        posicao: getZonePosition(formValues.zona),
      };

      // Adicionar à lista existente
      const updatedMotos = [...existingMotos, newMotocicleta];
      localStorage.setItem('motocicletas', JSON.stringify(updatedMotos));
      
      console.log("Motocicleta cadastrada:", newMotocicleta);
      
      // Simula delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      message.success("Motocicleta cadastrada com sucesso!");
      navigate("/motocicletas");
    } catch (error) {
      message.error("Erro ao cadastrar motocicleta!");
      console.error(error);
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
            title="Cadastro de Motocicleta"
            subTitle="Preencha os campos abaixo para cadastrar uma motocicleta"
          />
          <DynamicForm
            fields={[
              { 
                name: "codigo", 
                label: "Código", 
                type: "input", 
                required: true,
                placeholder: "Ex: MOTO001"
              },
              {
                name: "modelo",
                label: "Modelo",
                type: "select",
                options: modeloOptions,
                required: true,
              },
              {
                name: "chassi",
                label: "Chassi",
                type: "input",
                required: true,
                placeholder: "Ex: 9C2JC4010JR123456"
              },
              {
                name: "cor",
                label: "Cor",
                type: "select",
                options: corOptions,
                required: true,
              },
              {
                name: "unidadeRastreamento",
                label: "Unidade de Rastreamento",
                type: "select",
                options: unidadeRastreamentoOptions,
                required: true,
              },
              {
                name: "zona",
                label: "Zona do Galpão",
                type: "select",
                options: zonaOptions,
                required: true,
              },
            ]}
            values={formValues}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            onCancel={() => navigate("/motocicletas")}
          />
        </main>
      </div>
    </div>
  );
};

export default Register;
