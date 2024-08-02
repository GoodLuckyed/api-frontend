import {ProColumns} from "@ant-design/pro-components";
import {Link} from "@@/exports";


export const OrderColumns: ProColumns<API.OrderInfo>[] = [
  {
    title: 'id',
    valueType: 'index',
    dataIndex: 'id',
    hideInTable: true,
    align: "center",
    key: "id"
  },
  {
    title: '订单标题',
    dataIndex: 'title',
    align: "center",
    key: "title",
    ellipsis: true,
    copyable: true,
    width: 120,
    render: (_, record) => (
      <Link key={record.id} to={`/order/info/${record.id}`}>
        {record.title}
      </Link>
    ),
  },
  {
    title: '订单号',
    align: "center",
    dataIndex: 'orderNo',
    key: 'orderNo',
    ellipsis: true,
    copyable: true,
  },
  {
    title: '订单状态',
    dataIndex: 'status',
    key: 'status',
    filters: true,
    width: "sm",
    align: "center",
    onFilter: true,
    valueEnum: {
      "未支付": {
        text: "未支付",
        status: "Error"
      },
      "支付成功": {
        text: "支付成功",
        status: "Success"
      },
      "用户已取消": {
        text: "用户已取消",
        status: 'Default'
      },
    }
  },
  // {
  //   title: '订单类型',
  //   dataIndex: 'productType',
  //   key: 'productType',
  //   width: "sm",
  //   filters: true,
  //   align: "center",
  //   onFilter: true,
  //   valueEnum: {
  //     VIP: {
  //       text: 'VIP会员',
  //     },
  //     RECHARGE: {
  //       text: '积分充值',
  //     },
  //     RECHARGEACTIVITY: {
  //       text: "充值活动"
  //     }
  //   }
  // },
  {
    title: '支付类型',
    dataIndex: 'paymentType',
    key: 'paymentType',
    filters: true,
    width: "sm",
    align: "center",
    onFilter: true,
    valueEnum: {
      "WX": {text: "微信"},
      "ALIPAY": {text: "支付宝"}
    },
  },
  {
    title: '订单金额（单位：分）',
    dataIndex: 'total',
    key: 'total',
    width: "sm",
    align: "center",
    valueType: "money",
    // @ts-ignore
    sorter: (a, b) => a.total - b.total,
  },
  {
    title: '增加积分数',
    dataIndex: 'addPoints',
    width: "sm",
    key: 'addPoints',
    align: "center",
    // @ts-ignore
    sorter: (a, b) => a.addPoints - b.addPoints,
  }, {
    title: '过期时间',
    dataIndex: 'expirationTime',
    key: 'expirationTime',
    valueType: "dateTime",
    align: "center",
    hideInSearch: true
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: "center",
    key: 'createTime',
    valueType: "dateTime",
    hideInSearch: true
  },
]
