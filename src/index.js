import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import './i18n'
import reportWebVitals from './reportWebVitals'
import './index.scss'
import './index.less'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#41bef6',
      },
    }}
  >
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ConfigProvider>
)

reportWebVitals()
