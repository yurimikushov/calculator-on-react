import React from 'react'
import './index.css'

class DarkModeButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { active: false }
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    const active = !this.state.active

    if (active) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.id = 'dark-mode-stylesheet'
      link.href = '/css/dark.css'

      document.getElementsByTagName('head')[0].appendChild(link)
    } else {
      const link = document.querySelectorAll('#dark-mode-stylesheet')

      if (link) {
        link.forEach((el) => el.remove())
      }
    }

    this.setState({ active: active })
  }

  render() {
    return (
      <button className="dark-mode-button" onClick={this.onClick}>
        {this.state.active ? '☀️' : '🌙'}
      </button>
    )
  }
}

export default DarkModeButton
