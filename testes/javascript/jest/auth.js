function validarAutenticar(usuario, senha) {

    if (!usuario || !senha) {
        throw new Error("Usuario_senha_obrigatorios")
    }

    if (!usuario.includes("@")) {
        throw new Error("Formato_Usuario_Invalido")
    }

    if (senha.length < 6) {
        throw new Error("Senha_Curta")
    }

    if (usuario === "user@senai.br" && senha === "123456") {
        return {
            autenticado: true,
            usuario: usuario,
            perfil: "Usuario",
            token: "token-jwt-fake-123"
        }
    }

    if (usuario === "admin@senai.br" && senha === "admin123") {
        return {
            autenticado: true,
            usuario: usuario,
            perfil: "SUPERVISOR",
            token: "token-jwt-fake-123"
        }
    }

    throw new Error("Credenciais_invalidas")
}

module.exports = { validarAutenticar }