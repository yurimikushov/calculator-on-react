import { calcPreviewResult, calcResult } from './calculate-result'
import { ERROR_RESULT } from './../../constants'

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
