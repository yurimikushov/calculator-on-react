import React from 'react'
import './index.css'
import Screen from '../Screen'
import Button from './../Button'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { result: '', input: [] }
    this.clear = this.clear.bind(this)
    this.delete = this.delete.bind(this)
    this.displayValue = this.displayValue.bind(this)
    this.displayResult = this.displayResult.bind(this)
  }

  clear() {
    this.setState({ result: '', input: [] })
  }

  delete() {
    this._deleteLastValue()
    this._displayPreliminaryResult()
  }

  displayValue(e) {
    this._displayInputValue(e.target.innerText)
    this._displayPreliminaryResult()
  }

  displayResult() {
    this.setState({
      result: '',
      input: [this._calc()],
    })
  }

  render() {
    return (
      <div className="calculator">
        <Screen result={this.state.result} input={this.state.input} />
        <div className="buttons">
          <div className="buttons-line">
            <Button title="C" onClick={this.clear} isTopOperators={true} />
            <Button title="(" onClick={this.displayValue} isTopOperators={true} />
            <Button title=")" onClick={this.displayValue} isTopOperators={true} />
            <Button title="DEL" onClick={this.delete} isTopOperators={true} />
          </div>
          <div className="buttons-line">
            <Button title="7" onClick={this.displayValue} isNumber={true} />
            <Button title="8" onClick={this.displayValue} isNumber={true} />
            <Button title="9" onClick={this.displayValue} isNumber={true} />
            <Button title="÷" onClick={this.displayValue} isRightSideOperators={true} />
          </div>
          <div className="buttons-line">
            <Button title="4" onClick={this.displayValue} isNumber={true} />
            <Button title="5" onClick={this.displayValue} isNumber={true} />
            <Button title="6" onClick={this.displayValue} isNumber={true} />
            <Button title="-" onClick={this.displayValue} isRightSideOperators={true} />
          </div>
          <div className="buttons-line">
            <Button title="1" onClick={this.displayValue} isNumber={true} />
            <Button title="2" onClick={this.displayValue} isNumber={true} />
            <Button title="3" onClick={this.displayValue} isNumber={true} />
            <Button title="×" onClick={this.displayValue} isRightSideOperators={true} />
          </div>
          <div className="buttons-line">
            <Button title="0" onClick={this.displayValue} isNumber={true} />
            <Button title="." onClick={this.displayValue} isNumber={true} />
            <Button title="=" onClick={this.displayResult} isNumber={true} />
            <Button title="+" onClick={this.displayValue} isRightSideOperators={true} />
          </div>
        </div>
      </div>
    )
  }

  _deleteLastValue() {
    this.state.input.pop()
    this.setState({ input: this.state.input })
  }

  _displayInputValue(value) {
    if (this.state.input[0] == 'Error') {
      this.state.input = []
    }

    if (value == '×') {
      value = '*'
    } else if (value == '÷') {
      value = '/'
    }

    this.state.input.push(value)
    this.setState({ input: this.state.input })
  }

  _displayPreliminaryResult() {
    const lastValue = this.state.input[this.state.input.length - 1]

    const isOperator =
      lastValue == '(' ||
      lastValue == ')' ||
      lastValue == '/' ||
      lastValue == '*' ||
      lastValue == '-' ||
      lastValue == '+'

    const needToDisplayResult = !isOperator && this.state.input.length > 1

    this.setState({ result: needToDisplayResult ? this._calc() : '' })
  }

  _calc() {
    let result

    try {
      result = eval(this.state.input.join(''))
    } catch (e) {
      result = 'Error'
    }

    return result
  }
}

export default App
