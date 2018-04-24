import React, { Component } from 'react'
import { Link }   from 'react-router-dom';
import PageTitle  from 'components/page-title/index.jsx';
import Pagination  from 'util/Pagination/index.jsx';
import User from 'api/user.jsx'
import MUtil from 'util/mm.jsx'

const _user = new User()
const _mm = new MUtil()

export default class UserList extends Component {
  constructor (props) {
    super (props)
    this.state = {
      pageNum : 1,
      list: [],
      firstLoad: true
    }
  }
  componentDidMount () {
    this.loadUserList()
  }
  loadUserList () {
     _user.getUserList(this.state.pageNum)
     .then(res => {
       this.setState(res, () => {
        this.setState({
          firstLoad: false
        })
       })
     })
     .catch(err => {
       this.setState({
         list: []
       })        
       _mm.errorTips(err)
     })
  }
  onPageNumChange (pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadUserList()
    })
  }
  render() {
    let listBody = this.state.list.map((item,index) => {
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.username}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
          <td>{new Date(item.createTime).toLocaleString()}</td>
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
        <PageTitle title="用户列表"/>
        <div className="row">
          <div className="col-md-12">
            <table className="table table-struped table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>用户名</th>
                  <th>邮箱</th>
                  <th>电话</th>
                  <th>注册时间</th>
                </tr>
              </thead>
              <tbody>
                {tbody}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination 
          current={this.state.pageNum} 
          total={this.state.total} 
          onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
      </div>
    )
  }
}
