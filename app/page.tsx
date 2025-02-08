"use client";
import Header from "./components/Header";
import MomeForm from "./components/MomeForm";
import MomeList from "./components/MomeList";
import { Item } from "./types";
import Footer from "./components/Footer";
import useLocalStorage from "./hooks/useLocalStorage";

export default function Home() {
  const [storedItems, setStoredItems] = useLocalStorage<Item[]>("items", [
    {
      date: "2021/10/02",
      title: "もめごと1",
      description: "もめごとの詳細1",
      solutions: ["解決策1", "解決策2"],
      events: [
        {
          problem: "類似事象1",
          soluions: ["予防策1", "予防策2"],
        },
        {
          problem: "類似事象2",
          soluions: ["予防策3", "予防策4"],
        },
      ],
    },
    {
      date: "2021/10/01",
      title: "もめごと2",
      description: "もめごとの詳細2",
      solutions: ["解決策3", "解決策4"],
      events: [
        {
          problem: "類似事象3",
          soluions: ["予防策5", "予防策6"],
        },
        {
          problem: "類似事象4",
          soluions: ["予防策7", "予防策8"],
        },
      ],
    },
  ]);

  const onSubmit = (data: Item) => {
    setStoredItems([data, ...storedItems]);
  };

  return (
    <div className="items-center justify-items-center max-w-xl mx-auto">
      <Header />
      <MomeForm onSubmit={onSubmit} />
      <MomeList items={storedItems} />
      <Footer />
    </div>
  );
}
