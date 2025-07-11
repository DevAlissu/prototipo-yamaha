import React, { useState } from "react";
import {
  Input,
  Select,
  Upload,
  Form,
  Button,
  InputNumber,
  Switch,
  DatePicker,
} from "antd";
import {
  UploadOutlined,
  ThunderboltOutlined,
  PoweroffOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import type { FormField } from "./formTypes";
import { RcFile } from "antd/lib/upload";
import dayjs from "dayjs";

interface FormFieldProps {
  field: FormField;
  value?: string | number | boolean | RcFile | number[] | undefined;
  onChange: (
    name: string,
    value: string | number | boolean | RcFile | number[] | null
  ) => void;
}

const FormField: React.FC<FormFieldProps> = ({ field, value, onChange }) => {
  const [error, setError] = useState<string | null>(null);

  const validateRequired = (name: string, val: any) => {
    if (field.required && (val === "" || val === null || val === undefined)) {
      setError(`${field.label} é obrigatório`);
      return false;
    }
    setError(null);
    return true;
  };

  const validateNumber = (name: string, val: any) => {
    if (!validateRequired(name, val)) {
      onChange(name, val);
      return;
    }
    if (val === "" || val === null) {
      setError(null);
      onChange(name, val);
      return;
    }
    if (isNaN(val)) {
      setError("Deve ser um número");
    } else {
      setError(null);
      onChange(name, val);
    }
  };

  const handleInputChange = (name: string, val: any) => {
    validateRequired(name, val);
    onChange(name, val);
  };

  const getIcon = () => {
    switch (field.name) {
      case "power":
        return <ThunderboltOutlined />;
      case "tension":
        return <PoweroffOutlined />;
      case "energy_consumption":
        return <BulbOutlined />;
      default:
        return null;
    }
  };

  const renderField = () => {
    switch (field.type) {
      case "input":
        return (
          <Input
            placeholder={
              field.placeholder || `Digite ${field.label.toLowerCase()}`
            }
            value={value as string}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          />
        );

      case "readonly":
        return <Input value={value as string} readOnly />;

      case "password":
        return (
          <Input.Password
            placeholder={
              field.placeholder || `Digite ${field.label.toLowerCase()}`
            }
            value={value as string}
            onChange={(e) => onChange(field.name, e.target.value)}
          />
        );

      case "number":
        return (
          <Form.Item
            validateStatus={error ? "error" : ""}
            help={error}
            style={{ marginBottom: 0 }}
          >
            <InputNumber
              placeholder={
                field.placeholder || `Digite ${field.label.toLowerCase()}`
              }
              value={value as number}
              onChange={(val) => validateNumber(field.name, val)}
              addonBefore={getIcon()}
              style={{ width: "100%" }} // ESSENCIAL, não tire!
            />
          </Form.Item>
        );

      case "textarea":
        return (
          <Input.TextArea
            placeholder={
              field.placeholder || `Digite ${field.label.toLowerCase()}`
            }
            value={value as string}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            autoSize={{ minRows: 1, maxRows: 3 }} // <-- aqui faz o mágico
          />
        );
      case "select":
        return (
          <Select
            placeholder={field.placeholder || "Selecione uma opção"}
            value={value as string | number | undefined}
            onChange={(val) => handleInputChange(field.name, val)}
            disabled={field.disabled}
            style={{ width: "100%" }} // ESSENCIAL para select
          >
            {field.options?.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        );

      case "multiselect":
        return (
          <Select
            mode="multiple"
            placeholder={field.placeholder || "Selecione opções"}
            value={value as number[] | undefined}
            onChange={(val) => handleInputChange(field.name, val)}
            disabled={field.disabled}
            style={{ width: "100%" }}
          >
            {field.options?.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        );

      case "upload":
        return (
          <Upload
            beforeUpload={(file: RcFile) => {
              onChange(field.name, file);
              return false;
            }}
            showUploadList={true}
            maxCount={1}
            accept=".png, .jpg, .jpeg"
          >
            <Button type="primary" icon={<UploadOutlined />}>
              Upload da Imagem
            </Button>
          </Upload>
        );

      case "date":
        const isDateLike =
          value === undefined ||
          value === null ||
          typeof value === "string" ||
          typeof value === "number" ||
          value instanceof Date;
        
        // Função para desabilitar datas anteriores à atual
        const disabledDate = (current: dayjs.Dayjs) => {
          // Desabilita datas anteriores ao dia atual
          return current && current.isBefore(dayjs().startOf('day'));
        };
        
        // Função para desabilitar horários anteriores ao atual (apenas para hoje)
        const disabledTime = (current: dayjs.Dayjs | null) => {
          if (!current) return {};
          
          const now = dayjs();
          const isToday = current.isSame(now, 'day');
          
          if (!isToday) {
            // Se não é hoje, permite todos os horários
            return {};
          }
          
          // Se é hoje, desabilita horários anteriores ao atual
          const currentHour = now.hour();
          const currentMinute = now.minute();
          
          return {
            disabledHours: () => {
              const hours = [];
              for (let i = 0; i < currentHour; i++) {
                hours.push(i);
              }
              return hours;
            },
            disabledMinutes: (selectedHour: number) => {
              if (selectedHour === currentHour) {
                const minutes = [];
                for (let i = 0; i <= currentMinute; i++) {
                  minutes.push(i);
                }
                return minutes;
              }
              return [];
            }
          };
        };
        
        return (
          <DatePicker
            showTime={{
              format: "HH:mm",
              defaultValue: dayjs("00:00", "HH:mm"),
            }}
            format="DD/MM/YYYY HH:mm"
            value={isDateLike ? (value ? dayjs(value) : undefined) : undefined}
            onChange={(date) => 
              handleInputChange(field.name, date ? date.toISOString() : null)
            }
            placeholder={
              field.placeholder || `Selecione ${field.label.toLowerCase()}`
            }
            minuteStep={1}
            style={{ width: "100%" }} // ESSENCIAL para manter alinhamento
            disabledDate={disabledDate}
            disabledTime={disabledTime}
          />
        );

      case "switch":
        return (
          <Switch
            checked={value as boolean}
            onChange={(val) => onChange(field.name, val)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Form.Item 
      label={field.label} 
      required={field.required}
      validateStatus={error ? "error" : undefined}
      help={error}
    >
      {renderField()}
    </Form.Item>
  );
};

export default FormField;
