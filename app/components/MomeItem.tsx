"use client";
import React, { ReactElement } from "react";
import { Item } from "../types";

function Section(props: {
  sectionTitle: string;
  items: string[];
  isNumbering?: boolean;
}): ReactElement {
  const { sectionTitle, items, isNumbering } = props;
  return (
    <>
      <h3 className="font-medium p-2">{sectionTitle}</h3>
      <ul className="text-sm pl-2 pb-3">
        {items.map((item, index) => (
          <li key={index} className="pt-1">
            {isNumbering ? `${index + 1}. ` : ""}
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

function MomeItem(props: {
  item: Item;
  setEditting: () => void;
}): ReactElement {
  const { item, setEditting } = props;
  const { date, title, description, solutions, message } = item;
  return (
    <div className="w-full p-4 mt-2">
      <div className="p-5 border border-bg-sub rounded">
        <div className="flex">
          <div>
            <h3 className="font-medium p-2">{title}</h3>
            <p className="text-sm pl-2">{date}</p>
          </div>
          <button className="bg-bg-main text-text-main p-2 rounded ml-auto">
            削除
          </button>
          <button
            className="bg-bg-main text-text-main p-2 rounded ml-2"
            onClick={() => setEditting()}
          >
            編集
          </button>
        </div>
        {description && <Section sectionTitle="詳細" items={[description]} />}
        {message && <Section sectionTitle="一言" items={[message]} />}
        {solutions && (
          <Section sectionTitle="解決策" items={solutions || []} isNumbering />
        )}
      </div>
    </div>
  );
}

export default MomeItem;
