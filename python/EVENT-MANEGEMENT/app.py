from flask import Flask, render_template, request, redirect, url_for, session
import mysql.connector

app = Flask(__name__)
# 1. DEFINA A SECRET KEY AQUI
app.secret_key = 'dev_key_123'

def get_db_connection():
    return mysql.connector.connect(
        host = 'localhost',
        user = 'root',
        password = 'dev@2025',
        database = 'gestao_eventos'
    )

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        usuario = request.form['username']
        senha = request.form['password']

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT * FROM usuarios WHERE username = %s AND senha = %s', (usuario, senha))
        user = cursor.fetchone()
        cursor.close()
        conn.close()

        if user:
            session['logado'] = True
            session['username'] = user['username']
            return redirect(url_for('index')) 
        else:
            return "Erro: usuário ou senha incorretos <a href='/login'>Tentar Novamente</a>"
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

@app.route('/')
def index():
    if not session.get('logado'):
        return redirect(url_for('login'))
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    # Verifique se o nome da tabela é 'evento' ou 'eventos' no seu banco
    cursor.execute('SELECT * FROM eventos ORDER BY data_evento ASC')
    eventos_db = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template('index.html', eventos=eventos_db, user=session['username'])

@app.route('/cadastrar', methods=['POST'])
def cadastrar():
    if not session.get('logado'):
        return redirect(url_for('login'))
    
    titulo = request.form['titulo']
    data = request.form['data']
    local = request.form['local']
    desc = request.form['descricao']

    conn = get_db_connection()
    cursor = conn.cursor()
    # 2. CORREÇÃO DA QUERY E DA VÍRGULA NOS PARÂMETROS
    sql = "INSERT INTO eventos (titulo, data_evento, local_evento, descricao) VALUES (%s, %s, %s, %s)"
    valores = (titulo, data, local, desc)
    
    cursor.execute(sql, valores)
    conn.commit()
    cursor.close()
    conn.close()
    return redirect(url_for('index'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        usuario = request.form['username']
        senha = request.form['password']

        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            # Inserindo na tabela 'usuarios' que você confirmou que existe
            cursor.execute('INSERT INTO usuarios (username, senha) VALUES (%s, %s)', (usuario, senha))
            conn.commit()
            cursor.close()
            conn.close()
            return redirect(url_for('login'))
        except mysql.connector.Error as err:
            return f"Erro ao criar usuário: {err} <a href='/register'>Tentar novamente</a>"

    return render_template('add-user.html')

if __name__=='__main__':
    app.run(debug=True)