import React        from 'react'
import { Link }     from 'react-router-dom';

export default class topNav extends React.Component {
  onLayout () {
    alert('layout')
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
                        <span>欢迎：admin</span>
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
