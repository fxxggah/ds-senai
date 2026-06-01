import pandas as pd
import matplotlib.pyplot as plt

dados = pd.read_csv('Horas de Estudos.csv')

plt.figure(figsize=(8, 6))
plt.scatter(dados['Horas de Estudo'], dados['Nota do Exame'], alpha=0.8)
plt.title('Relação Entre Horas de Estudos e Notas de Exame')
plt.xlabel('Horas de Estudo')
plt.ylabel('Notas de Exame')
plt.grid(True)
plt.show()