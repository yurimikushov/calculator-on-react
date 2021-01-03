import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { THEME_NAME, DARK_MODE_CLASS_NAME } from './../../constants'
import './index.css'

function DarkModeButton({ classNames }) {
  const [themeName, setThemeName] = useState(getThemeNameFromLocalStorage())

  useEffect(() => {
    setThemeNameInLocalStorage(themeName)
  }, [themeName])

  function toggleTheme() {
    setThemeName(themeName === THEME_NAME.LIGHT ? THEME_NAME.DARK : THEME_NAME.LIGHT)
  }

  function setThemeNameInLocalStorage(themeName) {
    localStorage.setItem('themeName', themeName)
  }

  function getThemeNameFromLocalStorage() {
    return localStorage.getItem('themeName') || THEME_NAME.LIGHT
  }

  if (themeName === THEME_NAME.DARK) {
    document.body.classList.add(DARK_MODE_CLASS_NAME)
  } else {
    document.body.classList.remove(DARK_MODE_CLASS_NAME)
  }

  let className = 'dark-mode-button'

  if (classNames) {
    className += ' ' + classNames
  }

  return (
    <button className={className} onClick={toggleTheme}>
      {themeName === THEME_NAME.DARK ? '☀️' : '🌙'}
    </button>
  )
}

DarkModeButton.propTypes = {
  classNames: PropTypes.string,
}

export default DarkModeButton
