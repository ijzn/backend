import React     from 'react';

import { 
  BrowserRouter, 
  Route, 
  Link, 
  Switch, 
  Redirect 
}                 from 'react-router-dom';

// 页面
import ProductList       from 'pages/product/index/index.jsx'
import ProductSave       from 'pages/product/index/save.jsx'
import ProductDetail     from 'pages/product/index/detail.jsx'
export default class ProductRouter extends React.Component{
  render () {
    return (
        <Switch>
          <Route path="/product/index" component={ProductList} />
          <Route path="/product/save/:pid?" component={ProductSave} />          
          <Route path="/product/detail/:pid" component={ProductDetail} />          
          <Redirect exact from="/product" to="/product/index" />
        </Switch>
    )
  }
}