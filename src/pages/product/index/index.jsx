import React, { Component } from 'react'
import { Link }   from 'react-router-dom';
import PageTitle  from 'components/page-title/index.jsx';
import Pagination  from 'util/Pagination/index.jsx';
import TableList from 'util/table-list/index.jsx'
import ListSearch from './index-list-search.jsx'
import Product from 'api/Product.jsx'
import MUtil from 'util/mm.jsx'

import './index.scss'

const _product = new Product()
const _mm = new MUtil()

export default class ProductList extends Component {
  constructor (props) {
    super (props)
    this.state = {
      pageNum : 1,
      list: [],
      firstLoad: true,
      listType: 'list'
    }
  }
  componentDidMount () {
    this.loadProductList()
  }
  // 加载 商品列表
  loadProductList () {
    let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum  = this.state.pageNum;
    // 如果是搜索的话，需要传入搜索类型和搜索关键字
    if(this.state.listType === 'search'){
      listParam.searchType = this.state.searchType;
      listParam.keyword    = this.state.searchKeyword;
    }
    // 请求接口
    _product.getProductList(listParam).then(res => {
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
      this.loadProductList()
    })
  }
  // 修改上下架状态
  onChangeProductStatus (e, productId, curreyStatus) {
    let newStatus   = curreyStatus == 1 ? 2 : 1,
        confirmTips = curreyStatus == 1 ? '确定要下架该商品？' : '确定要上架该商品？'
    if (window.confirm(confirmTips)) {
      _product.setProductStatus({
        productId: productId,
        status: newStatus
      })
      .then(res =>{
        _mm.successTips(res)
        this.loadProductList();
      })
      .catch(err => {
        _mm.errorTips(err)
      })
    }
  }
  // 搜索 
  onSearcher (searchType, searchKeyword) {
    let listType = searchKeyword === '' ? 'list' : 'search';
    this.setState({
        listType        : listType,
        pageNum         : 1,
        searchType      : searchType,
        searchKeyword   : searchKeyword
    }, () => {
        this.loadProductList();
    });
  }
  render() {
    let tableHeads = [
      {name: '商品ID', width: '10%'},
      {name: '商品信息', width: '50%'},
      {name: '价格', width: '10%'},
      {name: '状态', width: '15%'},
      {name: '操作', width: '15%'},
    ];
    return (
      <div id='page-wrapper'>
        <PageTitle title="商品列表">
          <div className="page-header-right">
            <Link to="/product/save" className="btn btn-primary">
              <i className="fa fa-plus"></i>
              <span>添加商品</span>
            </Link>
          </div>
        </PageTitle>
        <ListSearch
        onSearch={(searchType, searchKeyword) => {this.onSearcher(searchType, searchKeyword)}}/>
        <TableList headers={tableHeads}>
          {
            this.state.list.map((product, index) => {
              return (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>
                    <p>{product.name}</p>
                    <p>{product.subtitle}</p>
                  </td>
                  <td>¥{product.price}</td>
                  <td>
                    <p>{product.status == 1 ? '在售' : '已下架'}</p>
                    <button className="btn btn-xs btn-warning" onClick={e => {this.onChangeProductStatus(e, product.id, product.status)}}>{product.status == 1 ? '下架' : '上架'}</button>
                  </td>
                  <td>
                    <Link className="opear" to={`/product/detail/${product.id}`}>详情</Link>
                    <Link className="opear" to={`/product/save/${product.id}`}>修改</Link>
                  </td>
                </tr>
              )
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
 