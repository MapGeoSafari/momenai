"use client";
import React, { ReactElement } from "react";
import { Item } from "../types";

function MemoItem(props: { item: Item }): ReactElement {
  const { item } = props;
  const { date, title, description, solutions, events } = item;
  return (
    <div className="w-full p-4 mt-2">
      <h2 className="font-bold p-2">{date}</h2>
      <div className="p-5 border border-bg-sub rounded">
        <h3 className="font-medium p-2">{title}</h3>
        <p className="text-sm pl-2">{description}</p>
      </div>
      <div className="p-5 border border-bg-sub rounded mt-3">
        <h3 className="font-medium p-2">こうするといいかも</h3>
        <ul className="text-sm pl-2 pb-3">
          {solutions &&
            solutions.map((solution, index) => (
              <li key={index} className="pt-1">
                {index + 1}. {solution}
              </li>
            ))}
        </ul>

        <h3 className="font-medium p-2">こんなことがあるかも</h3>
        <ul className="text-sm pl-2 pb-3">
          {events &&
            events.map((event, index) => (
              <li key={index} className="pt-1">
                <p>
                  {index + 1}. {event.problem}
                </p>
              </li>
            ))}
        </ul>

        <h3 className="font-medium p-2">さらにこうするといいかも</h3>
        <ul className="text-sm pl-2 pb-3">
          {events &&
            events.map((event, index) => (
              <li key={index}>
                <p>
                  <ul>
                    {event.soluions.map((solution, index) => (
                      <li key={index} className="pt-1">
                        {index + 1}. {solution}
                      </li>
                    ))}
                  </ul>
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

function MomeList(props: { items: Item[] }): ReactElement {
  const { items } = props;
  return (
    <div className="p-8 w-full">
      {items.map((item, index) => (
        <MemoItem key={index} item={item} />
      ))}
    </div>
  );
}
export default MomeList;
