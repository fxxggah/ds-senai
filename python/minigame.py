import random

def gera():
    return random.randint(1, 100)

def chutar():
    return int(input("Seu chute: "))

def game():
    resposta = gera()
    chutes = 0
    chute = 0
    print("\nNUMERO GERADO!")

    while chute is not resposta:
        chutes += 1
        chute = chutar()
        if chute > resposta:
            print("Esse chute foi muito alto\n")
        elif chute < resposta:
            print("Esse chute foi muito baixo\n")
        else:
            print("FINALMENTE!! VOCE ACERTOU A RESPOSTA.\n Voce chutou ", chutes ," vezes\n")
       
while True:
    game()