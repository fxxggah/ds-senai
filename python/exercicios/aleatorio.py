import random

continuar = 1

while continuar:
    print("Resultado: ", random.randint(1, 6))
    print()
    continuar = int(input("Deseja rodar o dado novamente? [1 = SIM / 2 = NAO]"))

