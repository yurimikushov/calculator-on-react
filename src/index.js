import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './padding-modifyer.css'
import './position-modifyer.css'
import { withThemeContextProvider as withTheme } from './theme'
import Calculator from './components/Calculator'

const CalculatorWithTheme = withTheme(Calculator)

ReactDOM.render(
  <React.StrictMode>
    <CalculatorWithTheme />
  </React.StrictMode>,
  document.getElementById('root')
)
