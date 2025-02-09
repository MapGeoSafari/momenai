"use client";
import Head from "next/head";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MomeEdit from "./components/MomeEdit";
import MomeForm from "./components/MomeForm";
import MomeList from "./components/MomeList";
import Tutorial from "./components/Tutorial";
import useLocalStorage from "./hooks/useLocalStorage";
import { Item } from "./types";

export default function Home() {
  const [storedItems, setStoredItems] = useLocalStorage<Item[]>("items", []);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | undefined>();
  const [tutorialShown, setTutorialShown] = useLocalStorage<boolean>("tutorialShown", false);

  const [showTutorial, setShowTutorial] = useState(true);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleTutorialClose = (persist: boolean) => {
    if (persist) {
      setTutorialShown(true);
    }
    setShowTutorial(false);
  };

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
      console.log(responseJson.candidates);
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
      console.log(responseJson.candidates);
      console.log(responseJson.candidates[0].content.parts[0]);
      const { message, solutions } = JSON.parse(
        responseJson.candidates[0].content.parts[0].text
      );

      setStoredItems(
        storedItems.map((storedItem) =>
          storedItem.id === item.id ? { ...item, message, solutions } : storedItem
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
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <div className="w-full">
          <Header />
        </div>
        <main className="flex-grow">
          <div className="max-w-xl mx-auto relative">
            <div className="text-center mt-4 mb-6">
              <h1 className="font-bold whitespace-nowrap text-lg sm:text-xl md:text-2xl">
                もめごとを記録して、解決のヒントを得よう。
              </h1>
            </div>

            {(!tutorialShown && showTutorial) && <Tutorial onClose={handleTutorialClose} />}

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
                <div className="mb-4 text-center">
                  <button
                    onClick={() => setIsAdding(true)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-[#4A76B3] hover:bg-[#3A5E91] focus:outline-none transition-colors cursor-pointer"
                    style={{ color: "#ffffff" }}
                  >
                    ✏️もめごと記録
                  </button>
                </div>

                <MomeList
                  items={storedItems}
                  setEditing={setIsEditing}
                  deleteItem={deleteItem}
                />
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
          </div>
        </main>

        <div className="w-full">
          <Footer />
        </div>
      </div>
    </>
  );
}
