import { Bar, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement, 
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data = {
  labels: ['Maíz', 'Alfalfa', 'Concentrado', 'Trigo', 'Vitaminas'],
  datasets: [
    {
      label: 'Consumo (kg)',
      data: [40, 35, 50, 25, 20],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      barThickness: 20, 
    },
  ],
}

const options = {
  indexAxis: 'y', 
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        padding: 15,
        boxWidth: 12
      }
    },
    title: {
      display: true,
      text: 'Raza de animales',
      padding: {
        bottom: 10
      },
      font: {
        size: 14
      }
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      ticks: {
        padding: 5
      },
      grid: {
        display: true,
        drawBorder: true
      }
    },
    y: {
      ticks: {
        padding: 5
      },
      grid: {
        display: false
      }
    }
  },
  layout: {
    padding: 10
  }
}

const lineData = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
  datasets: [
    {
      label: 'Crecimiento del Ganado',
      data: [100, 110, 115, 125, 130],
      fill: false,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      tension: 0.1
    }
  ]
};

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        padding: 15,
        boxWidth: 12
      }
    },
    title: {
      display: true,
      text: 'Crecimiento Mensual del Ganado',
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
      beginAtZero: false,
      grid: {
        drawBorder: false
      },
      ticks: {
        padding: 5
      }
    }
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false
  },
  layout: {
    padding: 10
  }
};

export default function GraficoHorizontalSeparado() {
  return (
    <div className="container-fluid p-0">
      <div className="row g-3">
        <div className="col-12 col-lg-6">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-white border-0">
              <h5 className="card-title mb-0">Raza de animales</h5>
            </div>
            <div className="card-body p-2" style={{ minHeight: '300px' }}>
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-white border-0">
              <h5 className="card-title mb-0">Crecimiento del Ganado</h5>
            </div>
            <div className="card-body p-2" style={{ minHeight: '300px' }}>
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}