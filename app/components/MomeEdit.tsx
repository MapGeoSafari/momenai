"use client";
import { ReactElement, useState } from "react";
import { Item } from "../types";

function MomeEdit(props: {
  editItem: Item;
  setEditItem: (item: Item) => void;
  cancelEditing: () => void;
}): ReactElement {
  const { editItem, setEditItem, cancelEditing } = props;
  const [item, setItem] = useState(editItem);
  const { date, description } = item;
  return (
    <div className="w-full sm:w-full md:w-3/4 lg:w-2/3 p-4 mt-2">
      <div className="p-5 border border-bg-sub rounded">
        <label>
          日付
          <input
            type="date"
            className="border p-2 w-full border-bg-main rounded"
            value={date}
            onChange={(e) => setItem({ ...item, date: e.target.value })}
          />
        </label>
        <label>
          もめごと
          <textarea
            rows="3"
            className="border p-2 w-full border-bg-main rounded"
            value={description}
            onChange={(e) => setItem({ ...item, description: e.target.value })}
          ></textarea>
        </label>
      </div>
      <div className="flex justify-center m-2 gap-2">
        <button
          type="button"
          className="bg-bg-main text-text-main p-2 rounded"
          onClick={() => cancelEditing()}
        >
          編集をキャンセル
        </button>
        <button
          type="button"
          className="bg-bg-main text-text-main p-2 rounded"
          onClick={() => {
            setEditItem(item);
            cancelEditing();
          }}
        >
          編集を完了
        </button>
      </div>
    </div>
  );
}

export default MomeEdit;
