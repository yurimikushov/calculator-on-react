import React, { useState, useEffect } from 'react'
import './index.css'
import Screen from './../Screen'
import Button from './../Button'

export default function Calculator() {
  const [previewResult, setPreviewResult] = useState('')
  const [result, setResult] = useState([])
  const ERROR_RESULT = 'Error'

  useEffect(() => showPreviewResult())

  function deleteAllEnteredValues() {
    setPreviewResult('')
    setResult([])
  }

  function showEnteredValue(e) {
    let enteredValue = fixEnteredValue(e.target.innerText)

    if (result[0] !== ERROR_RESULT) {
      setResult(result.concat(enteredValue))
    } else {
      setResult([enteredValue])
    }

    function fixEnteredValue(value) {
      if (value === '×') value = '*'
      else if (value === '÷') value = '/'

      return value
    }
  }

  function showPreviewResult() {
    const lastValue = result[result.length - 1]

    const isOperator =
      lastValue === '(' ||
      lastValue === ')' ||
      lastValue === '/' ||
      lastValue === '*' ||
      lastValue === '-' ||
      lastValue === '+'

    const needToShowResult = !isOperator && result.length > 1

    setPreviewResult(needToShowResult ? calcResult() : '')
  }

  function showResult() {
    setPreviewResult('')
    setResult([calcResult()])
  }

  function deleteLastEnteredValue() {
    setResult(result.slice(0, result.length - 1))
  }

  function calcResult() {
    try {
      return eval(result.join(''))
    } catch (e) {
      return ERROR_RESULT
    }
  }

  return (
    <div className="calculator">
      <Screen previewResult={previewResult} result={result.join('')} />
      <div className="buttons">
        <div className="buttons-line">
          <Button title="C" onClick={deleteAllEnteredValues} isTopOperators={true} />
          <Button title="(" onClick={showEnteredValue} isTopOperators={true} />
          <Button title=")" onClick={showEnteredValue} isTopOperators={true} />
          <Button title="DEL" onClick={deleteLastEnteredValue} isTopOperators={true} />
        </div>
        <div className="buttons-line">
          <Button title="7" onClick={showEnteredValue} isNumber={true} />
          <Button title="8" onClick={showEnteredValue} isNumber={true} />
          <Button title="9" onClick={showEnteredValue} isNumber={true} />
          <Button title="÷" onClick={showEnteredValue} isRightSideOperators={true} />
        </div>
        <div className="buttons-line">
          <Button title="4" onClick={showEnteredValue} isNumber={true} />
          <Button title="5" onClick={showEnteredValue} isNumber={true} />
          <Button title="6" onClick={showEnteredValue} isNumber={true} />
          <Button title="-" onClick={showEnteredValue} isRightSideOperators={true} />
        </div>
        <div className="buttons-line">
          <Button title="1" onClick={showEnteredValue} isNumber={true} />
          <Button title="2" onClick={showEnteredValue} isNumber={true} />
          <Button title="3" onClick={showEnteredValue} isNumber={true} />
          <Button title="×" onClick={showEnteredValue} isRightSideOperators={true} />
        </div>
        <div className="buttons-line">
          <Button title="0" onClick={showEnteredValue} isNumber={true} />
          <Button title="." onClick={showEnteredValue} isNumber={true} />
          <Button title="=" onClick={showResult} isNumber={true} />
          <Button title="+" onClick={showEnteredValue} isRightSideOperators={true} />
        </div>
      </div>
    </div>
  )
}
