import org.com.ValidadorUsuario;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ValidadorUsuarioTest {

    private ValidadorUsuario validador;

    @BeforeEach
    void setUp() {
        // Inicializa o objeto antes de cada teste
        validador = new ValidadorUsuario();
    }

    @Test
    @DisplayName("1. Deve aceitar um nome válido (Ex: Fábio)")
    void deveAceitarNomeValido() {
        boolean resultado = validador.validarNome("Fábio");
        assertTrue(resultado, "O nome Fábio deveria ser aceito como válido");
    }

    @Test
    @DisplayName("2. Deve rejeitar nome muito curto (menos de 3 caracteres)")
    void deveRejeitarNomeCurto() {
        boolean resultado = validador.validarNome("Zé");
        assertFalse(resultado, "Nomes com menos de 3 caracteres devem ser inválidos");
    }

    @Test
    @DisplayName("3. Deve rejeitar entrada vazia ou nula")
    void deveRejeitarNomeVazio() {
        assertFalse(validador.validarNome("   "), "Espaços em branco devem ser rejeitados");
        assertFalse(validador.validarNome(null), "Nome nulo deve ser rejeitado");
    }
}