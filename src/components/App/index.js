import React from 'react'
import './index.css'
import Screen from '../Screen'
import Button from './../Button'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { inputValues: [] }
    this.clear = this.clear.bind(this)
    this.delete = this.delete.bind(this)
    this.display = this.display.bind(this)
    this.calc = this.calc.bind(this)
  }

  clear() {
    this.setState({ inputValues: [] })
  }

  delete() {
    this.state.inputValues.pop()
    this.setState({ inputValues: this.state.inputValues })
  }

  display(e) {
    let value = e.target.innerText

    if (value == '×') {
      value = '*'
    } else if (value == '÷') {
      value = '/'
    }

    this.state.inputValues.push(value)
    this.setState({ inputValues: this.state.inputValues })
  }

  calc() {
    let result

    try {
      result = eval(this.state.inputValues.join(''))
    } catch (e) {
      result = 'Error'
    }

    this.setState({ inputValues: [result] })
  }

  render() {
    return (
      <div className="calculator">
        <Screen inputValues={this.state.inputValues} />
        <div className="buttons">
          <div className="buttons-line">
            <Button title="C" onClick={this.clear} isTopOperators={true} />
            <Button title="(" onClick={this.display} isTopOperators={true} />
            <Button title=")" onClick={this.display} isTopOperators={true} />
            <Button title="DEL" onClick={this.delete} isTopOperators={true} />
          </div>
          <div className="buttons-line">
            <Button title="7" onClick={this.display} isNumber={true} />
            <Button title="8" onClick={this.display} isNumber={true} />
            <Button title="9" onClick={this.display} isNumber={true} />
            <Button title="÷" onClick={this.display} isSideOperators={true} />
          </div>
          <div className="buttons-line">
            <Button title="4" onClick={this.display} isNumber={true} />
            <Button title="5" onClick={this.display} isNumber={true} />
            <Button title="6" onClick={this.display} isNumber={true} />
            <Button title="-" onClick={this.display} isSideOperators={true} />
          </div>
          <div className="buttons-line">
            <Button title="1" onClick={this.display} isNumber={true} />
            <Button title="2" onClick={this.display} isNumber={true} />
            <Button title="3" onClick={this.display} isNumber={true} />
            <Button title="×" onClick={this.display} isSideOperators={true} />
          </div>
          <div className="buttons-line">
            <Button title="0" onClick={this.display} isNumber={true} />
            <Button title="." onClick={this.display} isNumber={true} />
            <Button title="=" onClick={this.calc} isNumber={true} />
            <Button title="+" onClick={this.display} isSideOperators={true} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
