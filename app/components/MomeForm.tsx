"use client";
import React, { useState } from "react";
import { Item } from "../types";

function MomeForm(props: { onSubmit: (data: Item) => void }) {
  const { onSubmit } = props;
  const [title, setTitle] = useState("");
  const [description, setDesription] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ date: new Date().toLocaleDateString(), title, description });
      }}
      className="flex flex-col gap-4"
    >
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full border-bg-main rounded"
          placeholder="2021/10/02"
        />
      </label>
      <button type="submit" className="bg-bg-main text-text-main p-2 rounded">
        もめごとを記録
      </button>
    </form>
  );
}

export default MomeForm;
