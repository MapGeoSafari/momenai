"use client";
import { ReactElement, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Item } from "../types";
import MomeItem from "./MomeItem";

function MomeList(props: {
  items: Item[];
  setEditing: (id: string | undefined) => void;
  deleteItem: (id: string) => void;
}): ReactElement {
  const { items, setEditing, deleteItem } = props;
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDateLocal = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dateStr = formatDateLocal(date);
      if (items.some(item => item.date === dateStr)) {
        return "recorded";
      }
    }
    return "";
  };

  return (
    <div className="p-2 w-full flex flex-col items-center">
      <Calendar
        className="rounded p-4"
        value={selectedDate}
        onChange={() => {}}
        onActiveStartDateChange={({ activeStartDate }) => {
          if (activeStartDate) {
            setSelectedDate(activeStartDate);
          }
        }}
        tileClassName={tileClassName}
      />
      <style jsx global>{`
        .react-calendar__tile.recorded {
          background: #4A76B3 !important;
          color: white !important;
          border-radius: 9999px !important;
        }
      `}</style>
      {items.map((item, index) => {
        if (new Date(item.date).getMonth() !== selectedDate.getMonth()) return null;
        return (
          <MomeItem
            key={index}
            item={item}
            setEditting={() => setEditing(item.id)}
            deleteItem={() => {
              deleteItem(item.id);
              setEditing(undefined);
            }}
          />
        );
      })}
    </div>
  );
}

export default MomeList;
