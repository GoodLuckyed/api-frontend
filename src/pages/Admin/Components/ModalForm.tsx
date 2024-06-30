import React, {useEffect, useRef} from "react";
import { BetaSchemaForm } from '@ant-design/pro-components';
import {ProFormInstance} from "@ant-design/pro-form/lib";
import {Button} from "antd";

export type Props = {
  title: string;
  open: () => boolean;
  width: string;
  value: API.InterfaceInfo
  onCancel: () => void;
  columns: any[];
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalForm: React.FC<Props> = (props) => {

  const { title, open, width, value, columns, onSubmit, onOpenChange } = props;
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    // 如果是添加接口，id不存在，可以清空表单
    const isAdd = value?.id;
    if (!isAdd){
      formRef.current?.resetFields();
    }
    if (formRef && isAdd){
      formRef.current?.setFieldsValue(value);
    }
  }, [value]);

  return (
    <>
      <BetaSchemaForm<API.InterfaceInfo>
        title={title}
        open={open()}
        width={width}
        formRef={formRef}
        layoutType={'ModalForm'}
        autoFocusFirstInput
        rowProps={{
          gutter: [16, 16],
        }}
        colProps={{
          span: 12,
        }}
        grid={true}
        onFinish={async (value) => {
          onSubmit?.(value)
        }}
        onOpenChange={onOpenChange}
        columns={columns}
        submitter={{
          render: (props, defaultDoms) => {
            return [
              ...defaultDoms,
              <Button
                danger
                key="rest"
                onClick={() => {
                  formRef.current?.resetFields();
                }}
              >
                重置
              </Button>,
            ];
          },
        }}
      />
    </>
  )

}

export default ModalForm;
