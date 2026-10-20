function validarPeca(peso, tolerancia) {
    if (!peso) return undefined
    if (isNaN(peso)) return NaN

    pesoAjustado = (Number(peso) + Number(tolerancia) / 2)

    return Number(pesoAjustado);
}

module.exports = {
    validarPeca
}