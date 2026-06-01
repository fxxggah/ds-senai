import pandas as pd
import matplotlib.pyplot as plt

dados = pd.read_excel('Receita de Vendas.xlsx')

plt.figure(figsize=(8, 4))
plt.plot(dados['Ano'], dados['Receitas'], marker='o')
plt.xticks(dados['Ano'])
plt.title('Receita ao longo dos anos')
plt.ylabel('Receita (Reais - R$)')
plt.show()

plt.figure(figsize=(8, 4))
plt.bar(dados['Ano'], dados['Receitas'])
plt.title('Receita por Ano')
plt.xlabel('Ano')
plt.ylabel('Receita (Reais - R$)')
plt.show()

plt.figure(figsize=(6, 6))
plt.pie(dados['Receitas'], labels = dados['Ano'], autopct='%1.1f%%')
plt.title('Participacao das receitas por ano')
plt.show()