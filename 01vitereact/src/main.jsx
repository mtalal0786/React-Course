import React from 'react'
import ReactDOM from 'react-dom/client'
// import {jsx as _jsx} from "react/jsx-runtime.js"
import App from './App.jsx'

function MyApp(){
  return (
    <div>
      <h1>Hello, world!</h1>
    </div>
    )
}

// const ReactElement = {
//   type: 'a',
//   props: {
//       href: 'https://www.react.dev',
//       target:"_blank",
//       hreflang: 'en'
//   },
//   children: 'Click me to visit React.dev for Learning Guide'
// }
//It does not work as in react render jsx does not understand syntex of giving typr and thn props and there values. jsx only want there values not there keys like type:'a' is just give 'a' only value.

const AnotherElement = (

  <a href="https://google.com" target="_blank" >Google visit</a>
  )
//use react create element and give values only.
const ReactElement = React.createElement(
   'a',
 {
    href: 'https://www.react.dev',
    target: "_blank"
  },
   'Click me to visit React.dev for Learning Guide',
   AnotherElement
)

// basic way of writing component


ReactDOM.createRoot(document.getElementById('root')).render(
  
    // <MyApp /> //we also execute MyApp()as this is a function. 
// ReactElement
// AnotherElement
// accessing the reactcreate elemnet function
ReactElement

//accessing App function from App.jsx file
  // <App />
);
