"use client";

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Item } from '../types';

interface CalendarViewProps {
  items: Item[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ items }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (value: Date | Date[] | null) => {
    setSelectedDate(value as Date);
  };

  const formattedDate = selectedDate
    ? `${selectedDate.getFullYear()}/${String(selectedDate.getMonth() + 1).padStart(2, '0')}/${String(selectedDate.getDate()).padStart(2, '0')}`
    : '';

  const eventsForSelectedDate = items.filter(item => item.date === formattedDate);

  return (
    <div className="calendar-view">
      <h2>タイムスタンプカレンダー</h2>
      <Calendar onChange={(value) => handleDateChange(value as Date)} />
      {selectedDate && (
        <div className="selected-date-events">
          <h3>{formattedDate} のイベント</h3>
          {eventsForSelectedDate.length > 0 ? (
            eventsForSelectedDate.map(item => (
              <div key={item.id} className="event-item">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                {/* 他の詳細も表示可能 */}
              </div>
            ))
          ) : (
            <p>イベントはありません。</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarView;
