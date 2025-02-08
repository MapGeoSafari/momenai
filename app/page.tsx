"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MomeEdit from "./components/MomeEdit";
import MomeForm from "./components/MomeForm";
import MomeList from "./components/MomeList";
import useLocalStorage from "./hooks/useLocalStorage";
import { Item } from "./types";

export default function Home() {
  const [storedItems, setStoredItems] = useLocalStorage<Item[]>("items", [
    // {
    //   id: "1",
    //   date: "2025/02/02",
    //   title: "もめごと1",
    //   description: "もめごとの詳細1",
    //   solutions: ["解決策1", "解決策2"],
    // },
    // {
    //   id: "2",
    //   date: "2025/02/01",
    //   title: "もめごと2",
    //   description: "もめごとの詳細2",
    //   solutions: ["解決策3", "解決策4"],
    // },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | undefined>();
  const addItem = async (item: Item) => {
    try {
      const response = await fetch("/api/create", {
        method: "POST",
        body: JSON.stringify(item),
      });
      const responseJson = await response.json();
      if (responseJson.candidates.length === 0)
        throw new Error("No candidates found");
      if (responseJson.candidates[0].content.parts.length === 0)
        throw new Error("No parts found");
      console.log(responseJson);
      console.log(responseJson.andidates);
      console.log(responseJson.candidates[0].content.parts[0]);
      const { message, solutions } = JSON.parse(
        responseJson.candidates[0].content.parts[0].text
      );

      setStoredItems([...storedItems, { ...item, message, solutions }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAdding(false);
    }
  };
  const editItem = async (item: Item) => {
    try {
      const response = await fetch("/api/create", {
        method: "POST",
        body: JSON.stringify(item),
      });
      const responseJson = await response.json();
      if (responseJson.candidates.length === 0)
        throw new Error("No candidates found");
      if (responseJson.candidates[0].content.parts.length === 0)
        throw new Error("No parts found");
      console.log(responseJson);
      console.log(responseJson.andidates);
      console.log(responseJson.candidates[0].content.parts[0]);
      const { message, solutions } = JSON.parse(
        responseJson.candidates[0].content.parts[0].text
      );

      setStoredItems(
        storedItems.map((storedItem) =>
          storedItem.id === item.id
            ? { ...item, message, solutions }
            : storedItem
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsEditing(undefined);
    }
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
            cancelEditing={() => setIsEditing(undefined)}
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
              <Icon icon="mdi-light:plus" />
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
          cancelSubmit={() => setIsAdding(false)}
        />
      )}
      <Footer />
    </div>
  );
}
