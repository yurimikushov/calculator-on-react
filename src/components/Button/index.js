import React from 'react'
import PropTypes from 'prop-types'
import './index.css'

export default function Button(props) {
  const className = 'button ' + props.className
  const onClick = (e) => props.onClick(e.target.innerText)

  return (
    <button className={className} onClick={onClick}>
      {props.title}
    </button>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
}
