# Módulos do Flask (Python para Web).
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

# Módulo de conexão com o MySQL (Banco de Dados).
import mysql.connector

# Módulo de interação com pastas e arquivos.
import os
from dotenv import load_dotenv

# Carrega o módulo que captura as variáveis de ambiente.
load_dotenv()

# Inicia a aplicação da web apontando as pastas de templates e estáticos
app = Flask(__name__, template_folder="templates", static_folder="static")

# Permite que o front-end requisite recursos do back-end.
CORS(app)

# Função de conexão com o banco de dados.
def database_connection():
    return mysql.connector.connect(
        host = os.getenv("DB_HOST"),
        user = os.getenv("DB_USER"),
        password = os.getenv("DB_PASSWORD"),
        database = os.getenv("DB_NAME")
    )

# -------------------------  
# ROTA PRINCIPAL - Renderiza a página HTML da quitanda
@app.route("/")
def index():
    return render_template("index.html")

# -------------------------  
# POST - Rota para cadastrar um produto.
@app.route("/api/produtos", methods=["POST"])
def criar_produto():
    dados = request.json
    valores = (
        dados["nome"],
        dados["marca"],
        dados["preco"],
        dados["quantidade"]
    )

    link = database_connection()
    cursor = link.cursor()
    
    sql = """
        INSERT INTO produtos (nome, marca, preco, quantidade)
        VALUES (%s, %s, %s, %s);
    """
    
    cursor.execute(sql, valores)
    link.commit()
    
    cursor.close()
    link.close()
    
    return jsonify({"mensagem": "Produto cadastrado com sucesso!"}), 201

# -------------------------  
# GET - Rota para listar produtos cadastrados.
@app.route("/api/produtos", methods=["GET"])
def listar_produtos():
    link = database_connection()
    cursor = link.cursor(dictionary=True)
    
    sql = "SELECT * FROM produtos;"
    
    cursor.execute(sql)
    produtos = cursor.fetchall()
    
    cursor.close()
    link.close()
    
    return jsonify(produtos), 200

# -------------------------  
# PUT - Rota para alterar um produto.
@app.route("/api/produtos/<int:id>", methods=["PUT"])
def atualizar_produto(id):
    dados = request.json
    valores = (
        dados["nome"],
        dados["marca"],
        dados["preco"],
        dados["quantidade"],
        id
    )
    
    link = database_connection()
    cursor = link.cursor()
    
    sql = """
        UPDATE produtos
        SET nome = %s,
            marca = %s,
            preco = %s,
            quantidade = %s
        WHERE id = %s;
    """
    
    cursor.execute(sql, valores)
    link.commit()
    
    if cursor.rowcount == 0:
        cursor.close()
        link.close()
        return jsonify({"mensagem": "Produto não encontrado..."}), 404
    else:
        cursor.close()
        link.close()
        return jsonify({"mensagem": "Produto alteredo com sucesso!"}), 200

# -------------------------  
# DELETE - Rota para deletar um produto.
@app.route("/api/produtos/<int:id>", methods=["DELETE"])
def deletar_produto(id):
    link = database_connection()
    cursor = link.cursor()
    
    sql = "DELETE FROM produtos WHERE id = %s;"
    
    cursor.execute(sql, (id,))
    link.commit()
    
    if cursor.rowcount == 0:
        cursor.close()
        link.close()
        return jsonify({"mensagem": "Produto não encontrado..."}), 404
    else:
        cursor.close()
        link.close()
        return jsonify({"mensagem": "Produto excluído com sucesso!"}), 200

# Executa a aplicação da web.
if __name__ == "__main__":
    app.run(debug=True)