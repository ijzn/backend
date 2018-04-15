import React, { Component } from 'react'
import user from 'api/user.jsx';
import MUtil from 'util/mm.jsx'
import './index.scss'

const _mm = new MUtil()
const _user = new user()

export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      redirect: _mm.getUrlParam('redirect') || '/'
    }
  }
  componentWillMount () {
    document.title = '登陆'
  }
  // 当用户名发生改变
  onInputChange (e) {
    let InputKey = e.target.name
    let InputVal = e.target.value
    this.setState({
      [InputKey]: InputVal
    })
  }
  onInputKeyUp (e) {
    if (e.keyCode === 13) {
      this.onLogin()            
    }
  }
  // 登陆
  onLogin (e) {
    let loginInfo = {
      username : this.state.username,
      password : this.state.password
      },
      checkResult = _user.checkLoginInfo(loginInfo);
    // 验证通过
    if(checkResult.status){
      _user.login(loginInfo).then((res) => {
        //  console.log('登陆成功', res,this.state.redirect)
          _mm.setStorage('userInfo', res);
          this.props.history.push(this.state.redirect);
      }, (errMsg) => {
          _mm.errorTips(errMsg);
      });
    }
    // 验证不通过
    else{
      _mm.errorTips(checkResult.msg);
    }
  }
  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default login-panel">
          <div className="panel-heading">欢迎登录 -- 某某管理系统</div>
          <div className="panel-body">
            <div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">用户名</label>
                <input 
                  type="email"
                  name="username"
                  className="form-control" 
                  id="exampleInputEmail1" 
                  placeholder="请输入用户名"
                  onKeyUp={e => this.onInputKeyUp(e)}
                  onChange={e => this.onInputChange(e)} />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">密码</label>
                <input 
                  type="password"
                  name="password"
                  className="form-control" 
                  id="exampleInputPassword1" 
                  placeholder="密码" 
                  onKeyUp={e => this.onInputKeyUp(e)}                  
                  onChange={e => this.onInputChange(e)}/>
              </div>
              <button 
                type="submit" 
                className="btn btn-block btn-lg btn-primary"
                onClick={e => this.onLogin(e)}>登录</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
