import React, { useReducer, useEffect } from 'react'
import { MATH_OPERATORS, SERVISE_OPERATORS, ERROR_RESULT } from './../../constants'
import {
  isNumber,
  isSeparator,
  isMathOperator,
  isAssignmentOperator,
  isDeleteOperator,
  isClearOperator,
} from './input-validator'
import './index.css'
import Screen from './../Screen'
import NumPad from './../NumPad'

const CALC_ACTION_TYPE = {
  SHOW_ENTERED_VALUE: 'ShowEnteredValue',
  SHOW_RESULT: 'ShowResult',
  DELETE_LAST_ENTERED_VALUE: 'DeleteLastEnteredValue',
  CLEAR_ENTERED_VALUES: 'ClearEnteredValues',
}

function reducer(state, action) {
  let updatedEnteredValues

  switch (action.type) {
    case CALC_ACTION_TYPE.SHOW_ENTERED_VALUE:
      updatedEnteredValues =
        state.enteredValues !== ERROR_RESULT
          ? state.enteredValues.concat(action.enteredValue)
          : '' + action.enteredValue

      return {
        previewResult: calcPreviewResult(updatedEnteredValues),
        enteredValues: updatedEnteredValues,
      }
    case CALC_ACTION_TYPE.SHOW_RESULT:
      return {
        previewResult: '',
        enteredValues: calcResult(state.enteredValues),
      }
    case CALC_ACTION_TYPE.DELETE_LAST_ENTERED_VALUE:
      updatedEnteredValues =
        state.enteredValues !== ERROR_RESULT
          ? state.enteredValues.substring(0, state.enteredValues.length - 1)
          : ''

      return {
        previewResult: calcPreviewResult(updatedEnteredValues),
        enteredValues: updatedEnteredValues,
      }
    case CALC_ACTION_TYPE.CLEAR_ENTERED_VALUES:
      return {
        previewResult: '',
        enteredValues: '',
      }
    default:
      throw new Error()
  }
}

function calcPreviewResult(enteredValues) {
  const lastEnteredValue = enteredValues[enteredValues.length - 1]

  return !isMathOperator(lastEnteredValue) ? calcResult(enteredValues) : ''
}

function calcResult(enteredValues) {
  try {
    return '' + (eval(fixEnteredValues(enteredValues)) || '')
  } catch (e) {
    return ERROR_RESULT
  }

  function fixEnteredValues(values) {
    return values
      .replaceAll(MATH_OPERATORS.MULTIPLICATION, MATH_OPERATORS.AlT_MULTIPLICATION)
      .replaceAll(MATH_OPERATORS.DIVISION, MATH_OPERATORS.AlT_DIVISION)
  }
}

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
      showEnteredValue(SERVISE_OPERATORS.SEPARATOR)
    } else if (isAssignmentOperator(enteredValue)) {
      showResult()
    } else if (isDeleteOperator(enteredValue)) {
      deleteLastEnteredValue()
    } else if (isClearOperator(enteredValue)) {
      clearEnteredValues()
    }
  }

  function showEnteredValue(enteredValue) {
    dispatch({ type: CALC_ACTION_TYPE.SHOW_ENTERED_VALUE, enteredValue })
  }

  function showResult() {
    dispatch({ type: CALC_ACTION_TYPE.SHOW_RESULT })
  }

  function deleteLastEnteredValue() {
    dispatch({ type: CALC_ACTION_TYPE.DELETE_LAST_ENTERED_VALUE })
  }

  function clearEnteredValues() {
    dispatch({ type: CALC_ACTION_TYPE.CLEAR_ENTERED_VALUES })
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
