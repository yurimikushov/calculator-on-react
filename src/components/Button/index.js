import './index.css'

function Button(props) {
  let className = 'calc-button'

  if (props.isTopOperators) className += ' top-operators'
  if (props.isNumber) className += ' numbers'
  if (props.isRightSideOperators) className += ' right-side-operators'

  return (
    <button className={className} onClick={props.onClick}>
      {props.title}
    </button>
  )
}

export default Button
