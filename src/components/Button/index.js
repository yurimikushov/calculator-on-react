import classNames from 'classnames'
import './index.css'

export default function Button(props) {
  let className = classNames('button', {
    'button_top-operators': props.isTopOperators,
    'button_numbers': props.isNumber,
    'button_right-side-operators': props.isRightSideOperators,
  })

  return (
    <button className={className} onClick={props.onClick}>
      {props.title}
    </button>
  )
}
