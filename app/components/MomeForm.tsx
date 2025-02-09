"use client";
import { nanoid } from "nanoid";
import { ReactElement, useState } from "react";
import { Item } from "../types";

function MomeForm(props: {
  onSubmit: (data: Item) => void;
  cancelSubmit: () => void;
}): ReactElement {
  const { onSubmit, cancelSubmit } = props;
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");

  return (
    <div className="w-full sm:w-full md:w-3/4 lg:w-2/3 p-4 mt-2 mx-auto">
      <div className="p-5 border border-bg-sub rounded">
        <label className="block mb-4">
          日付
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 w-full border-bg-main rounded"
          />
        </label>
        <label className="block">
          もめごと
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full border-bg-main rounded"
            placeholder="ゴミ出しの当番を忘れてしまい、ケンカになりました。"
          />
        </label>
      </div>
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
          onClick={() => onSubmit({ id: nanoid(), date, description })}
        >
          もめごとを記録
        </button>
      </div>
    </div>
  );
}

export default MomeForm;
