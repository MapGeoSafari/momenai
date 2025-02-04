"use client";
import React, { ReactElement, useState } from "react";
import { Item } from "../types";
import MomeItem from "./MomeItem";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function MomeList(props: {
  items: Item[];
  setEditing: (id: string | undefined) => void;
  deleteItem: (id: string) => void;
}): ReactElement {
  const { items, setEditing, deleteItem } = props;
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
      {items.map((item, index) => {
        if (new Date(item.date).getMonth() !== selectedDate.getMonth())
          return null;
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
