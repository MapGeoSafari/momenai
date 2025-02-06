"use client";
import React, { ReactElement, useState } from "react";
import { Item } from "../types";
import { nanoid } from "nanoid";

function MomeForm(props: {
  onSubmit: (data: Item) => void;
  cancelSubmit: () => void;
}): ReactElement {
  const { onSubmit, cancelSubmit } = props;
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [description, setDesription] = useState("");
  return (
    <div className="flex flex-col gap-4 h-full">
      <label>
        もめごと
        <textarea
          value={description}
          onChange={(e) => setDesription(e.target.value)}
          className="border p-2 w-full h-20 border-bg-main rounded"
          placeholder="ゴミ出しの当番を忘れており、喧嘩になりました。"
        />
      </label>
      <label>
        日付
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full border-bg-main rounded"
          placeholder="2021/10/02"
        />
      </label>
      <div className="flex justify-center m-2 gap-2">
        <button
          type="button"
          className="bg-bg-main text-text-main p-2 rounded"
          onClick={cancelSubmit}
        >
          記録をキャンセル
        </button>
        <button
          type="button"
          className="bg-bg-main text-text-main p-2 rounded"
          onClick={(e) => onSubmit({ id: nanoid(), date, description })}
        >
          もめごとを記録
        </button>
      </div>
    </div>
  );
}

export default MomeForm;
