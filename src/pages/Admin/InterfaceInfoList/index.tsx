import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import {
  addInterfaceInfoUsingPost,
  delInterfaceInfoUsingPost,
  listInterfaceInfoByPageUsingGet,
  offlineInterfaceInfoUsingPost,
  onlineInterfaceInfoUsingPost,
  updateInterInfoUsingPost,
  uploadAvatarUrlUsingPost,
} from '@/services/api-backend/interfaceInfoController';
import InterfaceInfoColumns, {
  InterfaceInfoModalFormColumns,
} from '@/pages/Admin/Columns/InterfaceInfoColumns';
import ModalForm from '@/pages/Admin/Components/ModalForm';
import UploadModal from '@/components/UploadModal';

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
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfo>();
  const [loading, setLoading] = useState<boolean>(false);
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
      if (res.code === 0 && res.data) {
        hide();
        message.success('添加成功');
      }
      return true;
    } catch (error: any) {
      hide();
      message.error('添加失败', error.message);
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.InterfaceInfoUpdateRequest) => {
    const hide = message.loading('修改中');
    try {
      if (fields) {
        if (fields.requestParams) {
          if (typeof fields.requestParams === 'string') {
            const parseValue = JSON.parse(fields.requestParams);
            fields.requestParams = [...parseValue];
          }
        } else {
          fields.requestParams = [];
        }
        if (fields.responseParams) {
          if (typeof fields.responseParams === 'string') {
            const parseValue = JSON.parse(fields.responseParams);
            fields.responseParams = [...parseValue];
          }
        } else {
          fields.responseParams = [];
        }
      }
      const res = await updateInterInfoUsingPost({
        id: currentRow?.id,
        ...fields,
      });
      if (res.code === 0 && res.data) {
        hide();
        message.success('修改成功');
      }
      return true;
    } catch (error: any) {
      hide();
      message.error('修改失败', error.message);
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
        id: record.id,
      });
      if (res.data) {
        hide();
        message.success('删除成功');
        actionRef.current?.reload();
      }
      return true;
    } catch (error: any) {
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
        id: record.id,
      });
      hide();
      if (res.data) {
        message.success('发布成功');
        actionRef.current?.reload();
      }
      return true;
    } catch (error: any) {
      hide();
      message.error(error.message);
      return false;
    }
  };

  /**
   * 下线接口
   * @param record
   */
  const handleOffline = async (record: API.IdRequest) => {
    const hide = message.loading('下线中');
    if (!record) return true;
    try {
      const res = await offlineInterfaceInfoUsingPost({
        id: record.id,
      });
      hide();
      if (res.data) {
        message.success('下线成功');
        actionRef.current?.reload();
      }
      return true;
    } catch (error: any) {
      hide();
      message.error(error.message);
      return false;
    }
  };

  /**
   * 上传接口图片
   * @param url
   */
  const handleUpdateAvatar = async (url: any) => {
    const hide = message.loading('上传中');
    if (!url) return true;
    try {
      const res = await uploadAvatarUrlUsingPost({
        id: currentRow?.id,
        avatarUrl: url,
      });
      hide();
      if (res.data && res.code === 0) {
        message.success('上传成功');
        actionRef.current?.reload();
        setModalOpen(false);
      }
      return true;
    } catch (error: any) {
      hide();
      message.error('上传失败', error.message);
      return false;
    }
  };

  // 确认删除
  const onConfirm = async () => {
    await handleRemove(currentRow as API.InterfaceInfo);
  };

  // 取消删除
  const onCancel = () => {
    message.warning('已取消删除');
  };

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
            setModalOpen(true);
          }}
        >
          上传图片
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
          const success = await handleAdd(value as API.InterfaceInfoAddRequest);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalOpen(false)}
        columns={InterfaceInfoModalFormColumns}
      ></ModalForm>
      <ModalForm
        title={'修改接口'}
        width={'840px'}
        value={currentRow}
        open={() => {
          return updateModalOpen;
        }}
        onOpenChange={handleUpdateModalOpen}
        onSubmit={async (value) => {
          const success = await handleUpdate(value as API.InterfaceInfoUpdateRequest);
          if (success) {
            handleUpdateModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleUpdateModalOpen(false)}
        columns={InterfaceInfoModalFormColumns}
      ></ModalForm>
      <UploadModal
        title={'上传接口图片'}
        open={modalOpen}
        url={currentRow?.avatarUrl}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleUpdateAvatar}
      ></UploadModal>
    </PageContainer>
  );
};
export default InterfaceInfoList;
