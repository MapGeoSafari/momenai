"use client";

import { useState } from 'react';
import { Item, TimestampedEvent } from '../types';

interface MomeFormProps {
  onSubmit: (data: Item) => void;
}

const MomeForm: React.FC<MomeFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [solutions, setSolutions] = useState<string[]>(['']);
  const [error, setError] = useState<string | null>(null);

  const handleSolutionChange = (index: number, value: string) => {
    const newSolutions = [...solutions];
    newSolutions[index] = value;
    setSolutions(newSolutions);
  };

  const addSolutionField = () => {
    setSolutions([...solutions, '']);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newItem = {
      title,
      description,
      content,
      solutions: solutions.filter(sol => sol.trim() !== ''),
    };

    try {
      const response = await fetch('/api/timestamp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        const data: { success: boolean; data: TimestampedEvent } = await response.json();
        if (data.success) {
          const item: Item = {
            id: data.data.id,
            title: data.data.title,
            description: data.data.description || '',
            date: new Date(data.data.timestamp).toLocaleDateString(),
            solutions: data.data.solutions,
            events: data.data.events || [],
            timestamp: data.data.timestamp,
          };
          onSubmit(item);
          setTitle('');
          setDescription('');
          setContent('');
          setSolutions(['']);
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'タイムスタンプの追加に失敗しました。');
      }
    } catch (err) {
      console.error(err);
      setError('タイムスタンプの追加中にエラーが発生しました。');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mome-form">
      <h2>もめごとを記録する</h2>
      {error && <p className="error">{error}</p>}
      <div>
        <label>タイトル</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>説明</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="もめごとの説明を入力"
        />
      </div>
      <div>
        <label>内容</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="もめごとの内容を入力"
        />
      </div>
      <div>
        <label>解決策</label>
        {solutions.map((solution, index) => (
          <input
            key={index}
            type="text"
            value={solution}
            onChange={(e) => handleSolutionChange(index, e.target.value)}
            placeholder={`解決策 ${index + 1}`}
          />
        ))}
        <button type="button" onClick={addSolutionField}>
          解決策を追加
        </button>
      </div>
      <button type="submit">記録する</button>
    </form>
  );
};

export default MomeForm;
