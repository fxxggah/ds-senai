// Definição dos Pinos dos Segmentos (a até g)
const int pinA = 2;
const int pinB = 3;
const int pinC = 4;
const int pinD = 5;
const int pinE = 6;
const int pinF = 7;
const int pinG = 8;

const int PINO_LDR = A0;

// Matriz com a combinação dos segmentos para formar cada número (0 a 9)
// Padrão: {a, b, c, d, e, f, g}
const byte numeros[10][7] = {
  {1, 1, 1, 1, 1, 1, 0}, // 0
  {0, 1, 1, 0, 0, 0, 0}, // 1
  {1, 1, 0, 1, 1, 0, 1}, // 2
  {1, 1, 1, 1, 0, 0, 1}, // 3
  {0, 1, 1, 0, 0, 1, 1}, // 4
  {1, 0, 1, 1, 0, 1, 1}, // 5
  {1, 0, 1, 1, 1, 1, 1}, // 6
  {1, 1, 1, 0, 0, 0, 0}, // 7
  {1, 1, 1, 1, 1, 1, 1}, // 8
  {1, 1, 1, 1, 0, 1, 1}  // 9
};

void setup() {
  // Configura todos os pinos dos segmentos como SAÍDA
  pinMode(pinA, OUTPUT);
  pinMode(pinB, OUTPUT);
  pinMode(pinC, OUTPUT);
  pinMode(pinD, OUTPUT);
  pinMode(pinE, OUTPUT);
  pinMode(pinF, OUTPUT);
  pinMode(pinG, OUTPUT);
}

void loop() {
  // Lê a intensidade de luz no LDR (0 a 1023)
  int valorLuz = analogRead(PINO_LDR);

  // Mapeia o valor lido da luz para uma escala de 0 a 9
  // (Caso a luz da sua sala mude muito, você pode ajustar 100 e 900)
  int nivel = map(valorLuz, 100, 900, 0, 9);
  
  // Garante que o nível fique estritamente entre 0 e 9
  nivel = constrain(nivel, 0, 9);

  // Exibe o número correspondente no display
  exibirNumero(nivel);

  delay(100); // Pausa leve para estabilizar
}

// Função auxiliar que acende os segmentos do número selecionado
void exibirNumero(int num) {
  digitalWrite(pinA, numeros[num][0]);
  digitalWrite(pinB, numeros[num][1]);
  digitalWrite(pinC, numeros[num][2]);
  digitalWrite(pinD, numeros[num][3]);
  digitalWrite(pinE, numeros[num][4]);
  digitalWrite(pinF, numeros[num][5]);
  digitalWrite(pinG, numeros[num][6]);
}
