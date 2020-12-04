import React from 'react'
import './index.css'
import './dark-mode.css'

const LIGHT = 'light';

const DARK = 'dark';

const MOON_ICON = '🌙';

const SOON_ICON = '☀️';

const THEME_NAME_SELECTOR = 'themeName';
const DARK_MODE_CSS_CLASS = 'dark-mode';

class DarkModeButton extends React.Component {

    constructor(props) {
        super(props)
        this.state = {themeName: this._themeNameInLocalStorage}
        this.onClick = this.onClick.bind(this)
    }

    onClick() {
        this.setState({themeName: this._newThemeName})
    }

    render() {
        this._themeNameInLocalStorage = this.state.themeName

        this._toggleDarkMode();

        return (
            <button className="dark-mode-button" onClick={this.onClick}>
                {this.state.themeName === LIGHT ? SOON_ICON : MOON_ICON}
            </button>
        )
    }

    _toggleDarkMode() {
        let classList = document.querySelector('body').classList;

        if (this.state.themeName === LIGHT) {
            classList.remove(DARK_MODE_CSS_CLASS)
        } else {
            classList.add(DARK_MODE_CSS_CLASS)
        }
    }

    get _newThemeName() {
        return this._themeNameInLocalStorage === LIGHT ? DARK : LIGHT
    }

    get _themeNameInLocalStorage() {
        return localStorage.getItem(THEME_NAME_SELECTOR) || LIGHT
    }

    set _themeNameInLocalStorage(themeName) {
        localStorage.setItem(THEME_NAME_SELECTOR, themeName)
    }
}

export default DarkModeButton
