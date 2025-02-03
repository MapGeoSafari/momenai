"use client";
import Header from "./components/Header";
import MomeForm from "./components/MomeForm";
import MomeList from "./components/MomeList";
import { Item } from "./types";
import Footer from "./components/Footer";
import useLocalStorage from "./hooks/useLocalStorage";
import { useState } from "react";
import MomeEdit from "./components/MomeEdit";

export default function Home() {
  const [storedItems, setStoredItems] = useLocalStorage<Item[]>("items", [
    {
      date: "2025/02/02",
      title: "もめごと1",
      description: "もめごとの詳細1",
      solutions: ["解決策1", "解決策2"],
    },
    {
      date: "2025/02/01",
      title: "もめごと2",
      description: "もめごとの詳細2",
      solutions: ["解決策3", "解決策4"],
    },
  ]);
  const [isEditing, setIsEditing] = useState<number | undefined>();

  return (
    <div className="items-center justify-items-center max-w-xl mx-auto">
      <Header />
      {isEditing && (
        <MomeEdit
          editItem={storedItems[isEditing]}
          setEditItem={(editItem) => {
            setStoredItems(
              storedItems.map((storedItem, index) =>
                index === isEditing ? editItem : storedItem
              )
            );
            setIsEditing(undefined);
          }}
          setEditing={() => setIsEditing(undefined)}
        />
      )}
      {!isEditing && <MomeList items={storedItems} />}
      <Footer />
    </div>
  );
}
