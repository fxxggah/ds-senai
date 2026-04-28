def somar(a, b, c):
    soma = a+b+c
    return soma

def mediar(a, b ,c):
    media = somar(a,b,c)/3
    return media

soma = somar(1, 2, 3)
media = mediar(1, 2, 3)

print("A soma é: ", soma)
print("A média é: ", media)