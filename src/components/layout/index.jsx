import React from 'react'
import TopNav from 'components/topNav/index.jsx';
import SildNav from 'components/sildNav/index.jsx';

import './theme.css'

export default class Layout extends React.Component {
  constructor (props) {
    super(props) 
  }
  render () {
    return (
      <div id="wrapper">
        <TopNav />
        <SildNav />
        {this.props.children}
      </div>
    )
  }
}
