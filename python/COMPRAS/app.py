from flask import Flask, render_template, request, redirect
from database.database_connection import conectar

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/cadastrar-item')
def cadastrar_item():
    return render_template('cadastrar-item.html')


@app.route('/salvar-item', methods=['POST'])
def salvar_item():
    nome = request.form['nome']
    quantidade = request.form['quantidade']
    categoria = request.form['categoria']

    conexao = conectar()
    cursor = conexao.cursor()

    sql = '''
        INSERT INTO itens(nome, quantidade, categoria)
        VALUES(%s, %s, %s)
    '''

    valores = (nome, quantidade, categoria)

    cursor.execute(sql, valores)
    conexao.commit()

    cursor.close()
    conexao.close()

    return redirect('/listar-itens')

@app.route('/listar-itens')
def listar_itens():

    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)

    sql = 'SELECT * FROM itens'

    cursor.execute(sql)

    itens = cursor.fetchall()

    cursor.close()
    conexao.close()

    return render_template('listar-itens.html', itens=itens)


@app.route('/editar-item/<int:id>')
def editar_item(id):
    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)

    sql = 'SELECT * FROM itens WHERE id = %s'

    cursor.execute(sql, (id,))

    item = cursor.fetchone()

    cursor.close()
    conexao.close()

    return render_template('editar-item.html', item=item)


@app.route('/atualizar-item', methods=['POST'])
def atualizar_item():
    id = request.form['id']
    nome = request.form['nome']
    quantidade = request.form['quantidade']
    categoria = request.form['categoria']

    conexao = conectar()
    cursor = conexao.cursor()

    sql = '''
        UPDATE itens
        SET nome = %s,
            quantidade = %s,
            categoria = %s
        WHERE id = %s
    '''

    valores = (nome, quantidade, categoria, id)

    cursor.execute(sql, valores)

    conexao.commit()

    cursor.close()
    conexao.close()

    return redirect('/listar-itens')


@app.route('/deletar-item/<int:id>')
def deletar_item(id):
    conexao = conectar()
    cursor = conexao.cursor()

    sql = 'DELETE FROM itens WHERE id = %s'

    cursor.execute(sql, (id,))

    conexao.commit()

    cursor.close()
    conexao.close()

    return redirect('/listar-itens')


if __name__ == '__main__':
    app.run(debug=True)