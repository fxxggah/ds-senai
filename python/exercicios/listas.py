nome = input("Digite o seu nome: ")
idade = int(input("\nDigite a sua idade: "))
altura = float(input("\nDigite a sua altura em Cm: "))
peso = float(input("\nDigite o seu peso em Kg: "))
op = int(input("Estado Civil: \n 1 - Casado\n 2 - Solteiro\n -> "))

if op == 1:
    estadoCivil = "Casado"
else:
    estadoCivil = "Solteiro"

eu = [nome, idade, altura, peso, estadoCivil]
print("NOME: ", eu[0])
print("IDADE: ", eu[1], " Anos")
print("ALTURA: ", eu[2], "cm")
print("PESO: ", eu[3], " Kg")
print("ESTADO CIVIL: ", eu[4])