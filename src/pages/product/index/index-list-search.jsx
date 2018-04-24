import React, { Component } from 'react'

export default class ListSearch extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchType      : 'productId', //productId / productName
      searchKeyword   : ''
    }
  }
  // 点击搜索按钮的时候
  onSearch (e) {
    this.props.onSearch(this.state.searchType, this.state.searchKeyword)
  }
  // 数据变化的时候
  onValueChange (e) {
    // console.log(e.target)
    let name  = e.target.name,
        value = e.target.value
    this.setState({
      [name]: value
    })
  }
  // 输入关键字后按回车，自动提交
  onSearchKeywordKeyUp(e){
    if(e.keyCode === 13){
        this.onSearch();
    }
  }
  render() {
    return (
      <div className="row search-wrap">
        <div className="col-md-12">
          <div className="form-inline">
              <div className="form-group">
                  <select className="form-control"
                      name="searchType"
                      onChange={(e) => {this.onValueChange(e)}}>
                      <option value="productId">按商品ID查询</option>
                      <option value="productName">按商品名称查询</option>
                  </select>
              </div>
              <div className="form-group">
                  <input type="text" 
                      className="form-control" 
                      placeholder="关键词"
                      name="searchKeyword"
                      onKeyUp={e => this.onSearchKeywordKeyUp(e)}
                      onChange={(e) => {this.onValueChange(e)}}/>
              </div>
              <button className="btn btn-primary" 
              onClick={e => this.onSearch(e)}>搜索</button>
          </div>
        </div>
      </div>
    )
  }
}
