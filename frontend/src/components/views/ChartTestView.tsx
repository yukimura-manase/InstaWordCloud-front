import ChartBar from "../ui-parts/chart-graqh/ChartBar";
import ChartBarGraqh from "../ui-parts/chart-graqh/ChartBarGraqh";
import ChartDateBarGraqh from "../ui-parts/chart-graqh/ChartDateBarGraqh";

/**
 * Network Graph を表示する View Component
 * Ver. Cytoscapejs
 */
const ChartTestView = () => {
  return (
    <div>
      {/* <ChartBar /> */}
      {/* <ChartBarGraqh /> */}
      <ChartDateBarGraqh />
    </div>
  );
};

export default ChartTestView;
