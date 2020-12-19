import React, { useState, useEffect } from 'react'
import { MATH_OPERATORS, OPERATORS, ERROR_RESULT } from './constants'
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
import Button from './../Button'

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
      showEnteredValue(OPERATORS.SEPARATOR)
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
      <div className='buttons'>
        <div className='buttons-line'>
          <Button
            title={OPERATORS.CLEAR}
            onClick={clearEnteredValues}
            isTopOperators={true}
          />
          <Button
            title={MATH_OPERATORS.OPENING_PARENTHESIS}
            onClick={showEnteredValue}
            isTopOperators={true}
          />
          <Button
            title={MATH_OPERATORS.CLOSING_PARENTHESIS}
            onClick={showEnteredValue}
            isTopOperators={true}
          />
          <Button
            title={OPERATORS.DELETE}
            onClick={deleteLastEnteredValue}
            isTopOperators={true}
          />
        </div>
        <div className='buttons-line'>
          <Button title='7' onClick={showEnteredValue} isNumber={true} />
          <Button title='8' onClick={showEnteredValue} isNumber={true} />
          <Button title='9' onClick={showEnteredValue} isNumber={true} />
          <Button
            title={MATH_OPERATORS.DIVISION}
            onClick={showEnteredValue}
            isRightSideOperators={true}
          />
        </div>
        <div className='buttons-line'>
          <Button title='4' onClick={showEnteredValue} isNumber={true} />
          <Button title='5' onClick={showEnteredValue} isNumber={true} />
          <Button title='6' onClick={showEnteredValue} isNumber={true} />
          <Button
            title={MATH_OPERATORS.SUBSRTACTION}
            onClick={showEnteredValue}
            isRightSideOperators={true}
          />
        </div>
        <div className='buttons-line'>
          <Button title='1' onClick={showEnteredValue} isNumber={true} />
          <Button title='2' onClick={showEnteredValue} isNumber={true} />
          <Button title='3' onClick={showEnteredValue} isNumber={true} />
          <Button
            title={MATH_OPERATORS.MULTIPLICATION}
            onClick={showEnteredValue}
            isRightSideOperators={true}
          />
        </div>
        <div className='buttons-line'>
          <Button title='0' onClick={showEnteredValue} isNumber={true} />
          <Button
            title={OPERATORS.SEPARATOR}
            onClick={showEnteredValue}
            isNumber={true}
          />
          <Button title={OPERATORS.ASSIGNMENT} onClick={showResult} isNumber={true} />
          <Button
            title={MATH_OPERATORS.ADDITION}
            onClick={showEnteredValue}
            isRightSideOperators={true}
          />
        </div>
      </div>
    </div>
  )
}
