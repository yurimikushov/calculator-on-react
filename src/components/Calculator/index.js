import React, { useState, useEffect } from 'react'
import './index.css'
import Screen from './../Screen'
import Button from './../Button'

const MATH_OPERATORS = {
  ADDITION: '+',
  SUBSRTACTION: '-',
  MULTIPLICATION: '×',
  DIVISION: '÷',
  OPENING_PARENTHESIS: '(',
  CLOSING_PARENTHESIS: ')',
}

const OPERATORS = {
  ASSIGNMENT: '=',
  SEPARATOR: '.',
  CLEAR: 'C',
  DELETE: 'DEL',
}

const ERROR_RESULT = 'Error'

const isNumber = (value) => '0' <= value && value <= '9'
const isSeparator = (value) => value === OPERATORS.SEPARATOR || value === ','
const isMathOperator = (value) => Object.values(MATH_OPERATORS).includes(value)
const isAssignmentOperator = (value) =>
  value === OPERATORS.ASSIGNMENT || value === 'Enter'
const isDeleteOperator = (value) => value === 'Backspace'
const isClearOperator = (value) => value === 'Escape'

export default function Calculator() {
  const [previewResult, setPreviewResult] = useState('')
  const [enteredValues, setEnteredValues] = useState([])

  useEffect(() => {
    const keyDownHandler = (e) => keyboardEntryHandler(e.key)
    window.addEventListener('keydown', keyDownHandler)
    return () => window.removeEventListener('keydown', keyDownHandler)
  }, [])

  function keyboardEntryHandler(key) {
    if (isNumber(key) || isMathOperator(key)) {
      showEnteredValue(key)
    } else if (isSeparator(key)) {
      showEnteredValue(OPERATORS.SEPARATOR)
    } else if (isAssignmentOperator(key)) {
      showResult()
    } else if (isDeleteOperator(key)) {
      deleteLastEnteredValue()
    } else if (isClearOperator(key)) {
      clearEnteredValues()
    }
  }

  function showEnteredValue(enteredValue) {
    const updatedEnteredValues =
      enteredValues[0] !== ERROR_RESULT
        ? enteredValues.concat(enteredValue)
        : [enteredValue]

    setPreviewResult(calcPreviewResult(updatedEnteredValues))
    setEnteredValues(updatedEnteredValues)
  }

  function showResult() {
    setPreviewResult('')
    setEnteredValues([calcResult(enteredValues)])
  }

  function deleteLastEnteredValue() {
    const updatedEnteredValues = enteredValues.slice(0, enteredValues.length - 1)

    setPreviewResult(calcPreviewResult(updatedEnteredValues))
    setEnteredValues(updatedEnteredValues)
  }

  function clearEnteredValues() {
    setPreviewResult('')
    setEnteredValues([])
  }

  function calcPreviewResult(enteredValues) {
    const lastEnteredValue = enteredValues[enteredValues.length - 1]

    return !isMathOperator(lastEnteredValue) ? calcResult(enteredValues) : ''
  }

  function calcResult(enteredValues) {
    try {
      return eval(fixEnteredValues(enteredValues).join(''))
    } catch (e) {
      return ERROR_RESULT
    }

    function fixEnteredValues(values) {
      return values.map((value) => {
        if (value === MATH_OPERATORS.MULTIPLICATION) return '*'
        else if (value === MATH_OPERATORS.DIVISION) return '/'
        else return value
      })
    }
  }

  return (
    <div className='calculator'>
      <Screen previewResult={previewResult} result={enteredValues.join('')} />
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
