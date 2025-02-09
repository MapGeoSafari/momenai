"use client";
import { useState } from "react";

function Tutorial({ onClose }: { onClose: (persist: boolean) => void }) {
  const [dontShow, setDontShow] = useState(false);

  const handleClose = () => {
    onClose(dontShow);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-white/70"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
    >
      <div
        className="relative p-6 rounded shadow-lg max-w-md mx-auto"
        style={{ backgroundColor: "#4A76B3", color: "#ffffff" }}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-white text-2xl hover:text-gray-300 transition-colors cursor-pointer"
          aria-label="閉じる"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4">How to Use</h2>
        <p className="mb-4">
          momen.ai は、あなたの日常の摩擦や悩みを記録し、寄り添いながら具体的なアドバイスを提供します。
        </p>
        <ul className="list-disc pl-5">
          <li className="mb-2">
            <span
              className="inline-block px-2 py-1 bg-transparent text-white border border-white rounded-lg shadow"
            >
              ✏️もめごと記録
            </span>
            　で記録できます。
          </li>
          <li className="mb-2">カレンダーで記録を振り返りましょう。</li>
        </ul>

        <div className="flex items-center justify-center mt-4">
          <input
            type="checkbox"
            id="dontShow"
            className="mr-2"
            checked={dontShow}
            onChange={(e) => setDontShow(e.target.checked)}
          />
          <label htmlFor="dontShow" className="text-white">
            次から表示しない
          </label>
        </div>
      </div>
    </div>
  );
}

export default Tutorial;
