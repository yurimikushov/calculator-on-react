import React, { useState, useEffect } from 'react'
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

export default function Calculator() {
  const [previewResult, setPreviewResult] = useState('')
  const [enteredValues, setEnteredValues] = useState('')

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
    setEnteredValues((enteredValues) => {
      const updatedEnteredValues =
        enteredValues !== ERROR_RESULT
          ? enteredValues.concat(enteredValue)
          : '' + enteredValue

      setPreviewResult(calcPreviewResult(updatedEnteredValues))

      return updatedEnteredValues
    })
  }

  function showResult() {
    setPreviewResult('')
    setEnteredValues((enteredValues) => calcResult(enteredValues))
  }

  function deleteLastEnteredValue() {
    setEnteredValues((enteredValues) => {
      const updatedEnteredValues =
        enteredValues !== ERROR_RESULT
          ? enteredValues.substring(0, enteredValues.length - 1)
          : ''

      setPreviewResult(calcPreviewResult(updatedEnteredValues))

      return updatedEnteredValues
    })
  }

  function clearEnteredValues() {
    setPreviewResult('')
    setEnteredValues('')
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

  return (
    <div className='calculator'>
      <Screen previewResult={previewResult} result={enteredValues} />
      <NumPad
        showEnteredValue={showEnteredValue}
        showResult={showResult}
        deleteLastEnteredValue={deleteLastEnteredValue}
        clearEnteredValues={clearEnteredValues}
      />
    </div>
  )
}
