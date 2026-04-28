import random

lista = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
soma = 0

for i in range(len(lista)):
    lista[i] = random.randint(1, 100)

lista.sort()
print()

for i in lista:
    print(i)

print()

for i in lista:
    soma = soma + i
    print("SOMANDO TUDO: ", soma)

for i in lista:
    lista[i]=lista[i]*2


print("\nLISTA COMPLETA: ", lista, "\n")
