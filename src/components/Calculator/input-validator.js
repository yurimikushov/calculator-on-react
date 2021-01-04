import { MATH_OPERATOR, SERVISE_OPERATOR } from './../../constants'

export const isNumber = (value) => '0' <= value && value <= '9'
export const isSeparator = (value) =>
  value === SERVISE_OPERATOR.SEPARATOR || value === SERVISE_OPERATOR.ALT_SEPARATOR
export const isMathOperator = (value) => Object.values(MATH_OPERATOR).includes(value)
export const isAssignmentOperator = (value) =>
  value === SERVISE_OPERATOR.ASSIGNMENT || value === 'Enter'
export const isDeleteOperator = (value) => value === 'Backspace'
export const isClearOperator = (value) => value === 'Escape'
