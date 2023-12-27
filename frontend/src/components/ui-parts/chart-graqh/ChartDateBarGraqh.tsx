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

/*
 * Y軸の最小値の調整
 */
const calculateYAxisMin = (value: number): number => {
  // 値に対する補正を行う
  let adjustedValue =
    value >= 0 ? Math.floor(value * 0.95) : Math.ceil(value * 1.05);

  // 1桁の場合の処理
  if (Math.abs(value) < 10) {
    return value >= 0 ? (value < 5 ? 5 : 10) : value > -5 ? 0 : -5;
  }

  // 2桁の場合は5の倍数に四捨五入
  if (Math.abs(adjustedValue) >= 10 && Math.abs(adjustedValue) < 100) {
    if (adjustedValue < 0) {
      // 負の数の場合は次の「5で割り切れるより小さい数」にする
      return Math.ceil((adjustedValue - 5) / 5) * 5;
    }
    // 正の数の場合は次の「5で割り切れるより大きい数」にする
    return Math.ceil((adjustedValue + 5) / 5) * 5;
  }

  // 桁数に応じて四捨五入し、整数でキリの良い数字にする
  const magnitude = Math.pow(
    10,
    Math.floor(Math.log10(Math.abs(adjustedValue))) -
      (Math.abs(adjustedValue) < 1000 ? 1 : 2)
  );
  return Math.round(adjustedValue / magnitude) * magnitude;
};

/*
 * Y軸の最大値の調整
 */
const calculateYAxisMax = (value: number): number => {
  // 値に対する補正を行う
  let adjustedValue =
    value >= 0 ? Math.ceil(value * 1.05) : Math.floor(value * 0.95);

  // 1桁の場合の処理
  if (Math.abs(value) < 10) {
    return value >= 0 ? (value < 5 ? 0 : 5) : value > -5 ? -5 : -10;
  }

  // 2桁の場合は5の倍数に四捨五入（負の数の場合は特別な処理）
  if (Math.abs(adjustedValue) >= 10 && Math.abs(adjustedValue) < 100) {
    if (adjustedValue < 0) {
      // 負の数の場合は前の「5で割り切れるより大きい数」にする
      return Math.floor(adjustedValue / 5) * 5;
    }
    // 正の数の場合は次の「5で割り切れるより大きい数」にする
    return Math.ceil(adjustedValue / 5) * 5;
  }

  // 桁数に応じて四捨五入し、整数でキリの良い数字にする
  const magnitude = Math.pow(
    10,
    Math.floor(Math.log10(Math.abs(adjustedValue))) -
      (Math.abs(adjustedValue) < 1000 ? 1 : 2)
  );
  return Math.round(adjustedValue / magnitude) * magnitude;
};

// 7日間の Daily Data
const start = new Date("2023-01-01");
const end = new Date("2023-1-28");

/** 日付の配列 */
const dateList = [];

/** 積み上げ実績リスト */
const totalScoreList = [];

/** いいね数リスト */
const targetScoreList = [];

// //最小値の算出
// let yAxisMin = Math.min(...yAxisDataList);
// yAxisMin = calculateYAxisMin(yAxisMin);

// //最大値の算出
// let yAxisMax = Math.max(...yAxisDataList);
// yAxisMax = calculateYAxisMax(yAxisMax);

// for文で1日づつ日付を加算して、終了日付までループして用意した配列に「push」で追加
for (const day = start; day <= end; day.setDate(day.getDate() + 1)) {
  // フォーマットを指定: YYYY/MM/DD
  let result = `${day.getFullYear()}/${day.getMonth() + 1}/${day.getDate()}`;
  // 配列に追加
  dateList.push(result);
}
console.log(dateList);

/** 1. x軸: 日付のラベルの配列 */
const labels = dateList;

const data = {
  /** x軸のラベルの配列: 日付ラベル */
  labels,
  /** Chart に表示する DataSet */
  datasets: [
    // 2. y軸・左: 積み上げ実績 であり、折れ線グラフで表現する
    {
      type: "line", // 折れ線
      label: "積み上げ実績",
      borderColor: "#8884d8",
      borderWidth: 2,
      fill: false,
      /** 28日間の Daily Data */
      data: [
        11, 32, 43, 21, 32, 41, 21, 11, 32, 43, 21, 32, 41, 21, 11, 32, 43, 21,
        32, 41, 21, 11, 32, 43, 21, 32, 41, 21,
      ],
      yAxisID: "yleft", // optionsで設定したIDを割り振ってY軸を設定する
    },
    // 3. y軸・右: 投稿人数など、動的な DataSet => 棒グラフで表現する
    {
      type: "bar", // 棒グラフ
      label: "いいね数",
      backgroundColor: "#cacaca",
      borderColor: "white",
      borderWidth: 2,
      /** 28日間の Daily Data */
      data: [
        1, 3, 4, 2, 3, 4, 2, 1, 3, 4, 2, 3, 4, 2, 1, 3, 4, 2, 3, 4, 2, 1, 3, 4,
        2, 3, 4, 2,
      ],
      yAxisID: "yright", // Y軸の設定
    },
  ],
};

export const options: {} = {
  plugins: {
    title: {
      display: false,
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: false,
    },
    yleft: {
      // Y軸が、複数あるので yleft と yright のように軸にIDを付ける
      stacked: false,
      max: 100,
      min: 0,
    },
    yright: {
      stacked: false,
      position: "right",
      max: 10,
      min: 0,
    },
  },
};

const ChartDateBarGraqh = () => {
  return (
    <div className="App">
      <Chart type={"bar"} data={data} options={options} />
    </div>
  );
};

export default ChartDateBarGraqh;
