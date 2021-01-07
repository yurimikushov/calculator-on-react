import { isMathOperator } from './input-validator'
import { MATH_OPERATOR, ERROR_RESULT } from '../../constants'

export function calcPreviewResult(enteredValues) {
  const lastEnteredValue = enteredValues[enteredValues.length - 1]

  return !isMathOperator(lastEnteredValue) ? calcResult(enteredValues) : ''
}

export function calcResult(enteredValues) {
  try {
    return '' + (eval(fixEnteredValues(enteredValues)) || '')
  } catch (e) {
    return ERROR_RESULT
  }

  function fixEnteredValues(values) {
    return values
      .replaceAll(MATH_OPERATOR.MULTIPLICATION, MATH_OPERATOR.AlT_MULTIPLICATION)
      .replaceAll(MATH_OPERATOR.DIVISION, MATH_OPERATOR.AlT_DIVISION)
  }
}
