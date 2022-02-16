import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import './index.css'
import 'antd/dist/antd.dark.css'

if (process.env.NODE_ENV === 'production') {
  console.log = () => {}
  console.error = () => {}
  console.debug = () => {}
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
