import React, { useState, useEffect } from 'react'
import { THEME_NAME } from './constants'
import { DARK_MODE_CLASS_NAME } from './../../constants'
import './index.css'

export default function DarkModeButton() {
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

  return (
    <button className='dark-mode-button position_top-left' onClick={toggleTheme}>
      {themeName === THEME_NAME.LIGHT ? '☀️' : '🌙'}
    </button>
  )
}
