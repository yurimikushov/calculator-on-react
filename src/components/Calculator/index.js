import React, { useReducer, useEffect } from 'react'
import './index.css'
import reducer from './reducer'
import ACTION_TYPE from './action-types'
import {
  isNumber,
  isSeparator,
  isMathOperator,
  isAssignmentOperator,
  isDeleteOperator,
  isClearOperator,
} from './input-validator'
import { SERVISE_OPERATOR } from './../../constants'
import Screen from './../Screen'
import NumPad from './../NumPad'

export default function Calculator() {
  const [state, dispatch] = useReducer(reducer, { previewResult: '', enteredValues: '' })

  useEffect(() => {
    const keyDownHandler = (e) => keyboardInputHandler(e.key)
    window.addEventListener('keydown', keyDownHandler)
    return () => window.removeEventListener('keydown', keyDownHandler)
  }, [])

  function keyboardInputHandler(enteredValue) {
    if (isNumber(enteredValue) || isMathOperator(enteredValue)) {
      showEnteredValue(enteredValue)
    } else if (isSeparator(enteredValue)) {
      showEnteredValue(SERVISE_OPERATOR.SEPARATOR)
    } else if (isAssignmentOperator(enteredValue)) {
      showResult()
    } else if (isDeleteOperator(enteredValue)) {
      deleteLastEnteredValue()
    } else if (isClearOperator(enteredValue)) {
      clearEnteredValues()
    }
  }

  function showEnteredValue(enteredValue) {
    dispatch({ type: ACTION_TYPE.SHOW_ENTERED_VALUE, enteredValue })
  }

  function showResult() {
    dispatch({ type: ACTION_TYPE.SHOW_RESULT })
  }

  function deleteLastEnteredValue() {
    dispatch({ type: ACTION_TYPE.DELETE_LAST_ENTERED_VALUE })
  }

  function clearEnteredValues() {
    dispatch({ type: ACTION_TYPE.CLEAR_ENTERED_VALUES })
  }

  return (
    <div className='calculator'>
      <Screen previewResult={state.previewResult} result={state.enteredValues} />
      <NumPad
        showEnteredValue={showEnteredValue}
        showResult={showResult}
        deleteLastEnteredValue={deleteLastEnteredValue}
        clearEnteredValues={clearEnteredValues}
      />
    </div>
  )
}
