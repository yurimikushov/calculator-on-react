import React, { useState, useEffect } from 'react'
import './index.css'
import './dark-mode.css'

const THEME_NAME = {
  LIGHT: 'light',
  DARK: 'dark',
}

export default function DarkModeButton() {
  const [themeName, setThemeName] = useState(getThemeNameFromLocalStorage())

  useEffect(() => {
    setThemeNameInLocalStorage(themeName)
  }, [themeName])

  function onClick() {
    setThemeName(themeName === THEME_NAME.LIGHT ? THEME_NAME.DARK : THEME_NAME.LIGHT)
  }

  function setThemeNameInLocalStorage(themeName) {
    localStorage.setItem('themeName', themeName)
  }

  function getThemeNameFromLocalStorage() {
    return localStorage.getItem('themeName') || THEME_NAME.LIGHT
  }

  const DARK_MODE_CLASS_NAME = 'dark-mode'

  if (themeName === THEME_NAME.LIGHT) {
    document.body.classList.remove(DARK_MODE_CLASS_NAME)
  } else {
    document.body.classList.add(DARK_MODE_CLASS_NAME)
  }

  return (
    <button className='dark-mode-button' onClick={onClick}>
      {themeName === THEME_NAME.LIGHT ? '☀️' : '🌙'}
    </button>
  )
}
