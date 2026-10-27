def somar(a, b):
    return a + b

def subtrair(a, b):
    return a - b

def multiplicar(a, b):
    return a * b

def dividir(a, b):
    if b == 0:
        raise ValueError("Não é possível dividir por zero.")
    return a / b

def porcentagem(valor, percentual):
    return (valor * percentual) / 100

def eh_par(numero):
    return numero % 2 == 0
    