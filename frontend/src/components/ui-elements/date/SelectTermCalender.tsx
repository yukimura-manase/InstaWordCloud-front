/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import dayjs from "dayjs";
import { useState } from "react";
// import { DateRange } from "react-date-range";
import CalendarSvg from "../icons/CalendarSvg";
import { RangeKeyDict } from "react-date-range";
// import { DateRangePicker } from "react-date-range";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * NOTE: SelectTermCalender
 *  => カレンダーの設定 Component
 */
const SelectTermCalender = () => {
  const date = dayjs();
  /** 現在の年月日を文字列で取得する */
  const today = date.format("YYYY/MM/DD");

  // 最終日(範囲指定のEnd)
  const [endDate, setEndDate] = useState<string>(today);
  console.log("endDate", endDate);

  /** 6ヶ月前の日付 */
  const sixMonthsAgo = date.subtract(6, "month");
  const sixMonthsAgoDate = sixMonthsAgo.format("YYYY/MM/DD");

  // 開始日(範囲指定のStart)
  const [startDate, setStartDate] = useState<string>(sixMonthsAgoDate);
  console.log("startDate", startDate);

  /** カレンダー用の日付フォーマットに変更 */
  const pickerFormat = (date: string): string | null => {
    if (date == null || date === "") return null;
    return dayjs(date, "YYYY/MM/DD").format("DD/MM/YYYY");
  };

  const formattStartDate = pickerFormat(startDate);
  const formattEndDate = pickerFormat(endDate);
  console.log("formattStartDate", formattStartDate);
  console.log("formattEndDate", formattEndDate);

  console.log("Debug");

  // ((rangesByKey: RangeKeyDict) => void) | undefined
  const cahngeCalenderDate = (dates: RangeKeyDict) => {
    console.log("カレンダー Change");
    console.log("dates", dates);

    // if (dayjs(dates.startDate).unix() === dayjs(dates.endDate).unix()) {
    //   console.log("同じ日付なので、処理しない");
    //   return;
    // }
  };

  /** カレンダーの開閉・Style制御 */
  const [isOpenCalender, setIsOpenCalender] = useState(false);

  const [dateRange, setDateRange] = useState([null, null]);
  const [start, end] = dateRange;

  return (
    <div>
      <div
        css={css`
          position: relative;
        `}
      >
        {/* カレンダー・Icon & StartDate 〜 EndDate の表示 */}
        <div
          onClick={() => setIsOpenCalender(true)}
          css={css`
            display: flex;
            height: 24px;
            cursor: pointer;
            align-items: center;
            gap: 16px;
            border-radius: 8px;
            background-color: #ffffff;
            padding: 5px;
          `}
        >
          <CalendarSvg />
          <div
            css={css`
              font-family: "Roboto";
              font-size: 10px;
              font-weight: medium;
            `}
          >
            <span>{startDate}</span>
            <span>〜</span>
            <span>{endDate}</span>
          </div>
        </div>

        {/* 日付の範囲選択・カレンダー */}
        {isOpenCalender && (
          <div
            css={css`
              position: absolute;
              right: 0px;
              top: 30px;
              z-index: 100;
              box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
            `}
          >
            <DatePicker
              selectsRange={true}
              startDate={start}
              endDate={end}
              onChange={(update: any) => {
                setDateRange(update);
              }}
              isClearable={true}
            />
          </div>
        )}
        {/* カレンダーの外側(Outer)領域: Clickでカレンダーを閉じる */}
        {isOpenCalender && (
          <div
            onClick={() => setIsOpenCalender(false)}
            css={css`
              position: fixed;
              left: 0;
              top: 0;
              z-index: 99;
              height: 100vh;
              width: 100vw;
              background-color: rgba(64, 70, 84, 0.101961);
            `}
          ></div>
        )}
      </div>
    </div>
  );
};

export default SelectTermCalender;
