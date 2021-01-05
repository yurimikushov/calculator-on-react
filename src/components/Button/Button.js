import React from 'react'
import PropTypes from 'prop-types'
import './index.css'

function Button({ title, onClick, className }) {
  return (
    <button
      className={'button ' + className}
      onClick={(e) => onClick(e.target.innerText)}
    >
      {title}
    </button>
  )
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
}

export default Button
