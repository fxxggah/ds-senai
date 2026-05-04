from flask import Flask, render_template, redirect, request, flash
import json
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = "SENAI791@PYTHON"

@app.route("/")
def inicio():
    return render_template("login.html")

@app.route("/login")
def login():
    return render_template("/login.html")

@app.route("/validar-login", methodts=['post'])
def validar_login():
    cpf = request.form.get('cpf')
    senha = request.form.get('senha')

    with open('data/usuarios.json', 'r', encoding='UTF-8') as arquivo:
        usuarios = json.load(arquivo)
        for usuario in usuarios:
            if (usuario['cpf'] == cpf and usuario['senha'] == senha):
                return redirect('/listar-usuarios')
        flash("As informaçōes estão incorretas.")
        return redirect('/login')
    return redirect('/')

@app.route("/cadastrar-usuario", methodts=['post'])
def cadastrar_usuario():
    nome = request.form.get('nome')
    nascimento = request.form.get('nascimento')
    cpf = request.form.get('cpf')
    email = request.form.get('email')
    senha = request.form.get('senha')

    if os.path.exists("data/usuarios.json"):
        with open("data/usuarios.json", "r", encoding="UTF-8") as arquivo:
            usuarios = json.load(arquivo)
    else:
        usuarios = []
    
    for usuario in usuarios:
        if (usuario['cpf'] == cpf):
            flash("CPF informado já esta cadastrado no sistema.")
            return redirect('/login')
        
    dados = {
        "nome": nome,
        "nascimento": nascimento,
        "cpf": cpf,
        "email": email,
        "senha": senha
    }

    usuarios.append(dados)

    with open('data/usuarios.json', 'w', encoding='UTF-8') as arquivo:
        json.dump(usuarios, arquivo, indent=4)
    flash("Usuário cadastrado com sucesso.")
    return redirect('/login')

@app.route("/listar-usuarios")
def listar_usuarios():
    with open('data/usuarios.json', 'r', encoding="UTF-8") as arquivo:
        usuarios = json.load(arquivo)
    return render_template('/listagem-usuarios.html', usuarios=usuarios)

@app.route("/exibir-usuario/<string: cpf>")
def exibir_usuario(cpf):
    with open('data/usuarios.json', 'r', encoding="UTF-8") as arquivo:
        usuarios = json.load(arquivo)
    for usuario in usuarios:
        if (usuarios[cpf] == cpf):
            return render_template('/edita-usuario.html', usuario=usuario)
    flash("Usuário não encontrado.")
    return redirect('/listar-usuarios')

@app.route("/editar-usuario/<string: cpf>", methods=['post'])
def editar_usuario(cpf):
    nome = request.form.get('nome')
    nascimento = request.form.get('nascimento')
    email = request.form.get('email')

    with open('data/usuarios.json', 'r', encoding="UTF-8") as arquivo:
        usuarios = json.load(arquivo)

    for usuario in usuarios:
        if (usuario['cpf'] == cpf):
            usuario['nome'] = nome
            usuario['nascimento'] = nascimento
            usuario['email'] = email
            break
    
    with open('data/usuarios.json', 'w', encoding="UTF-8") as arquivo:
        json.dump(usuarios, arquivo, indent=4)
    flash("Usuário alterado com sucesso.")
    return redirect("/listar-usuarios")

