import classNames from 'classnames'
import './index.css'

export default function Button(props) {
  let className = classNames('calc-button', {
    'top-operators': props.isTopOperators,
    numbers: props.isNumber,
    'right-side-operators': props.isRightSideOperators,
  })

  return (
    <button className={className} onClick={props.onClick}>
      {props.title}
    </button>
  )
}
