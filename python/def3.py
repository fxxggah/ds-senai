def encontrar_maior(a, b, c):
    return max(a, b, c)

def encontrar_menor(a, b, c):
    return min(a, b, c)

n1 = float(input("Digite o primeiro número: "))
n2 = float(input("Digite o segundo número: "))
n3 = float(input("Digite o terceiro número: "))

print(f"O maior número é: {encontrar_maior(n1, n2, n3)}")
print(f"O menor número é: {encontrar_menor(n1, n2, n3)}")
