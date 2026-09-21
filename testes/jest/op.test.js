const { sum, sub, mul, div, por, mod } = require('./op')

// SOMA
test('adds 50 + 50 to equal 100', () => {
  expect(sum(50, 50)).toBe(100)
});


// SUBTRAÇÃO
test('substracts 100 - 0 to equal 100', () => {
  expect(sub(100, 0)).toBe(100)
});

// MULTIPLICAÇÃO
test('multiplies 50 * 2 to equal 100', () => {
  expect(mul(50, 2)).toBe(100)
});

// DIVISÃO
test('divides 200 / 2 to equal 100', () => {
  expect(div(200, 2)).toBe(100)
});

test('throws an error when dividing by 0', () => { 
  expect(() => div(1, 0)).toThrow()
});

// PORCENTAGEM
test('calculates 20% of 100 to equal 20', () => {
  expect(por(100, 20)).toBe(20)
});

// MODULO
test('returns the remainder of 100 divided by 2 to equal 0', () => {
  expect(mod(100, 2)).toBe(0)
});