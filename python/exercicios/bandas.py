bandas = []

while True:
    op = int(input("\n1 - Adicionar bandas"
    "\n 2 - Exibir bandas"
    "\n 3 - Tamanho da lista"
    "\n 4 - Mudar banda da lista"
    "\n 4 - Deletar banda da lista"
    "\n-> "))

    if (op == 1):
        banda = input("Digite o nome da banda: ")
        bandas.append(banda)
    if (op == 2):
        print(bandas)
    if (op == 3):
        print("Sua lista tem ", len(bandas), " bandas")
    if (op == 4):
        id = int(input("Qual a posicao da banda na lista: ")) - 1
        if id < len(bandas):
            update = input("Digite o novo nome da banda: ")
            bandas[id] = update
            print("Banda atualizada com sucesso!")
        else:
            print("Posição inválida!")