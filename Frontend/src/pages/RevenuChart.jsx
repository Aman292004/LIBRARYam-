import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = () => {
  const revenueData = [
    500, 700, 800, 600, 750, 900, 650, 870, 960, 1020, 1100, 1150,
  ];

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue (INR)",
        data: revenueData,
        backgroundColor: "#FFD700",
        borderColor: "#002366",
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#002366",
        },
      },
      title: {
        display: true,
        text: "Monthly Revenue",
        color: "#002366",
        font: {
          size: 18,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#002366" },
        grid: { color: "rgba(0, 35, 102, 0.1)" },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#002366" },
        grid: { color: "rgba(0, 35, 102, 0.1)" },
      },
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
      <h2 className="text-center text-2xl font-bold text-[#002366] mb-4">
        Monthly Revenue
      </h2>
      <div className="hidden md:block">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default RevenueChart;
