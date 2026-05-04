# Importação de bibliotecas.
from flask import Flask
from flask import render_template
from flask import request
from flask import redirect
from flask import url_for
import resources.database_connection as database_connection

# Configuração do Flask.
app = Flask(__name__)

# Chave secreta de proteção contra CSRF (Cross-Site Request Forgery).
app.config['SECRET_KEY'] = 'Senai@791'

# Rota para o INDEX do website.
@app.route('/')
def inicio ():

    return render_template('index.html')

# Rota para o CADASTRAR produto do website.
@app.route('/cadastrar-produto', methods=['GET', 'POST'])
def cadastrar_produto ():

    # Verifica se o método da requisição é o POST.
    if (request.method == 'POST'):

        # Recebe os dados do formulário via POST.
        nome = request.form['nome']
        dono = request.form['dono']
        categoria = request.form['categoria']

        # Faz a conexão com o banco de dados.
        connection = database_connection.open_connection()
        cursor = connection.cursor()

        # Monta a instrução SQL e insere os dados no banco de dados.
        SQL = "INSERT INTO produtos (nome, dono, categoria) VALUES (%s, %s, %s);"
        values = (nome, dono, categoria)
        cursor.execute(SQL, values)
        connection.commit()

        # Fecha a conexão com o banco de dados.
        cursor.close()
        connection.close()

        # Redireciona para a tela de produtos novamente.
        return redirect(url_for('listar_produto'))
    else:

        # Redireciona para a página de cadastro de produto.
        return render_template('cadastrar-produto.html')
    
# Rota para o LISTAR produto do website.
@app.route('/listar-produto')
def listar_produto():

    # Faz a conexão com o banco de dados.
    connection = database_connection.open_connection()
    cursor = connection.cursor()

    # Monta a instrução SQL de seleção dos produtos.
    SQL = "SELECT id, nome, dono, categoria FROM produtos WHERE ativo = 1;"

    # Executa a consulta SQL.
    cursor.execute(SQL)

    # Cria um vetor com os resultados da consulta.
    produtos = cursor.fetchall()

    # Fecha a conexão com o banco de dados.
    cursor.close()
    connection.close()

    # Retorna a página HTML com os dados dos produtos.
    return render_template('listar-produto.html', produtos=produtos)

# Rota para o EXCLUIR produto do website.
@app.route('/excluir-produto/<id>')
def excluir_produto (id):

    # Faz a conexão com o banco de dados.
    connection = database_connection.open_connection()
    cursor = connection.cursor()

    # Monta a instrução SQL para excluir logicamente o produto.
    SQL = "UPDATE produtos SET ativo = 0 WHERE id = %s;"
    cursor.execute(SQL, (id,))
    connection.commit()

    # Fecha a conexão com o banco de dados.
    cursor.close()
    connection.close()

    # Redireciona para a tela de listagem de produtos.
    return redirect(url_for('listar_produto'))

# Rota para o EDITAR produto do website.
@app.route('/editar-produto', methods=['POST'])
@app.route('/editar-produto/<id>', methods=['GET'])
def editar_produto (id=None):

    # Verifica se o método de requisição é POST ou GET.
    if (request.method == 'POST'):

        # Recebe os dados do formulário via POST.
        id = request.form['id']
        nome = request.form['nome']
        dono = request.form['dono']
        categoria = request.form['categoria']

        # Faz a conexão com o banco de dados.
        connection = database_connection.open_connection()
        cursor = connection.cursor()

        # Monta a instrução SQL para atualização dos dados do produto.
        SQL = "UPDATE produtos SET nome = %s, dono = %s, categoria = %s WHERE id = %s;"
        values = (nome, dono, categoria, id)
        cursor.execute(SQL, values)
        connection.commit()

        # Fecha a conexão com o banco de dados.
        cursor.close()
        connection.close()

        # Redireciona para a tela de produtos novamente.
        return redirect(url_for('listar_produto'))
    
    else:

        # Faz a conexão com o banco de dados.
        connection = database_connection.open_connection()
        cursor = connection.cursor()

        # Monta a instrução SQL para trazer os dados do produto.
        SQL = "SELECT id, nome, dono, categoria FROM produtos WHERE id = %s;"
        cursor.execute(SQL, (id,))
        produto = cursor.fetchone()

        # Fecha a conexão com o banco de dados.
        cursor.close()
        connection.close()

        # Redireciona para a tela de edição do produto.
        return render_template('editar-produto.html', produto=produto)

# Rota para o CADASTRAR cliente do website.
@app.route('/cadastrar-cliente', methods=['GET', 'POST'])
def cadastrar_cliente ():

    # Verifica se o método da requisição é o POST.
    if (request.method == 'POST'):

        # Recebe os dados do formulário via POST.
        cpf = request.form['cpf']
        nome = request.form['nome']
        endereco = request.form['endereco']
        telefone = request.form['telefone']
        email = request.form['email']

        # Faz a conexão com o banco de dados.
        connection = database_connection.open_connection()
        cursor = connection.cursor()

        # Monta a instrução SQL e insere os dados no banco de dados.
        SQL = "INSERT INTO clientes (cpf, nome, endereco, telefone, email) VALUES (%s, %s, %s, %s, %s);"
        values = (cpf, nome, endereco, telefone, email)
        cursor.execute(SQL, values)
        connection.commit()

        # Fecha a conexão com o banco de dados.
        cursor.close()
        connection.close()

        # Redireciona para a tela de clientes novamente.
        return redirect(url_for('listar_cliente'))
    else:
         
        # Redireciona para a página de cadastro de cliente.
        return render_template('cadastrar-cliente.html')

# Rota para o LISTAR cliente do website.
@app.route('/listar-cliente')
def listar_cliente():

    # Faz a conexão com o banco de dados.
    connection = database_connection.open_connection()
    cursor = connection.cursor()

    # Monta a instrução SQL de seleção dos clientes.
    SQL = "SELECT cpf, nome, email FROM clientes WHERE ativo = 1;"

    # Executa a consulta SQL.
    cursor.execute(SQL)

    # Cria um vetor com os resultados da consulta.
    clientes = cursor.fetchall()

    # Fecha a conexão com o banco de dados.
    cursor.close()
    connection.close()

    # Retorna a página HTML com os dados dos clientes.
    return render_template('listar-cliente.html', clientes=clientes)

# Rota para o EXCLUIR cliente do website.
@app.route('/excluir-cliente/<cpf>')
def excluir_cliente (cpf):

    # Faz a conexão com o banco de dados.
    connection = database_connection.open_connection()
    cursor = connection.cursor()

    # Monta a instrução SQL para excluir logicamente o cliente.
    SQL = "UPDATE clientes SET ativo = 0 WHERE cpf = %s;"
    cursor.execute(SQL, (cpf,))
    connection.commit()

    # Fecha a conexão com o banco de dados.
    cursor.close()
    connection.close()

    # Redireciona para a tela de listagem de clientes.
    return redirect(url_for('listar_cliente'))

# Rota para o EDITAR cliente do website.
@app.route('/editar-cliente', methods=['POST'])
@app.route('/editar-cliente/<cpf>', methods=['GET'])
def editar_cliente (cpf=None):

    # Verifica se o método de requisição é POST ou GET.
    if (request.method == 'POST'):

        # Recebe os dados do formulário via POST.
        cpf = request.form['cpf']
        nome = request.form['nome']
        endereco = request.form['endereco']
        telefone = request.form['telefone']
        email = request.form['email']

        # Faz a conexão com o banco de dados.
        connection = database_connection.open_connection()
        cursor = connection.cursor()

        # Monta a instrução SQL para atualização dos dados do cliente.
        SQL = "UPDATE clientes SET nome = %s, endereco = %s, telefone = %s, email = %s WHERE cpf = %s;"
        values = (nome, endereco, telefone, email, cpf)
        cursor.execute(SQL, values)
        connection.commit()

        # Fecha a conexão com o banco de dados.
        cursor.close()
        connection.close()

        # Redireciona para a tela de clientes novamente.
        return redirect(url_for('listar_cliente'))
    
    else:

        # Faz a conexão com o banco de dados.
        connection = database_connection.open_connection()
        cursor = connection.cursor()

        # Monta a instrução SQL para trazer os dados do cliente.
        SQL = "SELECT cpf, nome, endereco, telefone, email FROM clientes WHERE cpf = %s;"
        cursor.execute(SQL, (cpf,))
        cliente = cursor.fetchone()

        # Fecha a conexão com o banco de dados.
        cursor.close()
        connection.close()

        # Redireciona para a tela de edição do cliente.
        return render_template('editar-cliente.html', cliente=cliente)

# Rota de REALIZAÇÃO DO EMPRÉSTIMO DO produto do website.
@app.route('/realizar-emprestimo', methods=['GET', 'POST'])
def realizar_emprestimo():

    # Verifica se o método da requisição é o POST.
    if (request.method == 'POST'):

        # Recebe os dados do formulário via POST.
        cpf = request.form['cpf']
        id = request.form['id']
        data_emprestimo = request.form['data-emprestimo']
        data_devolucao = request.form['data-devolucao']

        # Faz a conexão com o banco de dados.
        connection = database_connection.open_connection()
        cursor = connection.cursor()

        # Monta a instrução SQL e insere os dados no banco de dados.
        SQL = "INSERT INTO emprestimos (cpf_cliente, id_produto, data_emprestimo, data_devolucao) VALUES (%s, %s, %s, %s);"
        values = (cpf, id, data_emprestimo, data_devolucao)
        cursor.execute(SQL, values)
        connection.commit()

        # Fecha a conexão com o banco de dados.
        cursor.close()
        connection.close()

        # Redireciona para a tela de empréstimos novamente.
        return redirect(url_for('listar_emprestimo'))
    else:

        # Redireciona para a página de realização de empréstimo.
        return render_template('realizar-emprestimo.html')

# Rota para o LISTAR EMPRÉSTIMO DO produto do website.
@app.route('/listar-emprestimo')
def listar_emprestimo ():

    # Faz a conexão com o banco de dados.
    connection = database_connection.open_connection()
    cursor = connection.cursor()

    # Monta a instrução SQL para selecionar os empréstimos.
    SQL = "SELECT id, cpf_cliente, id_produto, data_devolucao FROM emprestimos WHERE ativo = 1;"

    # Executa a consulta SQL.
    cursor.execute(SQL)

    # Obtém os resultados da consulta.
    emprestimos = cursor.fetchall()

    # Fecha a conexão com o banco de dados.
    cursor.close()
    connection.close()

    # Retorna a página HTML com os dados dos empréstimos.
    return render_template('listar-emprestimo.html', emprestimos=emprestimos)

# Rota para o EXCLUIR EMPRÉSTIMO DO produto do website.
@app.route('/excluir-emprestimo/<id>')
def excluir_emprestimo (id):

    #  Faz a conexão com o banco de dados.
    connection = database_connection.open_connection()
    cursor = connection.cursor()

    # Monta a instrução SQL para excluir logicamente o empréstimo.
    SQL = "UPDATE emprestimos SET ativo = 0 WHERE id = %s;"
    cursor.execute(SQL, (id,))
    connection.commit()

    # Fecha a conexão com o banco de dados.]
    cursor.close()
    connection.close()

    # Redireciona para a tela de empréstimos novamente.
    return redirect(url_for('listar_emprestimo'))

# Rota para o EDITAR EMPRÉSTIMO DO produto do website.
@app.route('/editar-emprestimo', methods=['POST'])
@app.route('/editar-emprestimo/<id>', methods=['GET'])
def editar_emprestimo (id=None):

    # Verifica se o método de requisição é POST ou GET.
    if (request.method == 'POST'):

        # Recebe os dados do formulário via POST.
        id = request.form['id']
        cpf = request.form['cpf']
        id = request.form['id']
        data_emprestimo = request.form['data-emprestimo']
        data_devolucao = request.form['data-devolucao']

        # Faz a conexão com o banco de dados.
        connection = database_connection.open_connection()
        cursor = connection.cursor()

        # Monta a instrução SQL para atualização dos dados do empréstimo.
        SQL = "UPDATE emprestimos SET cpf_cliente = %s, id_produto = %s, data_emprestimo = %s, data_devolucao = %s WHERE id = %s;"
        values = (cpf, id, data_emprestimo, data_devolucao, id)
        cursor.execute(SQL, values)
        connection.commit()

        # Fecha a conexão com o banco de dados.
        cursor.close()
        connection.close()

        # Redireciona para a tela de empréstimos novamente.
        return redirect(url_for('listar_emprestimo'))
    
    else:

        # Faz a conexão com o banco de dados.
        connection = database_connection.open_connection()
        cursor = connection.cursor()

        # Monta a instrução SQL para trazer os dados do empréstimo.
        SQL = "SELECT id, cpf_cliente, id_produto, data_emprestimo, data_devolucao FROM emprestimos WHERE id = %s;"
        cursor.execute(SQL, (id,))
        emprestimo = cursor.fetchone()

        # Fecha a conexão com o banco de dados.
        cursor.close()
        connection.close()

        # Redireciona para a tela de edição do empréstimo.
        return render_template('editar-emprestimo.html', emprestimo=emprestimo)

if __name__ == '__main__':
    app.run(debug=True)

print("Flask está ok!")