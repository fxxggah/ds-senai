#include <Servo.h>

// Pinos do Sensor Ultrassônico, Servo e Buzzer
const int PIN_TRIG = 8;
const int PIN_ECHO = 9;
const int PIN_SERVO = 10;
const int PIN_BUZZER = 12; // Pino do Buzzer

// Pinos do Display de 7 Segmentos (a, b, c, d, e, f, g)
const int pinosDisplay[7] = {2, 3, 13, 5, 6, 7, 11};

// Matriz de mapeamento dos números (0 a 9) para display de CÁTODO COMUM
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

Servo portao;

// Configurações de tempo
unsigned long tempoAnteriorDisplay = 0;
const long intervaloRapido = 100; // Velocidade do efeito sem carro (100ms)
int digitoAtualEfeito = 0;

const int DISTANCIA_LIMITE = 15; // Distância em cm para abrir o portão

void setup() {
  // Configura os pinos do display como SAÍDA
  for (int i = 0; i < 7; i++) {
    pinMode(pinosDisplay[i], OUTPUT);
  }

  // Configura o pino do buzzer
  pinMode(PIN_BUZZER, OUTPUT);

  // Configura os pinos do sensor ultrassônico
  pinMode(PIN_TRIG, OUTPUT);
  pinMode(PIN_ECHO, INPUT);

  // Inicializa o servo fechado (0 graus)
  portao.attach(PIN_SERVO);
  portao.write(0);

  Serial.begin(9600);
}

void loop() {
  float distancia = medirDistancia();

  Serial.print("Distancia: ");
  Serial.print(distancia);
  Serial.println(" cm");

  // Se um carro se aproximar (distância menor ou igual a 15 cm)
  if (distancia > 0 && distancia <= DISTANCIA_LIMITE) {
    // 1. Abre o portão
    portao.write(90);

    // 2. Contagem regressiva de 9 a 0 com bipes no buzzer
    for (int i = 9; i >= 0; i--) {
      exibirNumero(i);
      
      // Apita o buzzer por 200ms no início de cada segundo da contagem
      tone(PIN_BUZZER, 1000); // Som de 1000 Hz
      delay(200);
      noTone(PIN_BUZZER);     // Desliga o som
      delay(800);             // Completa o tempo restante de 1 segundo (200ms + 800ms = 1000ms)
    }

    // 3. Fecha o portão ao término da contagem
    portao.write(0);
  } 
  else {
    // Garante que o buzzer está desligado sem carro
    noTone(PIN_BUZZER);
    
    // Sem carro: fica alternando os números de 0 a 9 rapidamente
    efeitoAguardandoCarro();
  }
}

// Função para exibir um número específico no display
void exibirNumero(int numero) {
  for (int i = 0; i < 7; i++) {
    digitalWrite(pinosDisplay[i], numeros[numero][i]);
  }
}

// Alterna os dígitos rapidamente de 0 a 9
void efeitoAguardandoCarro() {
  unsigned long tempoAtual = millis();

  if (tempoAtual - tempoAnteriorDisplay >= intervaloRapido) {
    tempoAnteriorDisplay = tempoAtual;
    
    exibirNumero(digitoAtualEfeito);
    
    digitoAtualEfeito++;
    if (digitoAtualEfeito > 9) {
      digitoAtualEfeito = 0;
    }
  }
}

// Função para ler a distância do sensor HC-SR04
float medirDistancia() {
  digitalWrite(PIN_TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(PIN_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);

  long duracao = pulseIn(PIN_ECHO, HIGH, 30000);
  if (duracao == 0) return 999;

  return (duracao * 0.0343) / 2;
}
