def contar_digitos(n):
    return len(str(abs(n)))

numero = int(input("Digite um número inteiro: "))
resultado = contar_digitos(numero)

print(f"O número {numero} tem {resultado} dígito(s).")
