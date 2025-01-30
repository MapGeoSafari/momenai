"use client";

import { useState } from 'react';
import { Item, ProcessResponse } from '../types';

interface MomeListProps {
  items: Item[];
}

const MomeList: React.FC<MomeListProps> = ({ items }) => {
  const [processSteps, setProcessSteps] = useState<{ [key: string]: string[] }>({});

  const handleSolutionClick = async (itemId: string, solution: string) => {
    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ solution }),
      });

      if (response.ok) {
        const data: ProcessResponse = await response.json();
        if (data.success) {
          setProcessSteps(prev => ({
            ...prev,
            [itemId]: data.process,
          }));
        }
      } else {
        console.error('プロセスの取得に失敗しました。');
      }
    } catch (error) {
      console.error('プロセスの取得中にエラーが発生しました。', error);
    }
  };

  return (
    <div className="mome-list">
      <h2>記録されたもめごと</h2>
      {items.length === 0 ? (
        <p>まだもめごとはありません。</p>
      ) : (
        items.map(item => (
          <div key={item.id} className="mome-item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><strong>日時:</strong> {item.date}</p>
            <div>
              <strong>解決策:</strong>
              <ul>
                {item.solutions.map((solution, idx) => (
                  <li key={idx}>
                    {solution}{' '}
                    <button onClick={() => handleSolutionClick(item.id, solution)}>
                      プロセスを見る
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {processSteps[item.id] && (
              <div className="process-steps">
                <h4>プロセスステップ</h4>
                <ol>
                  {processSteps[item.id].map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MomeList;
