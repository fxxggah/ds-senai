const {
    validarPeca,
} = require('./peca')

describe('Bateria de testes com Matchers', () => {

    test('Deve retornar Undefined', () => {
        const resultado = validarPeca('', 10)
        expect(resultado).toBeUndefined()
    })

    test('Testar número válido', () => {
        const resultado = validarPeca("texto inválido", 10)
        expect(resultado).toBeNaN()
    })

    test('Validar limites de peso', () => {
        const resultado = validarPeca(10, 10)
        expect(resultado).toBeGreaterThanOrEqual(15)
        expect(resultado).toBeLessThan(16)
        expect(resultado).toBeLessThanOrEqual(15)
    })

    test('Calcular se o valor está aproximado', () => {
        const resultado = validarPeca(2.5, 2.5)
        expect(resultado).toBeCloseTo(3.75)
        expect(Object(resultado)).toBeInstanceOf(Number)
    })

})
