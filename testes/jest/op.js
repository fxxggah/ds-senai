function sum(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function mul(a, b) {
  return a * b;
}

function div(a, b) {
  if (b === 0) {
    throw new Error('Não é permitida divisão por 0')
  }

  return a / b;
}

function por(a, b) {
  return (a * b) / 100;
}

function mod(a, b) {
  return a % b;
}

module.exports = { sum, sub, mul, div, por, mod }