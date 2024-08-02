import React, {useRef, useState} from "react";
import {ActionType, PageContainer, ProColumns, ProTable} from "@ant-design/pro-components";
import {
  cancelOrderUsingPost,
  deleteOrderUsingPost,
  listOrderByPageUsingPost
} from "@/services/api-backend/orderController";
import {OrderColumns} from "@/pages/Order/Columns/OrderColumns";
import {message, Popconfirm} from "antd";
import {tradePayUsingPost} from "@/services/api-backend/aliPayController";


const OrderList: React.FC = () => {

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.OrderInfo>();
  const [loading, setLoading] = useState<boolean>(false);


  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param record
   */
  const handleRemove = async (record: API.OrderInfo) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      const res = await deleteOrderUsingPost({
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

  const handleClosed = async (record: API.OrderInfo) => {
    const hide = message.loading('正在取消订单');
    if (!record) return true;
    try {
      const res = await cancelOrderUsingPost({
        orderNo: record.orderNo,
      });
      if (res.data) {
        hide();
        message.success('取消订单成功');
        actionRef.current?.reload();
        return true;
      }
    } catch (error: any) {
      hide();
      message.error('取消订单失败', error.message);
      return false;
    }
  };

  const toPay = async (record: API.OrderInfo) => {
    setLoading(true)
    const res = await tradePayUsingPost(
      {productId: record.productId, paymentType: 'ALIPAY'}
    )
    if (res.code === 0 && res.data){
      message.loading('正在前往收银台,请稍后....')
      setTimeout(() => {
        document.write(res.data as string)
      },2000)
    }else {
      setLoading(false)
      message.error(res.message)
    }
  }

  const closedConfirm = async () => {
    await handleClosed(currentRow as API.OrderInfo)
  }

  // 确认删除
  const onConfirm = async () => {
    await handleRemove(currentRow as API.OrderInfo);
  };

  // 取消删除
  const onCancel = () => {
    message.warning('已取消删除');
  };

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.OrderInfo>[] = [
    ...OrderColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="SUCCESS"
          onClick={() => {
            location.href = `/order/info/${record.id}`;
          }}
        >
          查看
        </a>,
        record.status !== '未支付' && (
          <Popconfirm
            key={'delete'}
            title={'请确认是否删除该订单'}
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
          </Popconfirm>
        ),
        record.status === "未支付" && (
          <>
            <a
              key="Pay"
              onClick={() => {
                toPay(record)
              }
              }
            >
              付款
            </a>
            <Popconfirm
              key={'Closed'}
              title="请确认是否取消该订单!"
              onConfirm={closedConfirm}
              onCancel={onCancel}
              okText="是"
              cancelText="否"
            >
              <a
                key="Closed"
                style={{color: "rgba(150,151,153,0.76)"}}
                onClick={async () => {
                  setCurrentRow(record);
                }}
              >
                取消
              </a>
            </Popconfirm>
          </>
        ),
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.OrderInfo>
        actionRef={actionRef}
        rowKey="order"
        loading={loading}
        search={{
          labelWidth: 120,
        }}
        request={async (params) => {
          setLoading(true);
          const res = await listOrderByPageUsingPost({
            ...params,
            sortField: 'createTime',
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
    </PageContainer>
  );
};


export default OrderList;
