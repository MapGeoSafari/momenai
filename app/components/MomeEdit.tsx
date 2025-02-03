"use client";
import React, { ReactElement, useState } from "react";
import { Item } from "../types";
import { set } from "react-hook-form";

function Section(props: {
  sectionTitle: string;
  items: string[];
  isNumbering?: boolean;
  onChange: (items: string[]) => void;
}): ReactElement {
  const { sectionTitle, items, isNumbering, onChange } = props;
  return (
    <>
      <h3 className="font-medium p-2">{sectionTitle}</h3>
      <ul className="text-sm pl-2 pb-3">
        {items.map((item, index) => (
          <li key={index} className="pt-1">
            {isNumbering ? `${index + 1}. ` : ""}
            <input
              type="text"
              className="border p-2 w-full border-bg-main rounded"
              onChange={(e) =>
                onChange(
                  items.map((i, idx) => (idx === index ? e.target.value : i))
                )
              }
              value={item}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

function MomeEdit(props: {
  editItem: Item;
  setEditItem: (item: Item) => void;
  setEditing: () => void;
}): ReactElement {
  const { editItem, setEditItem, setEditing } = props;
  const [item, setItem] = useState(editItem);
  const { date, title, description, solutions, message } = item;
  return (
    <div className="w-full p-4 mt-2">
      <div className="p-5 border border-bg-sub rounded">
        <input
          type="text"
          className="border p-2 w-full border-bg-main rounded"
          value={title}
          onChange={(e) => setItem({ ...item, title: e.target.value })}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setItem({ ...item, date: e.target.value })}
        />
        <input
          type="description"
          className="border p-2 w-full border-bg-main rounded"
          value={description}
          onChange={(e) => setItem({ ...item, description: e.target.value })}
        />
        <input
          type="message"
          className="border p-2 w-full border-bg-main rounded"
          value={message}
          onChange={(e) => setItem({ ...item, message: e.target.value })}
        />
        <Section
          sectionTitle="解決策"
          items={solutions || []}
          isNumbering
          onChange={(solutions) => setItem({ ...item, solutions })}
        />
      </div>
      <button
        type="button"
        className="bg-bg-main text-text-main p-2 rounded"
        onClick={() => setEditing()}
      >
        編集をキャンセル
      </button>
      <button
        type="button"
        className="bg-bg-main text-text-main p-2 rounded"
        onClick={() => {
          setEditItem(item);
          setEditing();
        }}
      >
        編集を完了
      </button>
    </div>
  );
}

export default MomeEdit;
