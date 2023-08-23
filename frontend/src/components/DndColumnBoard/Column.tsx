import { FC } from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Card, { CardType } from "./Card";

export type ColumnType = {
  id: string;
  title: string;
  cards: CardType[];
};

/** useDroppable を利用して、ドロップ可能なコンポーネントを定義 */
const Column: FC<ColumnType> = ({ id, title, cards }) => {
  /** useDroppable を利用して、ドロップ可能なコンポーネントを定義 */
  const { setNodeRef } = useDroppable({ id: id });
  // console.log("Column_id", id);

  return (
    // SortableContext: ソートを行うためのContextです。
    // strategy は4つほど存在しますが、今回は縦・横移動可能なリストを作るため rectSortingStrategyを採用
    <SortableContext id={id} items={cards} strategy={rectSortingStrategy}>
      <div
        ref={setNodeRef}
        style={{
          width: "200px",
          background: "rgba(245,247,249,1.00)",
          marginRight: "10px",
        }}
      >
        <p
          style={{
            padding: "5px 20px",
            textAlign: "left",
            fontWeight: "500",
            color: "#575757",
          }}
        >
          {title}
        </p>
        {cards.map((card) => (
          <Card key={card.id} id={card.id} title={card.title}></Card>
        ))}
      </div>
    </SortableContext>
  );
};

export default Column;
