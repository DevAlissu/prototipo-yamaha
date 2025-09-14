import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, Select, DatePicker, TimePicker, message, Card } from "antd";
import { Layout as AntLayout } from "antd";
import ItemHeader from "../../layout/Header/ItemHeader";
import ItemSideBar from "../../layout/Sidebar/ItemSideBar";
import { useInspecaoStore } from "../../store/inspecaoStore";
import { ResultadoInspecao } from "../../types/inspecao";
import dayjs from "dayjs";

const { Content } = AntLayout;
const { Option } = Select;

const InspecaoRegister: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const { inspecoes, msims, addInspecao, updateInspecao, initializeData } = useInspecaoStore();
  const [loading, setLoading] = useState(false);
  
  const isEdit = !!id;
  
  useEffect(() => {
    initializeData();
  }, []);
  
  useEffect(() => {
    if (isEdit && id) {
      const inspecao = inspecoes.find(i => i.id === parseInt(id));
      if (inspecao) {
        const [date, time] = inspecao.periodo.split(' ');
        const [day, month, year] = date.split('/');
        const formattedDate = `${year}-${month}-${day}`;
        
        form.setFieldsValue({
          ...inspecao,
          data: dayjs(formattedDate),
          hora: dayjs(time, 'HH:mm'),
        });
      }
    }
  }, [isEdit, id, inspecoes, form]);
  
  const modelosMotos = [
    "Yamaha Factor 125",
    "Yamaha NMAX 160",
    "Yamaha MT-03",
    "Yamaha Aerox 155",
    "Yamaha XTZ 250",
    "Yamaha R3",
    "Yamaha FZ25",
    "Yamaha YBR 125",
    "Yamaha Fazer 250",
    "Yamaha Crosser 150"
  ];
  
  const resultados: ResultadoInspecao[] = [
    "Motocicleta com ruído aceitável",
    "Ruído de válvula",
    "Ruído de Aperto",
    "Ruído de folga"
  ];
  
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const periodo = `${values.data.format('DD/MM/YYYY')} ${values.hora.format('HH:mm')}`;
      
      const inspecaoData = {
        periodo,
        modeloMoto: values.modeloMoto,
        resultado: values.resultado,
        msimCodigo: values.msimCodigo,
      };
      
      if (isEdit && id) {
        updateInspecao(parseInt(id), inspecaoData);
        message.success('Inspeção atualizada com sucesso!');
      } else {
        addInspecao(inspecaoData);
        message.success('Inspeção cadastrada com sucesso!');
      }
      
      navigate('/inspecao');
    } catch (error) {
      message.error('Erro ao salvar inspeção');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AntLayout style={{ height: "100vh" }}>
      <ItemSideBar />
      <AntLayout>
        <ItemHeader />
        <Content style={{ padding: 24, overflow: "auto" }}>
          <Card 
            title={isEdit ? "Editar Inspeção" : "Cadastrar Inspeção"}
            style={{ maxWidth: 800, margin: "0 auto" }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              autoComplete="off"
            >
              <Form.Item
                label="Data"
                name="data"
                rules={[{ required: true, message: 'Por favor, selecione a data!' }]}
              >
                <DatePicker 
                  style={{ width: '100%' }}
                  format="DD/MM/YYYY"
                  placeholder="Selecione a data"
                />
              </Form.Item>
              
              <Form.Item
                label="Horário"
                name="hora"
                rules={[{ required: true, message: 'Por favor, selecione o horário!' }]}
              >
                <TimePicker 
                  style={{ width: '100%' }}
                  format="HH:mm"
                  placeholder="Selecione o horário"
                />
              </Form.Item>
              
              <Form.Item
                label="Modelo da Moto"
                name="modeloMoto"
                rules={[{ required: true, message: 'Por favor, selecione o modelo!' }]}
              >
                <Select placeholder="Selecione o modelo da moto">
                  {modelosMotos.map(modelo => (
                    <Option key={modelo} value={modelo}>{modelo}</Option>
                  ))}
                </Select>
              </Form.Item>
              
              <Form.Item
                label="Resultado da Inspeção"
                name="resultado"
                rules={[{ required: true, message: 'Por favor, selecione o resultado!' }]}
              >
                <Select placeholder="Selecione o resultado">
                  {resultados.map(resultado => (
                    <Option 
                      key={resultado} 
                      value={resultado}
                      style={{
                        color: resultado === "Motocicleta com ruído aceitável" ? '#4CAF50' : '#f44336'
                      }}
                    >
                      {resultado}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              
              <Form.Item
                label="MSIM (Código)"
                name="msimCodigo"
                rules={[{ required: true, message: 'Por favor, selecione o MSIM!' }]}
              >
                <Select placeholder="Selecione o código MSIM">
                  {msims.map(msim => (
                    <Option key={msim.codigo} value={msim.codigo}>
                      {msim.codigo} - {msim.nome}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              
              <Form.Item>
                <div style={{ display: 'flex', gap: 16 }}>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    {isEdit ? 'Atualizar' : 'Cadastrar'}
                  </Button>
                  <Button onClick={() => navigate('/inspecao')}>
                    Cancelar
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Card>
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default InspecaoRegister;