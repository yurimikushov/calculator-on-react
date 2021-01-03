import React from 'react'
import PropTypes from 'prop-types'
import './index.css'
import DarkModeButton from './../DarkModeButton'

function Screen({ previewResult, result }) {
  return (
    <div className='screen'>
      <DarkModeButton classNames='position_top-left pt-10 pl-10' />
      <span className='screen__preview-result position_top-right pt-10 pr-10 pl-50'>
        {previewResult}
      </span>
      <input
        className='screen__result position_bottom'
        type='text'
        value={result}
        placeholder='0'
        readOnly
      />
    </div>
  )
}

Screen.propTypes = {
  previewResult: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
}

export default Screen
