import { ChartConfiguration } from 'chart.js';

export const LINE_CHART_DATA: ChartConfiguration['data'] = {
  datasets: [
    {
      data: [],
      backgroundColor: `darkviolet`,
      borderColor: 'white',
      borderWidth: 2,
      tension: 0.4
    }
  ]
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
