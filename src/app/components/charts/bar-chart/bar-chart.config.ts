import { ChartConfiguration } from 'chart.js';

export const BAR_CHART_DATA: ChartConfiguration['data'] = {
  datasets: [
    {
      data: [],
      label: 'Данные',
      backgroundColor: 'rgb(141,114,220)',
      borderColor: 'rgb(81,62,136)',
      borderWidth: 1
    }
  ],
  labels: []
};

export const BAR_CHART_OPTIONS: ChartConfiguration['options'] = {
  responsive: true,
  maintainAspectRatio: false,
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
