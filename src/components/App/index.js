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
  }

  clear() {
    this.setState({ tabloValues: [] })
  }

  delete() {
    this.state.tabloValues.pop()
    this.setState({ tabloValues: this.state.tabloValues })
  }

  display(e) {
    this.state.tabloValues.push(e.target.innerText)
    this.setState({ tabloValues: this.state.tabloValues })
  }

  render() {
    return (
      <div className="calculator">
        <Tablo tabloValues={this.state.tabloValues} />
        <div className="buttons">
          <div className="buttons-line">
            <Button title="C" onClick={this.clear} />
            <Button title="±" onClick={this.display} />
            <Button title="÷" onClick={this.display} />
            <Button title="DEL" onClick={this.delete} />
          </div>
          <div className="buttons-line">
            <Button title="7" onClick={this.display} />
            <Button title="8" onClick={this.display} />
            <Button title="9" onClick={this.display} />
            <Button title="-" onClick={this.display} />
          </div>
          <div className="buttons-line">
            <Button title="4" onClick={this.display} />
            <Button title="5" onClick={this.display} />
            <Button title="6" onClick={this.display} />
            <Button title="×" onClick={this.display} />
          </div>
          <div className="buttons-line">
            <Button title="1" onClick={this.display} />
            <Button title="2" onClick={this.display} />
            <Button title="3" onClick={this.display} />
            <Button title="+" onClick={this.display} />
          </div>
          <div className="buttons-line">
            <Button title="0" onClick={this.display} width="200px" />
            <Button title="," onClick={this.display} />
            <Button title="=" onClick={this.display} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
