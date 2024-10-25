import { ChartConfiguration } from 'chart.js';

export const LINE_CHART_DATA: ChartConfiguration['data'] = {
  datasets: [
    {
      data: [],
      label: 'Линейный график',
      backgroundColor: 'rgb(81,62,136,0.6)',
      borderColor: 'rgb(141,114,220)',
      tension: 0.4
    }
  ],
  labels: []
};

export const LINE_CHART_OPTIONS: ChartConfiguration['options'] = {
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
