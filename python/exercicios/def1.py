def celsius_para_fahrenheit(c):
    return (c * 9/5) + 32

def fahrenheit_para_celsius(f):
    return (f - 32) * 5/9

def menu():
    print("--- Conversor de Temperatura ---")
    print("1. Celsius para Fahrenheit")
    print("2. Fahrenheit para Celsius")
    opcao = input("Escolha uma opção (1 ou 2): ")

    if opcao == '1':
        c = float(input("Digite a temperatura em Celsius: "))
        print(f"{c}°C é igual a {celsius_para_fahrenheit(c):.2f}°F")
    elif opcao == '2':
        f = float(input("Digite a temperatura em Fahrenheit: "))
        print(f"{f}°F é igual a {fahrenheit_para_celsius(f):.2f}°C")
    else:
        print("Opção inválida.")

menu()
