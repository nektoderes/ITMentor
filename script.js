'use strict';

// DOM‑элементы
const outputEl = document.getElementById('output');
const btns = document.querySelectorAll('.body-calculator button');

// Состояние
let currentInput = '';
let firstOperand = null;
let operator = null;
let justCalculated = false;

// Обновление экрана
const updateDisplay = (text) => {
  if (justCalculated) {
    outputEl.textContent = `${firstOperand} ${operator} ${currentInput} = ${text}`;
  } else if (operator !== null) {
      outputEl.textContent = `${firstOperand} ${operator} ${currentInput}`;
    } else if (firstOperand === null) {
        outputEl.textContent = text;
      }
}

// Полный сброс
const clearAll = () => {
  currentInput   = '';
  firstOperand   = null;
  operator       = null;
  justCalculated = false;
  updateDisplay('0');
}

// Ввод цифры или точки
const inputDigit = (digit) => {
  if (justCalculated) {
    clearAll();
  }
  
  if (digit === '.' && currentInput.includes('.')) {
    return;
  }
  
  currentInput += digit;
  updateDisplay(currentInput);
}

// Обработка оператора
const handleOperator = (nextOp) => {
  if (justCalculated) {
    justCalculated = false;
  }
  
  if (firstOperand === null && currentInput !== '') {
    firstOperand = parseFloat(currentInput);
  }
  else if (operator !== null && currentInput !== '') {
    const result = performCalculation();
    firstOperand = result;
    updateDisplay(result);
  }

  operator = nextOp;
  currentInput = '';
  updateDisplay(firstOperand);
}

// Функция вычисления
const performCalculation = () => {
  const secondOperand = parseFloat(currentInput);
  if (isNaN(secondOperand) || operator === null) {
    return firstOperand;
  }
  switch (operator) {
    case '+': return firstOperand + secondOperand;
    case '-': return firstOperand - secondOperand;
    case '×': return firstOperand * secondOperand;
    case '÷':
      if (secondOperand === 0) {
        justCalculated = true;
        alert('Деление на ноль!');
        return firstOperand;
      }
      return firstOperand / secondOperand;
    default:
      return secondOperand;
  }
}

// Нажатие "="
const handleEquals = () => {
  if (operator === null || currentInput === '') {
    return;
  }
  const result = performCalculation();
  justCalculated = true;
  updateDisplay(result);
  
  firstOperand = result;
  operator = null;
  currentInput = '';
}

// Делегатор кликов по кнопкам
const handleButtonClick = (e) => {
  const val = e.target.textContent.trim();

  if (/\d/.test(val) || val === '.') {
    inputDigit(val);
  } else if (val === 'C') {
    clearAll();
  } else if (val === '=') {
    handleEquals();
  } else if (['+', '-', '×', '÷'].includes(val)) {
    handleOperator(val);
  }
}

// Обработчик клавиатуры
const handleKeyDown = (e) => {
  const key = e.key;
  if (/\d/.test(key) || key === '.') {
    e.preventDefault();
    inputDigit(key);
  } else if (key === 'Enter' || key === '=') {
    e.preventDefault();
    handleEquals();
  } else if (key === 'Escape' || key === 'c' || key === 'C') {
    e.preventDefault();
    clearAll();
  } else if (['+', '-', '*', '/'].includes(key)) {
    e.preventDefault();
    const mapOp = { '*': '×', '/': '÷' };
    handleOperator(mapOp[key] || key);
  }
}

// Привязка событий
btns.forEach(btn => btn.addEventListener('click', handleButtonClick));
document.addEventListener('keydown', handleKeyDown);


// Инициализация
clearAll();