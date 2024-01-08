import PQueue from "p-queue";

/** PQueueインスタンス: 並列・非同期で10件まで実行する */
export const parallelRequestQueue = new PQueue({
  autoStart: true, // 同時実行制限内のキュータスクが追加されるとすぐに自動実行されるかどうか。
  concurrency: 10, // 同時実行制限
});
