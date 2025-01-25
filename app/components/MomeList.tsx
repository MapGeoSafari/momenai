"use client";
import React, { ReactElement } from "react";
import { Item } from "../types";

function Section(props: {
  sectionTitle: string;
  items: string[];
}): ReactElement {
  const { sectionTitle, items } = props;
  return (
    <>
      <h3 className="font-medium p-2">{sectionTitle}</h3>
      <ul className="text-sm pl-2 pb-3">
        {items.map((item, index) => (
          <li key={index} className="pt-1">
            {index + 1}. {item}
          </li>
        ))}
      </ul>
    </>
  );
}

function MomeItem(props: { item: Item }): ReactElement {
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
        <Section sectionTitle="こうするといいかも" items={solutions || []} />
        <Section
          sectionTitle="こんなことがあるかも"
          items={events?.map((event) => event.problem) || []}
        />
        <Section
          sectionTitle="さらにこうするといいかも"
          items={events?.flatMap((event) => event.soluions) || []}
        />
      </div>
    </div>
  );
}

function MomeList(props: { items: Item[] }): ReactElement {
  const { items } = props;
  return (
    <div className="p-8 w-full">
      {items.map((item, index) => (
        <MomeItem key={index} item={item} />
      ))}
    </div>
  );
}
export default MomeList;
