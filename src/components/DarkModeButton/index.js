import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import './index.css'
import { ThemeContext, THEME_NAME } from './../../theme'

function DarkModeButton({ className }) {
  const theme = useContext(ThemeContext)

  return (
    <button
      className={'dark-mode-button' + (className ? ' ' + className : '')}
      onClick={theme.toggle}
    >
      {theme.name === THEME_NAME.DARK ? '☀️' : '🌙'}
    </button>
  )
}

DarkModeButton.propTypes = {
  className: PropTypes.string,
}

export default DarkModeButton
