import React from 'react'
import './index.css'
import Tablo from './../Tablo'
import Button from './../Button'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { tabloValues: [] }
    this.clear = this.clear.bind(this)
    this.delete = this.delete.bind(this)
    this.display = this.display.bind(this)
    this.calc = this.calc.bind(this)
  }

  clear() {
    this.setState({ tabloValues: [] })
  }

  delete() {
    this.state.tabloValues.pop()
    this.setState({ tabloValues: this.state.tabloValues })
  }

  display(e) {
    let value = e.target.innerText

    if (value == '×') {
      value = '*'
    } else if (value == '÷') {
      value = '/'
    }

    this.state.tabloValues.push(value)
    this.setState({ tabloValues: this.state.tabloValues })
  }

  calc() {
    let result

    try {
      result = eval(this.state.tabloValues.join(''))
    } catch (e) {
      result = 'Error'
    }

    this.setState({ tabloValues: [result] })
  }

  render() {
    return (
      <div className="calculator">
        <Tablo tabloValues={this.state.tabloValues} />
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
