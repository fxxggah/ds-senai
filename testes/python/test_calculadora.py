from calculadora import somar, subtrair, multiplicar, dividir, porcentagem, eh_par
import pytest

def test_soma():
    assert somar(2, 3) == 5
    assert somar(-1, 1) == 0
    assert somar(0, 0) == 0

def test_subtrair():
    assert subtrair(5, 3) == 2
    assert subtrair(0, 0) == 0
    assert subtrair(-1, -1) == 0

def test_multiplicar():
    assert multiplicar(2, 3) == 6
    assert multiplicar(-1, 1) == -1
    assert multiplicar(0, 0) == 0

def test_dividir():
    assert dividir(6, 2) == 3
    assert dividir(0, 1) == 0
    with pytest.raises(ValueError):
        dividir(1, 0)

def test_porcentagem():
    assert porcentagem(100, 10) == 10
    assert porcentagem(50, 20) == 10
    assert porcentagem(0, 100) == 0

def test_eh_par():
    assert eh_par(1) == False
    assert eh_par(2) == True
    assert eh_par(3) == False