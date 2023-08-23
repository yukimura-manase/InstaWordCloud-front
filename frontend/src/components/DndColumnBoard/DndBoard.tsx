import "./styles.css";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Column, { ColumnType } from "./Column";
import { useState } from "react";

/** DndBoard */
export default function DndBoard() {
  /** Column_ListData (Test_Data) */
  const data: ColumnType[] = [
    {
      id: "Column1",
      title: "Column1",
      cards: [
        {
          id: "Card1",
          title: "Card1",
        },
        {
          id: "Card2",
          title: "Card2",
        },
      ],
    },
    {
      id: "Column2",
      title: "Column2",
      cards: [
        {
          id: "Card3",
          title: "Card3",
        },
        {
          id: "Card4",
          title: "Card4",
        },
      ],
    },
  ];

  /** Column_List_State  */
  const [columns, setColumns] = useState<ColumnType[]>(data);

  /** Columnを探す Func */
  const findColumn = (unique: string | null) => {
    // console.log("unique", unique);
    if (!unique) {
      return null;
    }
    // overの対象がcolumnの場合があるためそのままidを返す
    if (columns.some((c) => c.id === unique)) {
      return columns.find((c) => c.id === unique) ?? null;
    }
    const id = String(unique);
    const itemWithColumnId = columns.flatMap((c) => {
      const columnId = c.id;
      return c.cards.map((i) => ({ itemId: i.id, columnId: columnId }));
    });
    const columnId = itemWithColumnId.find((i) => i.itemId === id)?.columnId;
    return columns.find((c) => c.id === columnId) ?? null;
  };

  /** Drag_Over_Func */
  const handleDragOver = (event: DragOverEvent) => {
    console.log("handleDragOver_Start ------------------------------");
    /** Active_Component, Over_Component, Delta_座標データ */
    const { active, over, delta } = event;
    // console.log("active", active);
    // console.log("over", over);
    // console.log("delta", delta);
    /** Active_Component_Id */
    const activeId = String(active.id);
    console.log("activeId", activeId);

    /** Over_Component_Id */
    const overId = over ? String(over.id) : null;
    console.log("overId", overId);

    /**  */
    const activeColumn = findColumn(activeId);
    // console.log("activeColumn", activeColumn);

    /**  */
    const overColumn = findColumn(overId);
    // console.log("overColumn", overColumn);

    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return null;
    }
    setColumns((prevState) => {
      const activeItems = activeColumn.cards;
      const overItems = overColumn.cards;
      const activeIndex = activeItems.findIndex((i) => i.id === activeId);
      const overIndex = overItems.findIndex((i) => i.id === overId);
      const newIndex = () => {
        const putOnBelowLastItem =
          overIndex === overItems.length - 1 && delta.y > 0;
        const modifier = putOnBelowLastItem ? 1 : 0;
        return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      };
      return prevState.map((c) => {
        if (c.id === activeColumn.id) {
          c.cards = activeItems.filter((i) => i.id !== activeId);
          return c;
        } else if (c.id === overColumn.id) {
          c.cards = [
            ...overItems.slice(0, newIndex()),
            activeItems[activeIndex],
            ...overItems.slice(newIndex(), overItems.length),
          ];
          return c;
        } else {
          return c;
        }
      });
    });
  };

  /** Drag_End_Func */
  const handleDragEnd = (event: DragEndEvent) => {
    console.log("handleDragEnd_Start ------------------------------");
    const { active, over } = event;
    const activeId = String(active.id);
    console.log("activeId", activeId);
    const overId = over ? String(over.id) : null;
    console.log("overId", overId);
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      return null;
    }
    const activeIndex = activeColumn.cards.findIndex((i) => i.id === activeId);
    const overIndex = overColumn.cards.findIndex((i) => i.id === overId);
    if (activeIndex !== overIndex) {
      setColumns((prevState) => {
        return prevState.map((column) => {
          if (column.id === activeColumn.id) {
            column.cards = arrayMove(overColumn.cards, activeIndex, overIndex);
            return column;
          } else {
            return column;
          }
        });
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    // ドラッグ&ドロップをするためのコンポーネントを操作可能にするために DndContext を定義する
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div
        className="App"
        style={{ display: "flex", flexDirection: "row", padding: "20px" }}
      >
        {columns.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            cards={column.cards}
          ></Column>
        ))}
      </div>
    </DndContext>
  );
}
