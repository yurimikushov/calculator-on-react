import { MATH_OPERATOR, ERROR_RESULT } from './../../constants'
import { isMathOperator } from './input-validator'

export const ACTION_TYPE = {
  SHOW_ENTERED_VALUE: 'ShowEnteredValue',
  SHOW_RESULT: 'ShowResult',
  DELETE_LAST_ENTERED_VALUE: 'DeleteLastEnteredValue',
  CLEAR_ENTERED_VALUES: 'ClearEnteredValues',
}

export default function reducer(state, action) {
  let updatedEnteredValues

  switch (action.type) {
    case ACTION_TYPE.SHOW_ENTERED_VALUE:
      updatedEnteredValues =
        state.enteredValues !== ERROR_RESULT
          ? state.enteredValues.concat(action.enteredValue)
          : '' + action.enteredValue

      return {
        previewResult: calcPreviewResult(updatedEnteredValues),
        enteredValues: updatedEnteredValues,
      }
    case ACTION_TYPE.SHOW_RESULT:
      return {
        previewResult: '',
        enteredValues: calcResult(state.enteredValues),
      }
    case ACTION_TYPE.DELETE_LAST_ENTERED_VALUE:
      updatedEnteredValues =
        state.enteredValues !== ERROR_RESULT
          ? state.enteredValues.substring(0, state.enteredValues.length - 1)
          : ''

      return {
        previewResult: calcPreviewResult(updatedEnteredValues),
        enteredValues: updatedEnteredValues,
      }
    case ACTION_TYPE.CLEAR_ENTERED_VALUES:
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
      .replaceAll(MATH_OPERATOR.MULTIPLICATION, MATH_OPERATOR.AlT_MULTIPLICATION)
      .replaceAll(MATH_OPERATOR.DIVISION, MATH_OPERATOR.AlT_DIVISION)
  }
}
