import Chart from 'chart.js/auto';

// 1. Tipagem dos elementos do DOM

const canvas = document.getElementById('meuGrafico') as HTMLCanvasElement;

const btnAtualizar = document.getElementById('btnAtualizar') as HTMLButtonElement;



// 2. Dados iniciais com tipos explícitos

const horários: string[] = ['10:00', '10:05', '10:10', '10:15', '10:20'];

const temperaturas: number[] = [65, 68, 72, 70, 75];



// 3. Inicialização do Chart.js

const grafico = new Chart(canvas, {

  type: 'line',

  data: {

    labels: horários,

    datasets: [{

      label: 'Temperatura (ºC)',

      data: temperaturas,

      borderColor: '#dc3545',

      backgroundColor: 'rgba(220, 53, 69, 0.2)',

      fill: true,

      tension: 0.3

    }]

  },

  options: {

    responsive: true,

    scales: {

      y: { beginAtZero: false, min: 50, max: 100 }

    }

  }

});



// 4. Função tipada para adicionar novos dados em tempo real

function adicionarLeitura(): void {

  const agora = new Date();

  const horaFormatada = `${agora.getHours()}:${agora.getMinutes()}:${agora.getSeconds()}`;

  const novaTemp = Math.floor(Math.random() * 25) + 60; // Gera de 60 a 85 ºC



  // Atualiza arrays do gráfico

  grafico.data.labels?.push(horaFormatada);

  grafico.data.datasets[0].data.push(novaTemp);



  // Remove o dado mais antigo para manter apenas 7 pontos na tela

  if (grafico.data.labels && grafico.data.labels.length > 7) {

    grafico.data.labels.shift();

    grafico.data.datasets[0].data.shift();

  }



  grafico.update();

}



// 5. Evento do botão

btnAtualizar.addEventListener('click', adicionarLeitura);