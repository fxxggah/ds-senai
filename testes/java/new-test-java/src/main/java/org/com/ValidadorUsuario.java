package org.com;

public class ValidadorUsuario {

    public boolean validarNome(String nome){

        if (nome == null || nome.trim().isEmpty()) {
            return false;
        }
        return nome.trim().length() >= 3;

    }

}
