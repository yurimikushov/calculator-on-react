import './index.css'

function Button(props) {
  let className = 'calc-button'

  if (props.isTopOperators) className += ' top-operators-bg'
  if (props.isNumber) className += ' numbers-bg'
  if (props.isRightSideOperators) className += ' right-side-operators-bg'

  return (
    <button className={className} onClick={props.onClick}>
      {props.title}
    </button>
  )
}

export default Button
