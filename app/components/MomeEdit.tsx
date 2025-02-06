"use client";
import React, { ReactElement, useState } from "react";
import { Item } from "../types";

function MomeEdit(props: {
  editItem: Item;
  setEditItem: (item: Item) => void;
  cancelEditing: () => void;
}): ReactElement {
  const { editItem, setEditItem, cancelEditing } = props;
  const [item, setItem] = useState(editItem);
  const { date, title, description } = item;
  return (
    <div className="w-full p-4 mt-2">
      <div className="p-5 border border-bg-sub rounded">
        <label>
          もめごとタイトル
          <input
            type="text"
            className="border p-2 w-full border-bg-main rounded"
            value={title}
            onChange={(e) => setItem({ ...item, title: e.target.value })}
          />
        </label>
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
          詳細
          <input
            type="description"
            className="border p-2 w-full border-bg-main rounded"
            value={description}
            onChange={(e) => setItem({ ...item, description: e.target.value })}
          />
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
