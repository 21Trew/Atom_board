import { ChartConfiguration } from 'chart.js';
import { CHART_COLORS_ARRAY } from './pie-chart.colors';

export const PIE_CHART_DATA: ChartConfiguration['data'] = {
  datasets: [{
    data: [],
    backgroundColor: CHART_COLORS_ARRAY
  }],
  labels: []
};

export const PIE_CHART_OPTIONS: ChartConfiguration['options'] = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'right',
      labels: {
        color: '#FFFFFF',
        padding: 20,
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0,0,0,0.8)',
      titleColor: '#FFFFFF',
      bodyColor: '#FFFFFF',
      padding: 10,
      displayColors: true,
      callbacks: {
        label: function(context: any) {
          const label = context.label || '';
          const value = context.raw || 0;
          const total = context.dataset.data.reduce((acc: number, curr: number) => acc + curr, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${label}: ${value} (${percentage}%)`;
        }
      }
    }
  }
};
