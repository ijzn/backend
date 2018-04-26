import React, { Component } from 'react'
import { Link }   from 'react-router-dom';
import PageTitle  from 'components/page-title/index.jsx';
import Pagination  from 'util/Pagination/index.jsx';
import TableList from 'util/table-list/index.jsx'
import ListSearch from './index-list-search.jsx'
import Order from 'api/order.jsx'
import MUtil from 'util/mm.jsx'


const _order = new Order()
const _mm    = new MUtil()

export default class OrderList extends Component {
  constructor (props) {
    super (props)
    this.state = {
      pageNum : 1,
      list: [],
      listType: 'list'   // list / seach
    }
  }
  componentDidMount () {
    this.loadOrderList()
  }
  // 加载 商品列表
  loadOrderList () {
    let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum  = this.state.pageNum;
    // 如果是搜索的话，需要传入搜索类型和搜索关键字
    if(this.state.listType === 'search'){
      listParam.orderNo = this.state.orderNumber;
    }
    // 请求接口
    _order.getOrderList(listParam).then(res => {
      this.setState(res);
    }, errMsg => {
        this.setState({
            list : []
        });
        _mm.errorTips(errMsg);
    })
  }
  // 
  onPageNumChange (pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadOrderList()
    })
  }
  // 搜索 
  onSearcher (orderNumber) {
    let listType = orderNumber === '' ? 'list' : 'search';
    this.setState({
      listType        : listType,
      pageNum         : 1,
      orderNumber     : orderNumber
    }, () => {
      this.loadOrderList();
    });
  }
  render() {
    let tableHeads = ['订单号','收件人', '订单状态', '订单总价', '创建时间', '操作'];
    return (
      <div id='page-wrapper'>
        <PageTitle title="订单管理" />
        <ListSearch
        onSearch={(orderNumber) => {this.onSearcher(orderNumber)}}/>
        <TableList headers={tableHeads}>
          {
            this.state.list.map((order, index) => {
              return (
                <tr key={index}>
                  <td>
                      <Link to={ `/order/detail/${order.orderNo}` }>{order.orderNo}</Link>
                  </td>
                  <td>{order.receiverName}</td>
                  <td>{order.statusDesc}</td>
                  <td>￥{order.payment}</td>
                  <td>{order.createTime}</td>
                  <td>
                      <Link to={ `/order/detail/${order.orderNo}` }>详情</Link>
                  </td>
                </tr>
              );
            })
          }
        </TableList>
        <Pagination 
          current={this.state.pageNum} 
          total={this.state.total} 
          onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
      </div>
    )
  }
}
 