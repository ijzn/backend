import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css'
import './index.scss'
import 'font-awesome/css/font-awesome.min.css'


// 基础jsx语法的写法
/* let style = {
  color: 'pink',
  fontSize: '30px'
} */
// 行内样式
// let jsx = <div style={style}>jijijijiji</div>
// 外部引入css
// let jsx = <div className="jsx">jijijijiji</div>

let name = `jzn`
let flag = false
let names = ['jzn', 'age', 'sex']
let jsx = (
  <div className="jsx">
    {/* 变量的使用 */}
    <p>{name}</p>
    {/* 这是条件判断 */}
    {
      flag ? <p>he is {name}</p> : <p>he is not {name}</p>
    }
    {/* 数组的循环 */}
    {
      names.map((name,index) =>  <p key={index}>hello, kk
         i am {name}</p>)
    }
  </div>
)

ReactDOM.render(jsx,document.getElementById('app'))