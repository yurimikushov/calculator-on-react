import React from 'react'
import './index.css'
import './dark-mode.css'

class DarkModeButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { themeName: 'light' }
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount() {
    this._setTheme(this._themeNameLocalStorage)
  }

  onClick() {
    this._setTheme(this._newThemeName)
  }

  render() {
    return (
      <button className="dark-mode-button" onClick={this.onClick}>
        {this.state.themeName === 'light' ? '☀️' : '🌙'}
      </button>
    )
  }

  _setTheme(themeName) {
    if (!themeName || themeName === 'light') {
      document.querySelector('body').classList.remove('dark-mode')
    } else {
      document.querySelector('body').classList.add('dark-mode')
    }

    this._themeNameLocalStorage = themeName
    this.setState({ themeName: themeName })
  }

  get _newThemeName() {
    let newThemeName

    if (this._themeNameLocalStorage) {
      newThemeName = this._themeNameLocalStorage === 'light' ? 'dark' : 'light'
    } else {
      newThemeName = 'dark'
    }

    return newThemeName
  }

  get _themeNameLocalStorage() {
    return localStorage.getItem('themeName')
  }

  set _themeNameLocalStorage(themeName) {
    localStorage.setItem('themeName', themeName)
  }
}

export default DarkModeButton
