import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import CombinedGradesTable from "./CombinedGradesTable";
import AssessmentTable from "./AssessmentTable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Tooltip,
  Legend
);

const data = {
  labels: ["May"],
  datasets: [
    {
      label: "Below expecting",
      data: [10],
      backgroundColor: "red",
    },
    {
      label: "In line with curriculum expectations",
      data: [50],
      backgroundColor: "yellow",
    },
    {
      label: "Above curriculum expectations",
      data: [40],
      backgroundColor: "green",
    },
  ],
};

const options = {
  indexAxis: "y",
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
        boxWidth: 10,
      },
    },
    title: {
      display: false,
    },
  },
};
const options1 = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
        boxWidth: 10,
      },
    },
    title: {
      display: false,
    },
  },
};

const doundData = {
  labels: [
    "Below expecting",
    "In line with curriculum expectations",
    "Above curriculum expectations",
  ],
  datasets: [
    {
      data: [44, 22.7, 33.3],
      backgroundColor: ["red", "yellow", "green"],
      borderWidth: 1,
    },
  ],
};

const dounOptions = {
  responsive: true,
  rotation: -90,
  circumference: 180,
  cutout: "80%", // Adjusting the cutout to control the inner circle size
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
        boxWidth: 10,
      },
    },
    tooltip: false,
    datalabels: {
      color: "#000",
      anchor: "end",
      align: "start",
      formatter: (value) => `${value}%`,
      font: {
        weight: "bold",
        size: 14,
      },
    },
  },
};
export default function CombinedGrades() {
  return (
    <div className="text-center p-6 bg-white rounded shadow-md w-full max-w-4xl mb-6">
      <div className="inline-block text-lg font-bold text-center bg-[#3ca5a8] text-white p-3 rounded mb-2">
        The Combined Grades 3 to 5 / Year 4 to 6 for Non-Arabs
      </div>
      <p className="text-center text-sm text-[#3ca5a8] mb-4">
        The summary of the results based on the years of learning Arabic
      </p>
      <CombinedGradesTable />
      <AssessmentTable />
      <div className="overflow-x-auto my-8">
        <Bar data={data} options={options} />
      </div>
      <div className="overflow-x-auto my-8">
        <Bar data={data} options={options1} />
      </div>
      <div className="overflow-x-auto my-8 flex justify-center">
        <div className="w-96 h-96">
          <Doughnut data={doundData} options={dounOptions} />
        </div>
      </div>
    </div>
  );
}
