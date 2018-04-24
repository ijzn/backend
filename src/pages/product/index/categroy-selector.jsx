import React, { Component } from 'react'
import MUtil                from 'util/mm.jsx'
import Product              from 'api/Product.jsx'

import './categroySelector.scss'

const _mm           = new MUtil();
const _product      = new Product();

export default class categroySelector extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstList   : [],
      firstId     : 0,
      secoundList : [],
      secoundId   : 0
    }
  }
  componentDidMount () {
    this.loadFirstList()
  }
  componentWillReceiveProps(nextProps) {
    let categoryIdChange        = this.props.categoryId !== nextProps.categoryId,
        parentCategoryIdChange  = this.props.parentCategoryId !== nextProps.parentCategoryId;
    // 数据没有发生变化的时候，直接不做处理
    if(!categoryIdChange && !parentCategoryIdChange){
        return;
    }
    // 假如只有一级品类
    if(nextProps.parentCategoryId === 0){
        this.setState({
            firstId     : nextProps.categoryId,
            secoundId    : 0
        });
    }
    // 有两级品类
    else{
        this.setState({
          firstId     : nextProps.parentCategoryId,
          secoundId    : nextProps.categoryId
        }, () => {
            parentCategoryIdChange && this.loadSecoundList();
        });
    }
  }
  
  // 加载一级分类
  loadFirstList () {
    _product.getCategoryList()
    .then(res => {
      this.setState({
        firstList: res
      })
    })
    .catch(err => {
      _mm.errorTips(err)
    })
  }
  // 加载二级分类
  loadSecoundList () {
    _product.getCategoryList(this.state.firstId)
    .then(res => {
      this.setState({
        secoundList: res
      })
    })
    .catch(err => {
      _mm.errorTips(err)
    })
  }
  // 选择一级品类
  onfirstChange (e) {
    if (this.props.readOnly) {
      return ;
    }
    let newVal = e.target.value || 0
    this.setState({
      firstId: newVal,
      secoundList : [],
      secoundId   : 0
    }, () => {
      this.loadSecoundList()
      this.onPropsId()
    })
  }
  // 选择二级品类  
  onSecoundChange (e) {
    if (this.props.readOnly) {
      return ;
    }
    let newVal = e.target.value || 0
    this.setState({
      secoundId: newVal
    }, () => {
      this.onPropsId()
    })
  }
  // 向父组件传递选中结果
  onPropsId () {
    // 判断props里的回调函数是否存在
    let onChangeId = typeof this.props.onIdChange === 'function'
    // 如果有二级品类
    if (this.state.secoundId) {
      onChangeId && this.props.onIdChange(this.state.secoundId, this.state.firstId)
    }
    // 如果只有一级品类
    else {
      onChangeId && this.props.onIdChange(this.state.firstId, 0)
    }
  }
  render() {
    return (
      <div className="col-md-5">
        <select className="form-control cate-select"
          value={this.state.firstId}
          readOnly={this.props.readOnly}
          onChange={e => this.onfirstChange(e)}>
          <option value="">请输入一级分类</option>
          {
            this.state.firstList.map((item, index) => {
              return( <option key={index} value={item.id}>{item.name}</option> )
            })
          }
        </select>
        {this.state.secoundList.length ? (
          <select className="form-control cate-select"
            value={this.state.secoundId}
            readOnly={this.props.readOnly}                     
            onChange={e => this.onSecoundChange(e)}>
            <option value="">请输入二级分类</option>
            {
              this.state.secoundList.map((item, index) => {
                return( <option key={index} value={item.id}>{item.name}</option> )
              })
            }
          </select> ) : null 
        }
      </div>
    )
  }
}
