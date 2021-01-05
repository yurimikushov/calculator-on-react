import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import './index.css'
import { ThemeContext, THEME_NAME } from './../../theme'

function DarkModeButton({ classNames }) {
  const theme = useContext(ThemeContext)

  let className = 'dark-mode-button'

  if (classNames) {
    className += ' ' + classNames
  }

  return (
    <button className={className} onClick={theme.toggle}>
      {theme.name === THEME_NAME.DARK ? '☀️' : '🌙'}
    </button>
  )
}

DarkModeButton.propTypes = {
  classNames: PropTypes.string,
}

export default DarkModeButton
