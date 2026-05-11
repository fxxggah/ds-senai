from flask import Flask, render_template, request, redirect, url_for
import mysql.connector

app = Flask(__name__)

# Função para conectar ao banco de dados MySQL
def get_db_connection():
    conn = mysql.connector.connect(
        host="localhost",      # Substitua com o host do MySQL
        user="root",           # Usuário padrão do MySQL no XAMPP
        password="dev@2025",           # Deixe vazio se não houver senha no XAMPP
        database="alunos"  # Nome do banco de dados
    )
    return conn

# Rota principal: lista todos os alunos +
@app.route('/')
def index():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM students')
    students = cursor.fetchall()
    conn.close()
    return render_template('index.html', students=students)

# Rota para adicionar um novo aluno
@app.route('/add', methods=('GET', 'POST'))
def add():
    if request.method == 'POST':
        name = request.form['name']
        dob = request.form['dob']
        address = request.form['address']
        class_name = request.form['class']

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('INSERT INTO students (name, dob, address, class) VALUES (%s, %s, %s, %s)',
                       (name, dob, address, class_name))
        conn.commit()
        conn.close()
        return redirect(url_for('index'))

    return render_template('add.html')

# Rota para editar informações de um aluno
@app.route('/edit/<int:id>', methods=('GET', 'POST'))
def edit(id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM students WHERE id = %s', (id,))
    student = cursor.fetchone()

    if request.method == 'POST':
        name = request.form['name']
        dob = request.form['dob']
        address = request.form['address']
        class_name = request.form['class']

        cursor.execute('UPDATE students SET name = %s, dob = %s, address = %s, class = %s WHERE id = %s',
                       (name, dob, address, class_name, id))
        conn.commit()
        conn.close()
        return redirect(url_for('index'))

    conn.close()
    return render_template('edit.html', student=student)

# Rota para deletar um aluno
@app.route('/delete/<int:id>', methods=('POST',))
def delete(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM students WHERE id = %s', (id,))
    conn.commit()
    conn.close()
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)