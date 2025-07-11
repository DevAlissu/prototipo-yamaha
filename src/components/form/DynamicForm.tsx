import React from "react";
import { Form, Input, Row, Col } from "antd";
import FormField from "./FormField";
import type { FormField as FormFieldType } from "./formTypes";
import Actions from "../actions/Actions";

interface DynamicFormProps {
  fields: FormFieldType[];
  values: Record<string, any>;
  loading?: boolean;
  onChange: (name: string, value: any) => void;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  values,
  loading = false,
  onChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <Form layout="vertical" className="dynamic-form">
      <Row gutter={16}>
        {fields.map((field) => {
          // Novo: permite personalizar colSpan por campo, default 12 (metade da linha)
          const colSpan = field.colSpan ?? 12;
          return (
            <Col
              key={field.name}
              xs={24}
              sm={24}
              md={colSpan}
              lg={colSpan}
              xl={colSpan}
            >
              <FormField
                field={field}
                value={values[field.name]}
                onChange={onChange}
              />
            </Col>
          );
        })}
      </Row>
      {(onSubmit || onCancel) && (
        <div className="form-actions">
          <Actions onSubmit={onSubmit} onCancel={onCancel} loading={loading} />
        </div>
      )}
    </Form>
  );
};

export default DynamicForm;
