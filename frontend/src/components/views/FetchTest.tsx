import { parallelRequestQueue } from "../../libs/pqueue/parallelRequestQueue";

/** 大量の非同期の並列処理・Fetch Test */
const FetchTest = () => {
  console.group("FetchTest");

  // 並列処理のキューを作成
  const todoFetch = async () => {
    /** 非同期実行・タスクリスト */
    const tasks = [] as Array<() => Promise<void>>;

    /** JSON Place Holder の TODO id List */
    const jsonplaceholderIdList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    // 並列処理のタスクを作成する
    jsonplaceholderIdList.forEach((id) => {
      tasks.push(async () => {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/todos/${id}`
        );
        const json = await res.json();
        console.log(json);
      });
    });

    // addAll で 10件まで非同期・並列処理
    await parallelRequestQueue.addAll(tasks);

    console.groupEnd();
  };

  /** 並列・非同期処理を実行する */
  todoFetch();
  return (
    <div>
      <div>大量の非同期の並列処理・Fetch Test</div>
    </div>
  );
};

export default FetchTest;
