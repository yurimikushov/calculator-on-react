import { MATH_OPERATORS, OPERATORS } from './../../constants'

export const isNumber = (value) => '0' <= value && value <= '9'
export const isSeparator = (value) =>
  value === OPERATORS.SEPARATOR || value === OPERATORS.ALT_SEPARATOR
export const isMathOperator = (value) => Object.values(MATH_OPERATORS).includes(value)
export const isAssignmentOperator = (value) =>
  value === OPERATORS.ASSIGNMENT || value === 'Enter'
export const isDeleteOperator = (value) => value === 'Backspace'
export const isClearOperator = (value) => value === 'Escape'
