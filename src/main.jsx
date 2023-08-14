import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { Provider } from 'react-redux'
import setupStore from "./store";
import App from './App'
import './i18n'
import reportWebVitals from './reportWebVitals'
import './assets/styles/main.scss'

const store = setupStore()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#1677ff',
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
