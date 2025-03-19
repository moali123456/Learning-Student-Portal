import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import AssessmentTable from "./AssessmentTable";
import {
  ChartData,
  ChartDataParams,
  DoughnutData,
  DoughnutDataParams,
  ExamResultType,
} from "../../../../types/Reports";

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

const yAxisOptions = {
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
  scales: {
    y: {
      ticks: {
        maxRotation: 90, // Rotate labels to 45 degrees
        minRotation: 90, // Ensures all labels are rotated
      },
    },
  },
};
const xAxisOptions = {
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
export default function ExamChartsTables({ Data }: { Data: ExamResultType[] }) {
  console.log("ExamChartsTables", Data);
  return (
    <>
      {Data.map((item) => {
        return (
          <>
            <div className="text-center p-6 bg-white rounded shadow-md w-full max-w-4xl mb-6">
              <div className="inline-block text-lg font-bold text-center bg-[#3ca5a8] text-white p-3 rounded mb-2">
                {item.title}
              </div>
              <div>
                <AssessmentTable
                  assessmentData={{
                    ...item.performance,
                    type: "total",
                    title: item.title,
                  }}
                />
                <div className="overflow-x-auto my-8">
                  <Bar
                    data={generateChartData({
                      ...item.performance,
                      title: item.title,
                    })}
                    options={xAxisOptions}
                  />
                </div>
              </div>
            </div>
            <div className="text-center p-6 bg-white rounded shadow-md w-full max-w-4xl mb-6">
              <>
                <h2>Reading</h2>
                <AssessmentTable
                  assessmentData={{
                    ...item.reading,
                    type: "Reading",
                    title: item.title,
                  }}
                />
                <div className="overflow-x-auto my-8">
                  <Bar
                    data={generateChartData({
                      ...item.reading,
                      title: item.title,
                    })}
                    options={yAxisOptions}
                  />
                </div>
              </>
              <>
                <h2>Listening</h2>
                <AssessmentTable
                  assessmentData={{
                    ...item.listening,
                    type: "Listening",
                    title: item.title,
                  }}
                />
                <div className="overflow-x-auto my-8">
                  <Bar
                    data={generateChartData({
                      ...item.listening,
                      title: item.title,
                    })}
                    options={yAxisOptions}
                  />
                </div>
              </>
            </div>
            <div className="text-center p-6 bg-white rounded shadow-md w-full max-w-4xl mb-6">
              <>
                <h2>Writing</h2>
                <AssessmentTable
                  assessmentData={{
                    ...item.writing,
                    type: "Writing",
                    title: item.title,
                  }}
                />
                <div className="overflow-x-auto my-8">
                  <Bar
                    data={generateChartData({
                      ...item.writing,
                      title: item.title,
                    })}
                    options={yAxisOptions}
                  />
                </div>
              </>
              <>
                <h2>speaking</h2>
                <AssessmentTable
                  assessmentData={{
                    ...item.speaking,
                    type: "Speaking",
                    title: item.title,
                  }}
                />
                <div className="overflow-x-auto my-8">
                  <Bar
                    data={generateChartData({
                      ...item.speaking,
                      title: item.title,
                    })}
                    options={yAxisOptions}
                  />
                </div>
              </>
            </div>
            <div className="text-center p-6 bg-white rounded shadow-md w-full max-w-4xl mb-6">
              <>
                <AssessmentTable
                  assessmentData={{
                    ...item.genderDistribution.boys,
                    type: "Boys",
                    title: item.title,
                  }}
                />
                <div className="overflow-x-auto my-8 flex justify-center">
                  <div className="w-96 h-96">
                    <Doughnut
                      data={generateDoughnutData(item.genderDistribution.boys)}
                      options={dounOptions}
                    />
                  </div>
                </div>
              </>
              <>
                <AssessmentTable
                  assessmentData={{
                    ...item.genderDistribution.girls,
                    type: "Girls",
                    title: item.title,
                  }}
                />
                <div className="overflow-x-auto my-8 flex justify-center">
                  <div className="w-96 h-96">
                    <Doughnut
                      data={generateDoughnutData(item.genderDistribution.girls)}
                      options={dounOptions}
                    />
                  </div>
                </div>
              </>
            </div>
            <div className="text-center p-6 bg-white rounded shadow-md w-full max-w-4xl mb-6">
              <>
                <AssessmentTable
                  assessmentData={{
                    ...item.specialNeeds,
                    type: "SEN",
                    title: item.title,
                  }}
                />
                <div className="overflow-x-auto my-8 flex justify-center">
                  <div className="w-96 h-96">
                    <Doughnut
                      data={generateDoughnutData(item.specialNeeds)}
                      options={dounOptions}
                    />
                  </div>
                </div>
              </>
              <>
                <AssessmentTable
                  assessmentData={{
                    ...item.talentedStudents,
                    type: "G & T",
                    title: item.title,
                  }}
                />
                <div className="overflow-x-auto my-8 flex justify-center">
                  <div className="w-96 h-96">
                    <Doughnut
                      data={generateDoughnutData(item.talentedStudents)}
                      options={dounOptions}
                    />
                  </div>
                </div>
              </>
            </div>
          </>
        );
      })}
    </>
  );
}
function generateChartData(params: ChartDataParams): ChartData {
  const { total, inline, above, below, title } = params;

  // Validate input to ensure the total matches the sum of inline, above, and below
  if (inline + above + below !== total) {
    throw new Error(
      `The sum of inline, above, and below must equal total.${inline} ${above} ${below}`
    );
  }

  return {
    labels: [title],
    datasets: [
      {
        label: "Below expecting",
        data: [(below / total) * 100],
        backgroundColor: "red",
      },
      {
        label: "In line with curriculum expectations",
        data: [(inline / total) * 100],
        backgroundColor: "yellow",
      },
      {
        label: "Above curriculum expectations",
        data: [(above / total) * 100],
        backgroundColor: "green",
      },
    ],
  };
}
function generateDoughnutData(params: DoughnutDataParams): DoughnutData {
  const { total, inline, above, below } = params;

  // Validate input to ensure the total matches the sum of inline, above, and below
  if (inline + above + below !== total) {
    throw new Error("The sum of inline, above, and below must equal total.");
  }

  return {
    labels: [
      "Below expecting",
      "In line with curriculum expectations",
      "Above curriculum expectations",
    ],
    datasets: [
      {
        data: [
          (below / total) * 100,
          (inline / total) * 100,
          (above / total) * 100,
        ],
        backgroundColor: ["red", "yellow", "green"],
        borderWidth: 1,
      },
    ],
  };
}
