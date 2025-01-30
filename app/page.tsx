"use client";

import CalendarView from "./components/CalendarView";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MomeForm from "./components/MomeForm";
import MomeList from "./components/MomeList";
import useLocalStorage from "./hooks/useLocalStorage";
import { Item } from "./types";

export default function Home() {
  const [storedItems, setStoredItems] = useLocalStorage<Item[]>("items", []);

  const onSubmit = (data: Item) => {
    setStoredItems([data, ...storedItems]);
  };

  return (
    <div className="items-center justify-items-center max-w-xl mx-auto">
      <Header />
      <MomeForm onSubmit={onSubmit} />
      <CalendarView items={storedItems} />
      <MomeList items={storedItems} />
      <Footer />
    </div>
  );
}
