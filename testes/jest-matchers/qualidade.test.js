const {
    lerTemperatura,
    calcularPressaoMedia,
    processarSinal 
} = require('./qualidade')

describe('Bateria de testes com Matchers', () => {

    test('Deve retornar undefined quando o sensor estiver desligado', () => {
        const leitura = lerTemperatura(false)
        expect(leitura).toBeUndefined()
    })

    test('Validar limites de segurança de temperatura', () => {
        const temp = lerTemperatura(true)
        expect(temp).toBeGreaterThan(70)
        expect(temp).toBeLessThan(80)
        expect(temp).toBeLessThanOrEqual(75.4)
    })

    test('Calcular a pressão se o valor está aproximado', () => {
        const pressao = calcularPressaoMedia()
        expect(pressao).toBeCloseTo(0.15)
    })

    test('Testar número válido', () => {
        const resultado = processarSinal('Entrada_Inválida')
        expect(resultado).toBeNaN()
    })

})

