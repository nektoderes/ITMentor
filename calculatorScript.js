'use strict'

const outputEl = document.getElementById('output')
const btns = document.querySelectorAll('.body-calculator button')

let currentInput = ''
let firstOperand = null
let secondOperand = null
let operator = null
let result = null
let justCalculated = false

// Обновление дисплея
const updateDisplay = (valueFirstOperand, valueOperator = null, valueSecondOperand = null) => {
    if (firstOperand === null) {
        outputEl.textContent = `${valueFirstOperand}`
    } else if (operator !== null) {
        outputEl.textContent = `${valueFirstOperand} ${valueOperator} ${valueSecondOperand}`
    }
}

// Сброс калькулятора
const clearAll = () => {
    currentInput = ''
    firstOperand = null
    secondOperand = null
    operator = null
    result = null
    justCalculated = false
    updateDisplay('0')
}

// Обработчик точки и цифр
const inputDigit = (digit) => {
    // При вводе новых чисел результат сбрасывается
    if (justCalculated) {
        justCalculated = false
    }

    // Если вводится . и она уже есть в currentInput то ничего не делаем
    if (digit === '.' && currentInput.includes('.')) return

    currentInput += digit
    if (firstOperand === null) {
        updateDisplay(currentInput)
    }
}

// Установка оператора
const handleOperator = (nextOp) => {
    // Если пользователь хочет дальше работать с результатом и ставит оператор
    // то результат записывается в firstOperand, а всё остальное сбрасывается
    if (result !== null) {
        clearAll()
        firstOperand = result
    }

    if (currentInput === '') return
    
    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput)
    }
    
    if (firstOperand !== null) {
        operator = nextOp
    }

    currentInput = ''
    operator = nextOp
    updateDisplay(firstOperand, operator)
}

// Обрабочик операторов
const switchOp = () => {
    switch(operator) {
        case '+': return result = firstOperand + secondOperand
        case '-': return result = firstOperand - secondOperand
        case '×': return result = firstOperand * secondOperand
        case '÷': {
            if (secondOperand === 0) {
                return updateDisplay('Деление на 0')
            } else return result = firstOperand / secondOperand
        }
    }
}

// Нажать =
const handleEquals = () => {
    if (firstOperand !== null && operator !== null) {
        secondOperand = parseFloat(currentInput)
        switchOp()
        updateDisplay(result)
    }
}

// Обработчик нажатий
const handleButtonClick = (e) => {
    const val = e.target.textContent.trim()

    if (/\d/.test(val) || val === '.') {
        inputDigit(val)
    } else if (val === 'C') {
        clearAll()
    } else if (val === '=') {
        handleEquals()
    } else if (['+', '-', '×', '÷'].includes(val)) {
        handleOperator(val)
    }
}

clearAll()