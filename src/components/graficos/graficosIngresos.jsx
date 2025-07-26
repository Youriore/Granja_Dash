// Charts.jsx
import '../chartSetup' // Asegúrate de importar la configuración
import { Bar, Line, } from 'react-chartjs-2'

const data = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
  datasets: [
    {
      label: 'Ventas 2024',
      data: [65, 59, 80, 81, 56],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        padding: 15,
        boxWidth: 12,
        usePointStyle: true
      }
    },
    title: {
      display: true,
      text: 'Resumen de Ventas 2024',
      padding: {
        bottom: 10
      },
      font: {
        size: 14
      }
    },
    tooltip: {
      enabled: true,
      mode: 'index',
      intersect: false,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleFont: {
        size: 12
      },
      bodyFont: {
        size: 13
      },
      padding: 10,
      cornerRadius: 4
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        padding: 5
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        drawBorder: false
      },
      ticks: {
        padding: 5
      }
    }
  },
  layout: {
    padding: 10
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false
  }
};

export default function Graficos() {
  const lineChartOptions = {
    ...options,
    tension: 0.3,
    plugins: {
      ...options.plugins,
      title: {
        ...options.plugins.title,
        text: 'Proyección de Ganancias'
      }
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-3">
        <div className="col-12 col-lg-6">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-white border-0">
              <h5 className="card-title mb-0">Resumen de Ingresos</h5>
            </div>
            <div className="card-body p-2" style={{ minHeight: '300px' }}>
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-white border-0">
              <h5 className="card-title mb-0">Proyección de Ganancias</h5>
            </div>
            <div className="card-body p-2" style={{ minHeight: '300px' }}>
              <Line data={data} options={lineChartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

