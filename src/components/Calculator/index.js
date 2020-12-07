import React, { useState } from 'react'
import './index.css'
import Screen from './../Screen'
import Button from './../Button'

export default function Calculator() {
  const [previewResult, setPreviewResult] = useState('')
  const [enteredValues, setEnteredValues] = useState([])
  const ERROR_RESULT = 'Error'

  function showEnteredValue(e) {
    const enteredValue = fixEnteredValue(e.target.innerText)
    const updatedEnteredValues =
      enteredValues[0] !== ERROR_RESULT
        ? enteredValues.concat(enteredValue)
        : [enteredValue]

    setPreviewResult(calcPreviewResult(updatedEnteredValues))
    setEnteredValues(updatedEnteredValues)

    function fixEnteredValue(value) {
      if (value === '×') value = '*'
      else if (value === '÷') value = '/'

      return value
    }
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

    const isOperatorLastEnteredValue =
      lastEnteredValue === '(' ||
      lastEnteredValue === ')' ||
      lastEnteredValue === '/' ||
      lastEnteredValue === '*' ||
      lastEnteredValue === '-' ||
      lastEnteredValue === '+'

    return !isOperatorLastEnteredValue ? calcResult(enteredValues) : ''
  }

  function calcResult(enteredValues) {
    try {
      return eval(enteredValues.join(''))
    } catch (e) {
      return ERROR_RESULT
    }
  }

  return (
    <div className='calculator'>
      <Screen previewResult={previewResult} result={enteredValues.join('')} />
      <div className='buttons'>
        <div className='buttons-line'>
          <Button title='C' onClick={clearEnteredValues} isTopOperators={true} />
          <Button title='(' onClick={showEnteredValue} isTopOperators={true} />
          <Button title=')' onClick={showEnteredValue} isTopOperators={true} />
          <Button title='DEL' onClick={deleteLastEnteredValue} isTopOperators={true} />
        </div>
        <div className='buttons-line'>
          <Button title='7' onClick={showEnteredValue} isNumber={true} />
          <Button title='8' onClick={showEnteredValue} isNumber={true} />
          <Button title='9' onClick={showEnteredValue} isNumber={true} />
          <Button title='÷' onClick={showEnteredValue} isRightSideOperators={true} />
        </div>
        <div className='buttons-line'>
          <Button title='4' onClick={showEnteredValue} isNumber={true} />
          <Button title='5' onClick={showEnteredValue} isNumber={true} />
          <Button title='6' onClick={showEnteredValue} isNumber={true} />
          <Button title='-' onClick={showEnteredValue} isRightSideOperators={true} />
        </div>
        <div className='buttons-line'>
          <Button title='1' onClick={showEnteredValue} isNumber={true} />
          <Button title='2' onClick={showEnteredValue} isNumber={true} />
          <Button title='3' onClick={showEnteredValue} isNumber={true} />
          <Button title='×' onClick={showEnteredValue} isRightSideOperators={true} />
        </div>
        <div className='buttons-line'>
          <Button title='0' onClick={showEnteredValue} isNumber={true} />
          <Button title='.' onClick={showEnteredValue} isNumber={true} />
          <Button title='=' onClick={showResult} isNumber={true} />
          <Button title='+' onClick={showEnteredValue} isRightSideOperators={true} />
        </div>
      </div>
    </div>
  )
}
