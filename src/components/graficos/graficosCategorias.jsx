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
      barThickness: 20, // 👈 Esto controla el grosor
    },
  ],
}

const options = {
  indexAxis: 'y', // horizontal
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Raza de animales',
    },
  },
  scales: {
    x: {
      beginAtZero: true,
    },
  },
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
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Crecimiento Mensual del Ganado',
    },
  },
  scales: {
    y: {
      beginAtZero: false
    }
  }
};

export default function GraficoHorizontalSeparado() {
  return (
    <div className="d-flex justify-content-center gap-4 d-flex flex-wrap ">
      <fieldset className="border p-3 rounded-3" style={{ width: '550px', height: '350px' }}>
        <legend className="float-none w-auto px-2 fs-5 fw-semibold">Raza de animales</legend>
        <Bar data={data} options={options} />
      </fieldset>
            <fieldset className="border p-3 rounded-3" style={{ width: '550px', height: '350px' }}>
        <legend className="float-none w-auto px-2 fs-5 fw-semibold">Crecimiento del Ganado</legend>
        <Line data={lineData} options={lineOptions} />
      </fieldset>
    </div>
  )
}