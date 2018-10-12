import React from 'react'
import ReactDOM from 'react-dom'

import 'antd/dist/antd.css'
import './styles/burger-menu.css'
import './styles/index.css'

import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.querySelector('#root'))

serviceWorker.register()
