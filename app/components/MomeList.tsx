"use client";
import React, { ReactElement, useState } from "react";
import { Item } from "../types";
import MomeItem from "./MomeItem";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function MomeList(props: {
  items: Item[];
  setEditing: (flag: number | undefined) => void;
}): ReactElement {
  const { items, setEditing } = props;
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="p-2 w-full flex flex-col items-center">
      <Calendar
        className={"rounded p-4"}
        value={selectedDate}
        onChange={(date) => {
          if (date) {
            setSelectedDate(date as Date);
          }
        }}
        onActiveStartDateChange={({ activeStartDate }) => {
          if (activeStartDate) {
            setSelectedDate(activeStartDate);
          }
        }}
      />
      {items
        .filter(
          (item) => new Date(item.date).getMonth() === selectedDate.getMonth()
        )
        .map((item, index) => (
          <MomeItem
            key={index}
            item={item}
            setEditting={() => setEditing(index)}
          />
        ))}
    </div>
  );
}
export default MomeList;
