document.addEventListener('DOMContentLoaded', function() {
    const previousOperandElement = document.querySelector('.previous-operand');
    const currentOperandElement = document.querySelector('.current-operand');
    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.operator');
    const equalsButton = document.querySelector('.equals');
    const clearButton = document.querySelector('.clear');
    const deleteButton = document.querySelector('.delete');
    const decimalButton = document.querySelector('.decimal');
    const historyList = document.querySelector('.history-list');
    const clearHistoryButton = document.querySelector('.clear-history');

    let currentOperand = '0';
    let previousOperand = '';
    let operation = undefined;
    let shouldResetScreen = false;

    // Load history from localStorage
    let calculationHistory = JSON.parse(localStorage.getItem('calculatorHistory')) || [];
    updateHistoryDisplay();

    numberButtons.forEach(button => {
        button.addEventListener('click', () => appendNumber(button.innerText));
    });

    operatorButtons.forEach(button => {
        button.addEventListener('click', () => setOperation(button.innerText));
    });

    equalsButton.addEventListener('click', calculate);
    clearButton.addEventListener('click', clear);
    deleteButton.addEventListener('click', deleteNumber);
    decimalButton.addEventListener('click', appendDecimal);

    clearHistoryButton.addEventListener('click', () => {
        calculationHistory = [];
        localStorage.setItem('calculatorHistory', JSON.stringify(calculationHistory));
        updateHistoryDisplay();
    });

    function appendNumber(number) {
        if (currentOperand === '0' || shouldResetScreen) {
            currentOperand = number;
            shouldResetScreen = false;
        } else {
            currentOperand += number;
        }
        updateDisplay();
    }

    function appendDecimal() {
        if (shouldResetScreen) {
            currentOperand = '0';
            shouldResetScreen = false;
        }
        if (!currentOperand.includes('.')) {
            currentOperand += '.';
        }
        updateDisplay();
    }

    function setOperation(operator) {
        if (operation !== undefined) {
            calculate();
        }
        operation = operator;
        previousOperand = currentOperand;
        shouldResetScreen = true;
        updateDisplay();
    }

    function calculate() {
        if (operation === undefined || shouldResetScreen) return;

        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        let result;

        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert('Cannot divide by zero');
                    clear();
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }

        // Add to history
        const calculation = {
            expression: `${previousOperand} ${operation} ${currentOperand}`,
            result: result.toString(),
            timestamp: new Date().toLocaleString()
        };
        calculationHistory.unshift(calculation);
        if (calculationHistory.length > 10) {
            calculationHistory.pop();
        }
        localStorage.setItem('calculatorHistory', JSON.stringify(calculationHistory));
        updateHistoryDisplay();

        currentOperand = roundResult(result);
        operation = undefined;
        previousOperand = '';
        shouldResetScreen = true;
        updateDisplay();
    }

    function roundResult(number) {
        return Math.round(number * 1000000) / 1000000;
    }

    function clear() {
        currentOperand = '0';
        previousOperand = '';
        operation = undefined;
        shouldResetScreen = false;
        updateDisplay();
    }

    function deleteNumber() {
        if (shouldResetScreen) return;
        currentOperand = currentOperand.toString().slice(0, -1);
        if (currentOperand === '') {
            currentOperand = '0';
        }
        updateDisplay();
    }

    function updateDisplay() {
        currentOperandElement.textContent = formatNumber(currentOperand);
        if (operation !== undefined) {
            previousOperandElement.textContent = `${formatNumber(previousOperand)} ${operation}`;
        } else {
            previousOperandElement.textContent = '';
        }
    }

    function formatNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = '0';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    function updateHistoryDisplay() {
        historyList.innerHTML = calculationHistory.map(calc => `
            <div class="history-item">
                <div class="history-expression">${calc.expression}</div>
                <div class="history-result">= ${calc.result}</div>
                <small>${calc.timestamp}</small>
            </div>
        `).join('');
    }

    // Keyboard support
    document.addEventListener('keydown', function(event) {
        if (event.key >= '0' && event.key <= '9') {
            appendNumber(event.key);
        } else if (event.key === '.') {
            appendDecimal();
        } else if (event.key === '+' || event.key === '-') {
            setOperation(event.key);
        } else if (event.key === '*') {
            setOperation('×');
        } else if (event.key === '/') {
            event.preventDefault();
            setOperation('÷');
        } else if (event.key === 'Enter' || event.key === '=') {
            calculate();
        } else if (event.key === 'Backspace') {
            deleteNumber();
        } else if (event.key === 'Escape') {
            clear();
        }
    });
});