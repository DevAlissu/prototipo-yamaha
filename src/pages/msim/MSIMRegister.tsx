import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, Select, Switch, message, Card } from "antd";
import { Layout as AntLayout } from "antd";
import ItemHeader from "../../layout/Header/ItemHeader";
import ItemSideBar from "../../layout/Sidebar/ItemSideBar";
import { useInspecaoStore } from "../../store/inspecaoStore";

const { Content } = AntLayout;
const { Option } = Select;

const MSIMRegister: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const { msims, addMSIM, updateMSIM, initializeData } = useInspecaoStore();
  const [loading, setLoading] = useState(false);
  
  const isEdit = !!id;
  
  useEffect(() => {
    initializeData();
  }, []);
  
  useEffect(() => {
    if (isEdit && id) {
      const msim = msims.find(m => m.id === parseInt(id));
      if (msim) {
        form.setFieldsValue(msim);
      }
    }
  }, [isEdit, id, msims, form]);
  
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
  
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const msimData = {
        nome: values.nome,
        modeloIA: values.modeloIA,
        codigo: values.codigo,
        ativo: values.ativo !== undefined ? values.ativo : true,
      };
      
      if (isEdit && id) {
        updateMSIM(parseInt(id), msimData);
        message.success('MSIM atualizado com sucesso!');
      } else {
        // Verificar se o código já existe
        const codigoExiste = msims.some(m => m.codigo === values.codigo);
        if (codigoExiste) {
          message.error('Este código MSIM já está cadastrado!');
          setLoading(false);
          return;
        }
        
        addMSIM(msimData);
        message.success('MSIM cadastrado com sucesso!');
      }
      
      navigate('/msim');
    } catch (error) {
      message.error('Erro ao salvar MSIM');
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
            title={isEdit ? "Editar MSIM" : "Cadastrar MSIM"}
            style={{ maxWidth: 800, margin: "0 auto" }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              autoComplete="off"
              initialValues={{ ativo: true }}
            >
              <Form.Item
                label="Nome"
                name="nome"
                rules={[
                  { required: true, message: 'Por favor, insira o nome do MSIM!' },
                  { min: 3, message: 'O nome deve ter pelo menos 3 caracteres!' }
                ]}
              >
                <Input placeholder="Ex: Sensor IA Yamaha v1" />
              </Form.Item>
              
              <Form.Item
                label="Modelos de IA (Modelos das Motos)"
                name="modeloIA"
                rules={[{ required: true, message: 'Por favor, selecione os modelos!' }]}
              >
                <Select 
                  mode="multiple"
                  placeholder="Selecione os modelos de motos compatíveis"
                  onChange={(values) => {
                    // Juntar os valores selecionados em uma string
                    form.setFieldValue('modeloIA', values.join(', '));
                  }}
                >
                  {modelosMotos.map(modelo => (
                    <Option key={modelo} value={modelo}>{modelo}</Option>
                  ))}
                </Select>
              </Form.Item>
              
              <Form.Item
                label="Código"
                name="codigo"
                rules={[
                  { required: true, message: 'Por favor, insira o código!' },
                  { 
                    pattern: /^MSIM\d{3}$/,
                    message: 'O código deve seguir o padrão MSIMXXX (ex: MSIM001)!'
                  }
                ]}
              >
                <Input 
                  placeholder="Ex: MSIM001" 
                  disabled={isEdit}
                  maxLength={7}
                />
              </Form.Item>
              
              <Form.Item
                label="Status"
                name="ativo"
                valuePropName="checked"
              >
                <Switch 
                  checkedChildren="Ativo" 
                  unCheckedChildren="Inativo"
                />
              </Form.Item>
              
              <Form.Item>
                <div style={{ display: 'flex', gap: 16 }}>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    {isEdit ? 'Atualizar' : 'Cadastrar'}
                  </Button>
                  <Button onClick={() => navigate('/msim')}>
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

export default MSIMRegister;