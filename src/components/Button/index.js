import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './index.css'

export default function Button(props) {
  let className = classNames('button', {
    'button_top-operators': props.isTopOperators,
    'button_numbers': props.isNumber,
    'button_right-side-operators': props.isRightSideOperators,
  })

  return (
    <button className={className} onClick={(e) => props.onClick(e.target.innerText)}>
      {props.title}
    </button>
  )
}

Button.propTypes = {
  isTopOperators: PropTypes.bool,
  isNumber: PropTypes.bool,
  isRightSideOperators: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string,
}
