import React     from 'react';
import ReactDOM  from 'react-dom';
import { 
  BrowserRouter, 
  Route, 
  Link, 
  Switch, 
  Redirect 
}                 from 'react-router-dom';

// 页面
import Home           from 'pages/Home/index.jsx'
import Login          from 'pages/Login/index.jsx'
import ErrorPage      from 'pages/error/index.jsx';
import ProductRouter  from 'pages/product/router.jsx';
import OrderList      from 'pages/order/index.jsx';
import OrderDetail    from 'pages/order/detail.jsx';
import UserList       from 'pages/user/index.jsx';


// 布局
import Layout from 'components/layout/index.jsx'

class App extends React.Component{
  render () {
    let LayoutRouter = (
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} ></Route>
          <Route path='/product' component={ProductRouter} ></Route>
          <Route path='/product-category' component={ProductRouter} ></Route>
          <Route path="/order/index" component={OrderList}/>
          <Route path="/order/detail/:orderNumber" component={OrderDetail}/>
          <Route path='/user/index' component={UserList} ></Route> 
          <Redirect exact from='/user' to="/user/index" />
          <Redirect exact from='/order' to="/order/index" />
          <Route component={ErrorPage} ></Route>          
        </Switch>
      </Layout>
    )
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" render={ props => LayoutRouter} />
        </Switch>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />,document.getElementById('app'))