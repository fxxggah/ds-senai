import mysql.connector


def conectar():
    conexao = mysql.connector.connect(
        host='localhost',
        user='root',
        password='dev@2025',
        database='lista_compras_db'
    )

    return conexao