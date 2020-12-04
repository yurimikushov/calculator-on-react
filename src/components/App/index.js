import React from 'react';
import './index.css';
import Screen from './../Screen';
import Button from './../Button';

const MATH_OPERATIONS = {
    ADDITION: '+',
    SUBTRACTION: '-',
    DIVISION: '/',
    MULTIPLICATION: '*',
    OPEN_PARENTHESIS: '(',
    CLOSING_PARENTHESIS: ')',
};
const ERROR_CODE = 'Error';
const EMPTY_CALCULATE_RESULT = '';
const CALCULATOR_OPERATIONS = {
    ADDITION: '+',
    SUBTRACTION: '-',
    DIVISION: '/',
    MULTIPLICATION: '×',
    OPEN_PARENTHESIS: '(',
    CLOSING_PARENTHESIS: ')',
    DELETE: "DEL"
};

class Calculator {
    constructor(initialValue = 0) {
        this.calculatedValue = initialValue;
    }

    calculateValue(inputValueString) {
        this._isNeedToUpdateValue(inputValueString) ? this._updateValue(inputValueString) : this.calculatedValue = EMPTY_CALCULATE_RESULT;
    }

    getValue() {
        return this.calculatedValue;
    }

    _updateValue(inputValueString) {
        try {
            this.calculatedValue = eval(inputValueString.join(EMPTY_CALCULATE_RESULT));
        } catch (e) {
            this.calculatedValue = ERROR_CODE;
        }
    }

    _isNeedToUpdateValue(enteredValueString) {
        const inputLength = enteredValueString.length;
        let lastValue = enteredValueString[inputLength - 1];

        let isOperator = lastValue === MATH_OPERATIONS.OPEN_PARENTHESIS ||
            lastValue === MATH_OPERATIONS.CLOSING_PARENTHESIS ||
            lastValue === MATH_OPERATIONS.DIVISION ||
            lastValue === MATH_OPERATIONS.MULTIPLICATION ||
            lastValue === MATH_OPERATIONS.SUBTRACTION ||
            lastValue === MATH_OPERATIONS.ADDITION;

        return !isOperator && inputLength > 1;
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {result: EMPTY_CALCULATE_RESULT, input: []};
        this.clearValue = this.clearValue.bind(this);
        this.deleteOneSymbol = this.deleteOneSymbol.bind(this);

        this.displayValue = this.displayValue.bind(this);
        this.displayResult = this.displayResult.bind(this);

        this.calculator = new Calculator(EMPTY_CALCULATE_RESULT);
    }

    clearValue() {
        this.setState({result: EMPTY_CALCULATE_RESULT, input: []})
    };

    deleteOneSymbol() {
        this._deleteLastValue();
        this._updateCalculatorResult();
    }

    displayValue(element) {
        this._updateInputValue(element.target.innerText);
        this._updateCalculatorResult();
    }

    displayResult() {
        this.calculator.calculateValue(this._getInput());

        this.setState({
            result: EMPTY_CALCULATE_RESULT,
            input: [this.calculator.getValue()],
        });
    }

    render() {
        //Duplicate code
        return (
            <div className="calculator">
                <Screen result={this._getResult()} input={this._getInput().join(EMPTY_CALCULATE_RESULT)}/>
                <div className="buttons">
                    <div className="buttons-line">
                        <Button title="C" onClick={this.clearValue} isTopOperators={true}/>
                        <Button title="(" onClick={this.displayValue} isTopOperators={true}/>
                        <Button title=")" onClick={this.displayValue} isTopOperators={true}/>
                        <Button title={CALCULATOR_OPERATIONS.DELETE} onClick={this.deleteOneSymbol}
                                isTopOperators={true}/>
                    </div>
                    <div className="buttons-line">
                        <Button title="7" onClick={this.displayValue} isNumber={true}/>
                        <Button title="8" onClick={this.displayValue} isNumber={true}/>
                        <Button title="9" onClick={this.displayValue} isNumber={true}/>
                        <Button title={CALCULATOR_OPERATIONS.DIVISION} onClick={this.displayValue}
                                isRightSideOperators={true}/>
                    </div>
                    <div className="buttons-line">
                        <Button title="4" onClick={this.displayValue} isNumber={true}/>
                        <Button title="5" onClick={this.displayValue} isNumber={true}/>
                        <Button title="6" onClick={this.displayValue} isNumber={true}/>
                        <Button title={CALCULATOR_OPERATIONS.SUBTRACTION} onClick={this.displayValue}
                                isRightSideOperators={true}/>
                    </div>
                    <div className="buttons-line">
                        <Button title="1" onClick={this.displayValue} isNumber={true}/>
                        <Button title="2" onClick={this.displayValue} isNumber={true}/>
                        <Button title="3" onClick={this.displayValue} isNumber={true}/>
                        <Button title={CALCULATOR_OPERATIONS.MULTIPLICATION} onClick={this.displayValue}
                                isRightSideOperators={true}/>
                    </div>
                    <div className="buttons-line">
                        <Button title="0" onClick={this.displayValue} isNumber={true}/>
                        <Button title="." onClick={this.displayValue} isNumber={true}/>
                        <Button title="=" onClick={this.displayResult} isNumber={true}/>
                        <Button title={CALCULATOR_OPERATIONS.ADDITION} onClick={this.displayValue}
                                isRightSideOperators={true}/>
                    </div>
                </div>
            </div>
        )
    }

    _getResult() {
        return this.state.result;
    }

    _deleteLastValue() {
        let input = this._getInput();
        input.pop();
        this.setState({input: input});
    }

    _updateInputValue(inputValue) {
        if (inputValue === CALCULATOR_OPERATIONS.MULTIPLICATION) {
            inputValue = MATH_OPERATIONS.MULTIPLICATION
        } else if (inputValue === CALCULATOR_OPERATIONS.DIVISION) {
            inputValue = MATH_OPERATIONS.DIVISION;
        }

        let input = this._getInput();

        if (input[0] === ERROR_CODE) {
            input = [];
        }

        input.push(inputValue);

        this.setState({input: input});
    }

    _updateCalculatorResult() {
        this.calculator.calculateValue(this._getInput());

        this.setState({input: this._getInput(), result: this.calculator.getValue()})
    }

    _getInput() {
        return this.state.input;
    }
}

export default App;