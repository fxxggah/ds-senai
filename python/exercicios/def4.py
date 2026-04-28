def somaImposto(taxaImposto, custo):
    custo_atualizado = custo + (custo * taxaImposto / 100)
    return custo_atualizado

taxa = float(input("Digite a taxa de imposto (em %): "))
valor_item = float(input("Digite o custo do item: "))

valor_item = somaImposto(taxa, valor_item)

print(f"O valor final do item com imposto é: R$ {valor_item:.2f}")
