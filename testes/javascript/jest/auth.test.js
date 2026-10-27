const { validarAutenticar } = require('./auth');

// LOGIN COM SUCESSO
test('Autenticação com sucesso', () => {
    const resultado = validarAutenticar('user@senai.br', '123456');

    expect(resultado.autenticado).toBe(true);
    expect(resultado.perfil).toBe('Usuario');
    expect(resultado.token).toBeDefined();
});

// EMAIL OU SENHA INVALIDO
test("Lançar erro quando não declarar usuario e senha", () => {
    expect(() => validarAutenticar('', '123456')).toThrow("Usuario_senha_obrigatorios");
    expect(() => validarAutenticar('user@senai.br', '')).toThrow("Usuario_senha_obrigatorios");
});

// SENHA MUITO CURTA
test("Senha muito curta", () => {
    expect(() => validarAutenticar('user@senai.br', '123')).toThrow("Senha_Curta");
});

// CREDENCIAIS COM LOGIN E SENHA ERRADAS
test("Testando credenciais com login e senha erradas", () => {
    expect(() => validarAutenticar('errado@senai.br', '123456')).toThrow("Credenciais_invalidas");
    expect(() => validarAutenticar('user@senai.br', '654321')).toThrow("Credenciais_invalidas");
});

// FORMATO DE EMAIL INVÁLIDO
test("Formato de usuário inválido", () => {
    expect(() => validarAutenticar('user.senai.br', '123456')).toThrow("Formato_Usuario_Invalido");
});

// AUTENTIFICA E VALIDA LOGIN DE ADMIN
test("Autentifica e valida login de admin", () => {
    const resultado = validarAutenticar('admin@senai.br', 'admin123');

    expect(resultado.autenticado).toBe(true);
    expect(resultado.perfil).toBe('SUPERVISOR');
    expect(resultado.token).toBeDefined();
});