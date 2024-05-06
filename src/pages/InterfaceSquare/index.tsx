import {Image, Badge, Card, List, Spin} from "antd";
import ProCard from "@ant-design/pro-card";
import Search from "antd/es/input/Search";
import {useEffect, useState} from "react";
import {
  listInterfaceInfoByPageUsingGet,
  listInterfaceInfoBySearchTextPageUsingGet
} from "@/services/api-backend/interfaceInfoController";
import {history} from "@umijs/max";


const InterfaceSquare: React.FC = () => {

  const [ searchText,setSearchText ] = useState<string>();
  const [data,setData] = useState<API.InterfaceInfo[]>([])
  const [total,setTotal] = useState<number>()
  const [loading,setLoading] = useState<boolean>(false)
  const [pageSize] = useState<number>(12)

  //加载数据
  const loadData = async (currentPage = 1) => {
    setLoading(true)
    const res = await listInterfaceInfoByPageUsingGet({
      current: currentPage,
      pageSize: pageSize,
      name: searchText,
      description: searchText,
      sortField: 'totalInvokes',
      sortOrder: 'descend'
    });
    if (res.data){
      setData(res.data?.records || [])
      setTotal(res.data?.total)
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, []);

  //搜索
  const onSearch = async () => {
    const res = await listInterfaceInfoBySearchTextPageUsingGet({
      searchText:searchText
    })
    if (res.data){
      setData(res.data?.records || [])
      setTotal(res.data?.total || 0)
    }
  }
  return (
    <>
      <Card hoverable style={{margin:'0 100px'}}>
        <ProCard layout={'center'}>
          <Search
            showCount
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value)
            }}
            maxLength={50}
            placeholder="没有找到心仪的接口？快搜索一下吧"
            allowClear
            enterButton="搜索"
            size="large"
            onSearch={onSearch}
            style={{maxWidth:600,height:60}}
          />
        </ProCard>
      </Card>

      <Spin spinning={loading}>
        <List
          style={{marginTop:'30px',marginLeft:'100px',marginRight:'100px'}}
          pagination={{
            onChange : (currentPage) =>{
              loadData(currentPage)
            },
            pageSize: pageSize,
            total:total
          }}
          grid={{
            gutter: 20,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 4,
            xl: 5,
            xxl: 6,
          }}
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <ProCard key={index} bordered hoverable direction={'column'} style={{height:270}}>
                <ProCard layout="center" onClick={() => {
                  history.push(`/interface_info/${item.id}`)
                }}>
                  <Badge count={item.totalInvokes} overflowCount={999}>
                    <Image
                      style={{width:80,borderRadius:8,marginLeft:10}}
                      src={item.avatarUrl ?? '/logo.svg'}
                      preview={false}
                      alt={item.name}
                      fallback={'./logo.svg'}
                    />
                  </Badge>
                </ProCard>
                <ProCard layout={'center'} style={{marginTop:-10,fontSize:16}} onClick={() => {
                  history.push(`/interface_info/${item.id}`)
                }}>
                  {item.name}
                </ProCard>
                <ProCard layout={'center' } style={{marginTop:-18,fontSize:14}} onClick={() => {
                  history.push(`/interface_info/${item.id}`)
                }}>
                  {!item.description ? "暂无接口描述" : item.description}
                </ProCard>
              </ProCard>
            </List.Item>
          )}
        />
      </Spin>
    </>
  )
}

export default InterfaceSquare;
