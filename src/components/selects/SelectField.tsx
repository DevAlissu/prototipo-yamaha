// src/components/selects/SelectField.tsx
import React, { useEffect, useState } from "react";
import { Select, Button, Spin } from "antd";

interface SelectFieldProps {
  name: string;
  label: string;
  value?: number;
  onChange: (name: string, value: number) => void;
  options?: { value: number; label: string }[];
  fetchOptions?: () => Promise<{ value: number; label: string }[]>;
  placeholder?: string;
  onCreateNew?: () => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  value,
  onChange,
  options = [],
  fetchOptions,
  placeholder,
  onCreateNew,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectOptions, setSelectOptions] =
    useState<{ value: number; label: string }[]>(options);

  useEffect(() => {
    if (fetchOptions) {
      setLoading(true);
      fetchOptions()
        .then((data) =>
          setSelectOptions(
            data.map((option) => ({
              value: Number(option.value), // 🔹 Garante que `value` seja sempre um número
              label: option.label,
            }))
          )
        )
        .catch((error) =>
          console.error(`Erro ao buscar opções para ${name}:`, error)
        )
        .finally(() => setLoading(false));
    }
  }, [fetchOptions]);

  return (
    <div>
      <label
        style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}
      >
        {label}
      </label>
      {loading ? (
        <Spin />
      ) : (
        <Select
          style={{ width: "100%" }}
          value={value}
          onChange={(val) => onChange(name, Number(val))} // 🔹 Converte o valor para número ao selecionar
          placeholder={placeholder || "Selecione uma opção"}
          options={selectOptions}
          allowClear
        />
      )}
      {onCreateNew && (
        <Button
          type="dashed"
          style={{ marginTop: "10px" }}
          onClick={onCreateNew}
        >
          Cadastrar {label}
        </Button>
      )}
    </div>
  );
};

export default SelectField;
