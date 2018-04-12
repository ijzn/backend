import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

// 页面
import Home from 'pages/Home/index.jsx'
// 布局
import Layout from 'components/layout/index.jsx'

class App extends React.Component{
  render () {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} ></Route>
            <Route path='/product' component={Home} ></Route>
            <Route path='/product.category' component={Home} ></Route>
            <Home></Home>
          </Switch>
        </Layout>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />,document.getElementById('app'))