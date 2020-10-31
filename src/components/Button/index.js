import './index.css'

function Button(props) {
  return (
    <button className="calc-button" onClick={props.onClick}>
      {props.title}
    </button>
  )
}

export default Button
