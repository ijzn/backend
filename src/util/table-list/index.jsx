import React, { Component } from 'react'
import { Link }   from 'react-router-dom'

export default class Error extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isFirstLoading: true
    }
  }
  componentWillReceiveProps () {
    // 列表只有在第一次挂载的时候，isFirstLoading为true，其他情况为false
    this.setState({
      isFirstLoading: false
    })
  }
  render() {
    // 表头信息
    let tableHeader = this.props.headers.map((tableHead,index) => {
      if(typeof tableHead === 'object'){
        return <th key={index} width={tableHead.width}>{tableHead.name}</th>
      }else if(typeof tableHead === 'string'){
          return <th key={index}>{tableHead}</th>
      }
    })
    // 列表信息
    let listBody = this.props.children
    // 列表的信息
    let listInfo = (
      <tr>
          <td colSpan={this.props.headers.length} className="text-center">
              {this.state.isFirstLoading ? '正在加载数据...' : '没有找到相应的结果~'}</td>
      </tr>
    )

    let tableBody = listBody.length > 0 ? listBody : listInfo;

    return (
      <div className="row">
        <div className="col-md-12">
          <table className="table table-struped table-bordered">
            <thead>
              <tr>
                {tableHeader}
              </tr>
            </thead>
            <tbody>
              {tableBody}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
