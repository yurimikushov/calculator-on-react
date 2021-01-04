import React from 'react'
import PropTypes from 'prop-types'
import { MATH_OPERATOR, SERVISE_OPERATOR } from './../../constants'
import './index.css'
import TopOperator from '../Button/TopOperator'
import Number from '../Button/Number'
import RightSideOperator from '../Button/RightSideOperator'

function NumPad({
  showEnteredValue,
  showResult,
  deleteLastEnteredValue,
  clearEnteredValues,
}) {
  return (
    <div className='number-pad'>
      <div className='number-pad__line'>
        <TopOperator title={SERVISE_OPERATOR.CLEAR} onClick={clearEnteredValues} />
        <TopOperator
          title={MATH_OPERATOR.OPENING_PARENTHESIS}
          onClick={showEnteredValue}
        />
        <TopOperator
          title={MATH_OPERATOR.CLOSING_PARENTHESIS}
          onClick={showEnteredValue}
        />
        <TopOperator title={SERVISE_OPERATOR.DELETE} onClick={deleteLastEnteredValue} />
      </div>
      <div className='number-pad__line'>
        <Number title='7' onClick={showEnteredValue} />
        <Number title='8' onClick={showEnteredValue} />
        <Number title='9' onClick={showEnteredValue} />
        <RightSideOperator title={MATH_OPERATOR.DIVISION} onClick={showEnteredValue} />
      </div>
      <div className='number-pad__line'>
        <Number title='4' onClick={showEnteredValue} />
        <Number title='5' onClick={showEnteredValue} />
        <Number title='6' onClick={showEnteredValue} />
        <RightSideOperator
          title={MATH_OPERATOR.SUBSRTACTION}
          onClick={showEnteredValue}
        />
      </div>
      <div className='number-pad__line'>
        <Number title='1' onClick={showEnteredValue} />
        <Number title='2' onClick={showEnteredValue} />
        <Number title='3' onClick={showEnteredValue} />
        <RightSideOperator
          title={MATH_OPERATOR.MULTIPLICATION}
          onClick={showEnteredValue}
        />
      </div>
      <div className='number-pad__line'>
        <Number title='0' onClick={showEnteredValue} />
        <Number title={SERVISE_OPERATOR.SEPARATOR} onClick={showEnteredValue} />
        <Number title={SERVISE_OPERATOR.ASSIGNMENT} onClick={showResult} />
        <RightSideOperator title={MATH_OPERATOR.ADDITION} onClick={showEnteredValue} />
      </div>
    </div>
  )
}

NumPad.propTypes = {
  showEnteredValue: PropTypes.func.isRequired,
  showResult: PropTypes.func.isRequired,
  deleteLastEnteredValue: PropTypes.func.isRequired,
  clearEnteredValues: PropTypes.func.isRequired,
}

export default NumPad
