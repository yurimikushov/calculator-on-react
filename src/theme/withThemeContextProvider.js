import React, { useState, useEffect } from 'react'
import './index.css'
import ThemeContext from './ThemeContext'
import { THEME_NAME } from './constants'

function withThemeContextProvider(WrappedComponent) {
  return function ThemeContextProvider(props) {
    const [themeName, setThemeName] = useState(
      getThemeNameFromLocalStorage() || THEME_NAME.LIGHT
    )

    useEffect(() => {
      setThemeNameInHtmlDataset(themeName)
      setThemeNameInLocalStorage(themeName)
    }, [themeName])

    function toggleTheme() {
      setThemeName((themeName) =>
        themeName === THEME_NAME.LIGHT ? THEME_NAME.DARK : THEME_NAME.LIGHT
      )
    }

    function setThemeNameInHtmlDataset(themeName) {
      document.querySelector('html').dataset['theme'] = themeName
    }

    function setThemeNameInLocalStorage(themeName) {
      localStorage.setItem('themeName', themeName)
    }

    function getThemeNameFromLocalStorage() {
      return localStorage.getItem('themeName')
    }

    return (
      <ThemeContext.Provider value={{ name: themeName, toggle: toggleTheme }}>
        <WrappedComponent {...props} />
      </ThemeContext.Provider>
    )
  }
}

export default withThemeContextProvider
