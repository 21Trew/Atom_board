import { ChartConfiguration } from 'chart.js';

export const LINE_CHART_DATA: ChartConfiguration['data'] = {
  datasets: [
    {
      data: [],
      backgroundColor: 'rgba(255, 0, 0, 0.1)',  // Прозрачный красный для области под линией
      borderColor: 'rgb(255, 0, 0)',           // Красный цвет для линии
      borderWidth: 1.5,                        // Ширина линии 1.5px
      tension: 0.4,
      fill: true                               // Заполнение области под линией
    }
  ],
  labels: []
};

export const LINE_CHART_OPTIONS: ChartConfiguration['options'] = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(255,255,255,0.5)'
      },
      ticks: {
        color: '#FFFFFF'
      }
    },
    x: {
      grid: {
        color: 'rgba(255,255,255,0.5)'
      },
      ticks: {
        color: '#FFFFFF'
      }
    }
  }
};
