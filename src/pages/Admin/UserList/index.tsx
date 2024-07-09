import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import ModalForm from '@/pages/Admin/Components/ModalForm';
import {
  addUserUsingPost,
  banUserUsingPost,
  deleteUserUsingPost,
  listUserByPageUsingGet,
  normalUserUsingPost,
  updateUserUsingPost,
} from '@/services/api-backend/userController';
import {
  UserAddModalFormColumns,
  UserColumns,
  UserUpdateModalFormColumns,
} from '@/pages/Admin/Columns/UserColumns';

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

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.UserAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      const res = await addUserUsingPost({
        ...fields,
      });
      if (res.code === 0 && res.data) {
        hide();
        message.success('添加成功');
        return true;
      }
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
  const handleUpdate = async (fields: API.UserUpdateRequest) => {
    const hide = message.loading('修改中');
    console.log("fields",fields)
    try {
      const res = await updateUserUsingPost({
        id: currentRow?.id,
        ...fields,
      });
      if (res.code === 0 && res.data) {
        hide();
        message.success('修改成功');
        return true;
      }
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
   * @param record
   */
  const handleRemove = async (record: API.UserVo) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      const res = await deleteUserUsingPost({
        id: record.id,
      });
      if (res.data) {
        hide();
        message.success('删除成功');
        actionRef.current?.reload();
        return true;
      }
    } catch (error: any) {
      hide();
      message.error('删除失败', error.message);
      return false;
    }
  };

  /**
   * 解封
   * @param record
   */
  const handleNormalUser = async (record: API.IdRequest) => {
    const hide = message.loading('解封中');
    if (!record) return true;
    try {
      const res = await normalUserUsingPost({
        id: record.id,
      });
      hide();
      if (res.data) {
        message.success('解封成功');
        actionRef.current?.reload();
        return true;
      }
    } catch (error: any) {
      hide();
      message.error(error.message);
      return false;
    }
  };

  /**
   * 封号
   * @param record
   */
  const handBanUser = async (record: API.IdRequest) => {
    const hide = message.loading('封号中');
    if (!record) return true;
    try {
      const res = await banUserUsingPost({
        id: record.id,
      });
      hide();
      if (res.data) {
        message.success('封号成功');
        actionRef.current?.reload();
        return true;
      }
    } catch (error: any) {
      hide();
      message.error(error.message);
      return false;
    }
  };

  // 确认删除
  const onConfirm = async () => {
    await handleRemove(currentRow as API.UserVo);
  };

  // 取消删除
  const onCancel = () => {
    message.warning('已取消删除');
  };

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.UserVo>[] = [
    ...UserColumns,
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
        record.status === 1 ? (
          <a
            key="normal"
            type={'text'}
            onClick={() => {
              handleNormalUser(record);
            }}
          >
            解封
          </a>
        ) : null,
        record.status === 0 ? (
          <a
            key="ban"
            type={'text'}
            style={{ color: 'red' }}
            onClick={() => {
              handBanUser(record);
            }}
          >
            封号
          </a>
        ) : null,
        <Popconfirm
          key={'delete'}
          title={'请确认是否删除该用户!'}
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
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.UserVo>
        headerTitle={'用户管理'}
        actionRef={actionRef}
        rowKey="user"
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
          setLoading(true);
          const res = await listUserByPageUsingGet({
            ...params,
            sortField: 'updateTime',
            sortOrder: 'descend',
          });
          if (res?.data) {
            setLoading(false);
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
        title={'添加用户'}
        width={'840px'}
        value={{}}
        open={() => {
          return createModalOpen;
        }}
        onOpenChange={handleModalOpen}
        onSubmit={async (value) => {
          const success = await handleAdd(value as API.UserAddRequest);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalOpen(false)}
        columns={UserAddModalFormColumns}
      ></ModalForm>
      <ModalForm
        title={'修改用户信息'}
        width={'840px'}
        value={currentRow}
        open={() => {
          return updateModalOpen;
        }}
        onOpenChange={handleUpdateModalOpen}
        onSubmit={async (value) => {
          const success = await handleUpdate(value as API.UserUpdateRequest);
          if (success) {
            handleUpdateModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleUpdateModalOpen(false)}
        columns={UserUpdateModalFormColumns}
      ></ModalForm>
    </PageContainer>
  );
};
export default InterfaceInfoList;
