import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, Drawer, Input, message, Popconfirm} from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from '../UpdateForm';
import UpdateForm from '../UpdateForm';
import {
  addInterfaceInfoUsingPost,
  delInterfaceInfoUsingPost,
  listInterfaceInfoByPageUsingGet, offlineInterfaceInfoUsingPost,
  onlineInterfaceInfoUsingPost
} from "@/services/api-backend/interfaceInfoController";
import InterfaceInfoColumns, {InterfaceInfoModalFormColumns} from "@/pages/Admin/Columns/InterfaceInfoColumns";
import ModalForm from "@/pages/Admin/Components/ModalForm";

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

const InterfaceInfoList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.InterfaceInfoAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      const res = await addInterfaceInfoUsingPost({
        ...fields,
      });
      if (res.code === 0 && res.data){
        hide();
        message.success('添加成功');
      }
      return true;
    } catch (error:any) {
      hide();
      message.error('添加失败',error.message);
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = async (record: API.InterfaceInfo) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      const res = await delInterfaceInfoUsingPost({
        id: record.id
      })
      if (res.data){
        hide();
        message.success('删除成功');
        actionRef.current?.reload();
      }
      return true;
    } catch (error:any) {
      hide();
      message.error('删除失败', error.message);
      return false;
    }
  };

  /**
   * 发布接口
   * @param record
   */
  const handleOnline = async (record: API.IdRequest) => {
    const hide = message.loading('发布中');
    if (!record) return true;
    try {
      const res = await onlineInterfaceInfoUsingPost({
        id: record.id
      })
      hide();
      if (res.data) {
        message.success('发布成功');
        actionRef.current?.reload();
      }
      return true;
    } catch (error:any) {
      hide();
      message.error(error.message)
      return false;
    }
  }

  /**
   * 下线接口
   * @param record
   */
  const handleOffline = async (record:API.IdRequest) => {
    const hide = message.loading('下线中');
    if (!record) return true;
    try {
      const res = await offlineInterfaceInfoUsingPost({
        id: record.id
      })
      hide();
      if (res.data) {
        message.success('下线成功');
        actionRef.current?.reload();
      }
      return true;
    } catch (error:any) {
      hide();
      message.error(error.message)
      return false;
    }
  }

  // 确认删除
  const onConfirm = async () => {
    await handleRemove(currentRow as API.InterfaceInfo)
  }

  // 取消删除
  const onCancel = () => {
    message.warning('已取消删除')
  }

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.InterfaceInfo>[] = [
    ...InterfaceInfoColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="update"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,
        record.status === 2 ? (
          <a
            key="auditing"
            type={'text'}
            onClick={() => {
              handleOnline(record);
            }}
          >
            审核通过
          </a>
        ) : null,
        record.status === 0 ? (
          <a
            key="online"
            type={'text'}
            onClick={() => {
              handleOnline(record);
            }}
          >
            上线
          </a>
        ) : null,
        record.status === 1 ? (
          <a
            key="offline"
            type={'text'}
            style={{ color: 'red' }}
            onClick={() => {
              handleOffline(record);
            }}
          >
            下线
          </a>
        ) : null,
        <Popconfirm
          key={'delete'}
          title={'请确认是否删除该接口!'}
          okText="是"
          cancelText="否"
          onConfirm={onConfirm}
          onCancel={onCancel}
        >
          <a
            key="remove"
            style={{ color: 'red' }}
            onClick={async () => {
              setCurrentRow(record);
            }}
          >
            删除
          </a>
        </Popconfirm>,
        <a
          key="upload"
          onClick={async () => {
            setCurrentRow(record);
            setModalOpen(true)
          }}
        >
          更新图片
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.InterfaceInfo>
        headerTitle={'接口管理'}
        actionRef={actionRef}
        rowKey="key"
        loading={loading}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params) => {
          const res = await listInterfaceInfoByPageUsingGet({
            ...params,
          });
          if (res?.data) {
            return {
              data: res?.data.records || [],
              success: true,
              total: res.data.total,
            };
          } else {
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        columns={columns}
      />
      <ModalForm
        title={'添加接口'}
        width={'840px'}
        value={{}}
        open={() => {
          return createModalOpen;
        }}
        onOpenChange={handleModalOpen}
        onSubmit={async (value) => {
          const success = await handleAdd(value as API.InterfaceInfo);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalOpen(false)}
        columns={InterfaceInfoModalFormColumns}
      >
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};
export default InterfaceInfoList;
