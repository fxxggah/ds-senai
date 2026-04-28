import calculadora

while True:
    print("1 - SOMA")
    print("2 - SUBTRACAO")
    print("3 - MULTIPLICACAO")
    print("4 - DIVISAO")

    op = int(input("Qual opecarao deseja realizar? -> "))
    x = float(input("Digite o primeiro valor: "))
    y = float(input("Digite o segundo valor: "))

    if op == 1:
        print("Soma: ", calculadora.soma(x, y))
        print()
    elif op == 2:
        print("Subtracao: ", calculadora.subtracao(x, y))
        print()
    elif op == 3:
        print("Multiplicacao: ", calculadora.multiplicacao(x, y))
        print()
    elif op == 4:
        print("Divisao: ", calculadora.divisao(x, y))
        print()
    else:
        print("Opcao invalida! Tente novamente...")
        print()