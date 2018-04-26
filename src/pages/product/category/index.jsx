import React, { Component } from 'react'
import { Link }   from 'react-router-dom';
import PageTitle  from 'components/page-title/index.jsx';
import TableList  from 'util/table-list/index.jsx';
import Product from 'api/Product.jsx'

import MUtil from 'util/mm.jsx'

const _product = new Product()
const _mm = new MUtil()

export default class CategoryList extends Component {
  constructor (props) {
    super (props)
    this.state = {
      parentCategoryId : this.props.match.params.CategoryId || 0,
      list: [],
      // firstLoad: true
    }
  }
  componentDidMount () {
    this.loadCategoryList()
  }
  componentDidUpdate(prevProps, prevState) {
    let oldPath = prevProps.location.pathname,
        newPath = this.props.location.pathname,
        newId   = this.props.match.params.CategoryId || 0;
    if(oldPath !== newPath){
      this.setState({
          parentCategoryId : newId
      }, () => {
          this.loadCategoryList();
      });
    }
  }
  // 加载品类列表
  loadCategoryList () {
    _product.getCategoryList(this.state.parentCategoryId)
     .then(res => {
       this.setState({
         list: res
       })
     })
     .catch(err => {
       this.setState({
         list: []
       })        
       _mm.errorTips(err)
     })
  }
  // 修改名称
  onUpdateName (id, name) {
    let newName = window.prompt('请输入新的品类名称', name)

    if (newName) {
      _product.updateCategoryName({
        categoryId: id,
        categoryName : newName
      })
      .then((res) => {
        _mm.successTips(res);
        this.loadCategoryList();
      }, errMsg => {
        _mm.errorTips(errMsg);
    })

    } else {
      
    }
  }
  render() {
    let listBody = this.state.list.map((item,index) => {
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>
            <a className="opear" 
             onClick={(e) => {this.onUpdateName(item.id, item.name)}}>修改名称</a>
             {
               this.state.parentCategoryId === 0
               ? <Link to={`/product-category/index/${item.id}`}>查看子品类</Link>
               : null
             }
          </td>
        </tr>
      )
    })
    let listErr = (
        <tr>
          <td colSpan="5" className="text-center">
            {this.state.firstLoad ? '正在加载数据....' : '没有找到相应结果～'}
          </td>
        </tr>
      )
    
    let tbody = this.state.list.length > 0 ? listBody : listErr
    return (
      <div id='page-wrapper'>
        <PageTitle title="品类管理">
          <div className="page-header-right">
            <Link to="/product-category/add" className="btn btn-primary">
              <i className="fa fa-plus"></i>
              <span>添加品类</span>
            </Link>
          </div>
        </PageTitle>
        <div className="row">
          <div className="col-md-12">
            <p>父品类ID: {this.state.parentCategoryId}</p>
          </div>
        </div>
        <TableList headers={['品类ID', '品类名称', '操作']}>
          {tbody}
        </TableList>
      </div>
    )
  }
}
