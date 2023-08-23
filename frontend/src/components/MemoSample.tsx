// import React, { useMemo, memo } from 'react';

// function ExpensiveComponent({ data }) {
//   const result = useMemo(() => {
//     // dataを使って計算が行われる
//     return performExpensiveCalculation(data);
//   }, [data]); // dataが変化した場合だけ再計算される

//   return <div>{result}</div>;
// }

// const MemoizedComponent = memo(({ data }) => {
//   return <div>{data}</div>;
// });
