import React, { useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Title,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Title
);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/** x軸のラベルの配列 */
const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  /** x軸のラベルの配列 */
  labels,

  datasets: [
    {
      type: "line", // 折れ線
      label: "Dataset 1",
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 2,
      fill: false,
      data: [1, 3, 4, 2, 3, 4, 2],
      yAxisID: "y1", // optionsで設定したIDを割り振ってY軸を設定する
    },
    {
      type: "bar", // 棒グラフ
      label: "Dataset 2",
      backgroundColor: "rgb(75, 192, 192)",
      borderColor: "white",
      borderWidth: 2,
      data: [11, 32, 43, 21, 32, 41, 21],
      yAxisID: "y", // Y軸の設定
    },
    {
      type: "bar", // 棒グラフ
      label: "Dataset 3",
      backgroundColor: "rgb(53, 162, 235)",
      data: [21, 33, 44, 32, 63, 34, 42],
      yAxisID: "y", // Y軸の設定
    },
  ],
};

export const options: {} = {
  plugins: {
    title: {
      display: true,
      text: "Chart.js Bar Chart - multitype",
    },
    legend: {
      // 凡例の設定
      position: "bottom", // 下に配置
    },
  },
  responsive: true,
  // optionsのscalesでyとy1を設定していますがこれがy軸のIDになります。
  scales: {
    x: {
      stacked: false,
    },
    y: {
      // Y軸が複数あるのでyとy1のように軸にIDを付ける
      stacked: false,
      max: 100,
      min: 0,
    },
    y1: {
      stacked: false,
      position: "right",
      max: 10,
      min: 0,
    },
  },
};

const ChartBarGraqh = () => {
  return (
    <div className="App">
      <Chart type={"bar"} data={data} options={options} />
    </div>
  );
};

export default ChartBarGraqh;
