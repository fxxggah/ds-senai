import os
import pandas as pd
import matplotlib
import matplotlib.pyplot as plt
from flask import Flask, render_template, request, redirect, url_for

matplotlib.use('Agg')

app = Flask(__name__)
ARQUIVO = 'produtos.xlsx'

if not os.path.exists(ARQUIVO):
    df = pd.DataFrame(columns=['Nome', 'Categoria', 'Quantidade', 'Preço Unitário'])
    df.to_excel(ARQUIVO, index=False)

def atualizar_grafico():
    df = pd.read_excel(ARQUIVO)
    
    os.makedirs('static/img', exist_ok=True)
    caminho_grafico = 'static/img/grafico.png'
    
    if df.empty:
        if os.path.exists(caminho_grafico):
            os.remove(caminho_grafico)
        return False

    plt.clf()
    fig, ax = plt.subplots(figsize=(10, 4))
    
    ax.bar(df['Nome'], df['Quantidade'], color='#0d6efd', edgecolor='black')
    ax.set_title('Quantidade de Produtos em Estoque', fontsize=12, fontweight='bold')
    ax.set_ylabel('Unidades em Estoque')
    plt.xticks(rotation=30, ha='right')
    plt.tight_layout()
    
    plt.savefig(caminho_grafico)
    plt.close()
    return True

@app.route('/')
def index():
    df = pd.read_excel(ARQUIVO)
    
    lista_produtos = df.to_dict(orient='records')
    
    tem_grafico = atualizar_grafico()

    return render_template('index.html', produtos=lista_produtos, tem_grafico=tem_grafico)

@app.route('/cadastrar', methods=['POST'])
def cadastrar():

    nome = request.form.get('nome')
    categoria = request.form.get('categoria')
    qtd = request.form.get('quantidade')
    preco = request.form.get('preco')
    
    if nome and categoria and qtd and preco:
        df = pd.read_excel(ARQUIVO)
        
        novo_registro = {
            'Nome': nome, 
            'Categoria': categoria, 
            'Quantidade': int(qtd), 
            'Preço Unitário': float(preco)
        }
        
        df = pd.concat([df, pd.DataFrame([novo_registro])], ignore_index=True)
        df.to_excel(ARQUIVO, index=False)
        
    return redirect(url_for('index'))

@app.route('/excluir/<nome>')
def excluir(nome):
    df = pd.read_excel(ARQUIVO)

    df = df[df['Nome'].str.lower() != nome.lower()]
    df.to_excel(ARQUIVO, index=False)
    
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)