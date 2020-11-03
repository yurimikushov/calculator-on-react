import React from 'react'
import './index.css'
import './dark-mode.css'

class DarkModeButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { themeName: this._themeNameInLocalStorage }
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    this.setState({ themeName: this._newThemeName })
  }

  render() {
    this._themeNameInLocalStorage = this.state.themeName

    if (this.state.themeName === 'light') {
      document.querySelector('body').classList.remove('dark-mode')
    } else {
      document.querySelector('body').classList.add('dark-mode')
    }

    return (
      <button className="dark-mode-button" onClick={this.onClick}>
        {this.state.themeName === 'light' ? '☀️' : '🌙'}
      </button>
    )
  }

  get _newThemeName() {
    return this._themeNameInLocalStorage === 'light' ? 'dark' : 'light'
  }

  get _themeNameInLocalStorage() {
    return localStorage.getItem('themeName') || 'light'
  }

  set _themeNameInLocalStorage(themeName) {
    localStorage.setItem('themeName', themeName)
  }
}

export default DarkModeButton
