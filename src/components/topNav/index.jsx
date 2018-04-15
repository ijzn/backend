import React        from 'react'
import { Link }     from 'react-router-dom';
import MUtil        from 'util/mm.jsx'
import User         from 'api/user.jsx'

const _mm   = new MUtil()
const _user = new User()

export default class topNav extends React.Component {
  constructor (props) {
    super(props)
    let userInfo = _mm.getStorage('userInfo')
    console.log(userInfo)
    this.state = {
      username: userInfo.username || ''
    }
  }
  onLayout () {
   /*  _user.logout()
    .then(res=>{
      _mm.removeStorage('userInfo')      
      location.href = '/login'
    },errmsg=>{
      _mm.errorTips(errmsg)      
    }) */
  }
  render () {
    return (
      <div className="navbar navbar-default top-navbar">
            <div className="navbar-header">
                <Link className="navbar-brand" to="/"><b>HAPPY</b>MMALL</Link>
            </div>
            <ul className="nav navbar-top-links navbar-right">
                <li className="dropdown">
                    <a className="dropdown-toggle"  href="javascript:;" >
                        <i className="fa fa-user fa-fw"></i>
                        {
                          this.state.username
                          ? <span>欢迎，{this.state.username}</span>
                          : <span>欢迎您</span>
                        }
                        <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        <li>
                          <a href="javascript:;" onClick={() => this.onLayout()}>
                            <i className="fa fa-sign-out fa-fw"></i>
                             退出登录
                          </a>
                          </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
  }
};
