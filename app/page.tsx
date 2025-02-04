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
      id: "1",
      date: "2025/02/02",
      title: "もめごと1",
      description: "もめごとの詳細1",
      solutions: ["解決策1", "解決策2"],
    },
    {
      id: "2",
      date: "2025/02/01",
      title: "もめごと2",
      description: "もめごとの詳細2",
      solutions: ["解決策3", "解決策4"],
    },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | undefined>();
  const addItem = async (item: Item) => {
    const { message, solutions } = await fetch("/api/create", {
      method: "POST",
      body: JSON.stringify(item),
    }).then((res) => res.json());
    setStoredItems([...storedItems, { ...item, message, solutions }]);
    setIsAdding(false);
  };
  const editItem = async (item: Item) => {
    const { message, solutions } = await fetch("/api/create", {
      method: "POST",
      body: JSON.stringify(item),
    }).then((res) => res.json());

    setStoredItems(
      storedItems.map((storedItem) =>
        storedItem.id === item.id ? { ...item, message, solutions } : storedItem
      )
    );
    setIsEditing(undefined);
  };
  const deleteItem = (id: string) => {
    setStoredItems(storedItems.filter((item) => item.id !== id));
    setIsEditing(undefined);
  };

  return (
    <div className="items-center justify-items-center max-w-xl mx-auto">
      <Header />
      {!isAdding &&
        typeof isEditing === "string" &&
        storedItems.find((item) => item.id === isEditing) && (
          <MomeEdit
            editItem={storedItems.find((item) => item.id === isEditing)!}
            setEditItem={(item) => {
              editItem(item);
              setIsEditing(undefined);
            }}
            setEditing={() => setIsEditing(undefined)}
          />
        )}
      {!isAdding && typeof isEditing !== "string" && (
        <>
          <MomeList
            items={storedItems}
            setEditing={setIsEditing}
            deleteItem={deleteItem}
          />
          <div className="fixed bottom-4 right-4">
            <button
              onClick={() => {
                setIsAdding(true);
              }}
              className="rounded-full border-2 border-bg-bg-main w-12 h-12 flex items-center justify-center bg-bg-main text-text-main"
            >
              +
            </button>
          </div>
        </>
      )}
      {isAdding && (
        <MomeForm
          onSubmit={(item) => {
            addItem(item);
            setIsAdding(false);
          }}
        />
      )}
      <Footer />
    </div>
  );
}
