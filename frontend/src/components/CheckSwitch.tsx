import { Switch } from "@mui/material";
import { useEffect, useState } from "react";
// Propsの型定義
interface PropsType {
  default: boolean;
}

const CheckSwitch = (props: PropsType) => {
  // Test_Switch
  const [testChecked, setTestUserChecked] = useState<boolean>(props.default);
  const testSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Test_Switch", event.target.checked);
    setTestUserChecked(event.target.checked);
  };
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <Switch
        checked={testChecked}
        onChange={(e) => testSwitch(e)}
        name="testUSwitch"
      />
    </div>
  );
};
export default CheckSwitch;
