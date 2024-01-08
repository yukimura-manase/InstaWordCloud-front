import {
  Chart as ChartJS,
  ChartData,
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
  ScatterDataPoint,
  BubbleDataPoint,
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

  // 桁数に応じて四捨五入し、整数でキリのいい数字にする
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

  // 桁数に応じて四捨五入し、整数でキリのいい数字にする
  const magnitude = Math.pow(
    10,
    Math.floor(Math.log10(Math.abs(adjustedValue))) -
      (Math.abs(adjustedValue) < 1000 ? 1 : 2)
  );
  return Math.round(adjustedValue / magnitude) * magnitude;
};

// 7日間の Daily Data
const start = new Date("2023-01-01");
const end = new Date("2023-1-8");

/** 1. x軸: 日付のラベルの配列 */
const dateList = [];

// for文で1日づつ日付を加算して、終了日付までループして用意した配列に「push」で追加
for (const day = start; day <= end; day.setDate(day.getDate() + 1)) {
  // フォーマットを指定: YYYY/MM/DD
  let result = `${day.getFullYear()}/${day.getMonth() + 1}/${day.getDate()}`;
  // 配列に追加
  dateList.push(result);
}
console.log(dateList);

/** 2. 積み上げ実績リスト: y軸左 & 折れ線グラフ */
const totalScoreList = [11, 22, 39, 50, 77, 80, 85];
/** 3. いいね数リスト: y軸右 & 棒グラフ */
const targetScoreList = [1, 11, 17, 11, 22, 3, 5];

// 4. 最小値/最大値の算出を 「積み上げ実績」 と 「Target指標」 それぞれで実施する
let totalScoreMin = 0;
let totalScoreMax = 100;
if (totalScoreList) {
  // 最小値の算出
  totalScoreMin = Math.min(...totalScoreList);
  totalScoreMin = calculateYAxisMin(totalScoreMin);

  // 最大値の算出
  totalScoreMax = Math.max(...totalScoreList);
  totalScoreMax = calculateYAxisMax(totalScoreMax);
}
console.log("「積み上げ実績」");
console.log("totalScoreMin", totalScoreMin);
console.log("totalScoreMax", totalScoreMax);

let targetScoreMin = 0;
let targetScoreMax = 100;
if (targetScoreList) {
  // 最小値の算出
  targetScoreMin = Math.min(...targetScoreList);
  targetScoreMin = calculateYAxisMin(targetScoreMin);

  // 最大値の算出
  targetScoreMax = Math.max(...targetScoreList);
  targetScoreMax = calculateYAxisMax(targetScoreMax);
}
console.log("「Target指標」");
console.log("targetScoreMin", targetScoreMin);
console.log("targetScoreMax", targetScoreMax);

const data = {
  /** 1. x軸のラベルの配列: 日付ラベル */
  labels: dateList,
  /** Chart に表示する DataSet */
  datasets: [
    // 2. y軸・左: 積み上げ実績 であり、折れ線グラフで表現する
    {
      /** 折れ線グラフ */
      type: "line",
      label: "積み上げ実績",
      backgroundColor: "#8884d8",
      borderColor: "#8884d8",
      borderWidth: 2,
      fill: false,
      /** 積み上げ実績: 28日間の Daily Data */
      data: totalScoreList,
      yAxisID: "yleft", // optionsで設定したIDを指定
    },
    // 3. y軸・右: 「いいね数」=> 棒グラフで表現する
    {
      /** 棒グラフ */
      type: "bar",
      label: "いいね数",
      backgroundColor: "#cacaca",
      borderColor: "#cacaca",
      borderWidth: 2,
      /** いいね数: 28日間の Daily Data */
      data: targetScoreList,
      /** y軸・右 */
      yAxisID: "yright",
    },
  ],
};

export const options: {} = {
  maintainAspectRatio: false,
  responsive: true,
  animation: false,
  scales: {
    /** x軸 */
    x: {
      stacked: false,
    },
    /** yleft (y軸・左): Y軸が、複数あるので yleft と yright のように軸にIDを付ける */
    yleft: {
      stacked: false,
      max: totalScoreMax,
      min: 0,
    },
    /** yright (y軸・右): Y軸が、複数あるので yleft と yright のように軸にIDを付ける */
    yright: {
      stacked: false,
      position: "right",
      max: targetScoreMax,
      min: 0,
    },
  },
  interaction: {
    /** 積み上げ実績 & 該当値 を合わせて表示する */
    mode: "index",
    intersect: false,
  },
  plugins: {
    /** タイトル設定 */
    title: {
      display: false,
    },
    /** ツールチップ設定 */
    tooltip: {
      backgroundColor: "rgba(255,255,255,0.8)",
      titleColor: "#1a1826",
      titleSpacing: 10,
      bodyColor: "#1a1826",
      bodySpacing: 10,
      displayColors: true,
      borderColor: "#afaeb3",
      borderWidth: 1,
      padding: 12,
      titleFont: {
        size: 18,
      },
      bodyFont: {
        size: 18,
      },
    },
  },
};

/** 折れ線 & 棒グラフの Chart */
const ChartDateBarGraqh = () => {
  return (
    <div
      style={{
        height: "300px",
      }}
    >
      <Chart
        type={"bar"}
        data={
          data as ChartData<
            "line" | "bar",
            (number | ScatterDataPoint | BubbleDataPoint | null)[],
            unknown
          >
        }
        options={options}
      />
    </div>
  );
};

export default ChartDateBarGraqh;
