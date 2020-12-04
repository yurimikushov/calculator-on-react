import './index.css'
import DarkModeButton from './../DarkModeButton'

function Screen(props) {
    return (
        <div className="screen">
            <DarkModeButton/>
            <span>{props.result}</span>
            <input type="text" value={props.input} placeholder="0" readOnly/>
        </div>
    )
}

export default Screen
