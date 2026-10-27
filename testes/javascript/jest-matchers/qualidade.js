function lerTemperatura(sensorAtivo) {
    if (!sensorAtivo) return undefined
    return 75.4
}

function calcularPressaoMedia() {
    return (0.1 + 0.2) / 2
}

function processarSinal(entrada) {
    return Number(entrada);
}

module.exports = {
    lerTemperatura,
    calcularPressaoMedia,
    processarSinal 
}