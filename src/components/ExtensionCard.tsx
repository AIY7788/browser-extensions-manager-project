import "./ExtensionCard.css";
import { useState, useEffect, type ChangeEvent } from "react";

type Extension = {
  id: number;
  logo: string;
  name: string;
  description: string;
  isActive: boolean;
};

export function ExtensionCard({ filter }: { filter: string }) {
  const [data, setData] = useState<Extension[]>(() => {
    const savedData = localStorage.getItem("extensionsData");
    return savedData ? JSON.parse(savedData) : [];
  });

  const loadData = async () => {
    const res = await fetch(import.meta.env.BASE_URL + "data.json");
    const data = await res.json();

    setData(data);
    localStorage.setItem("extensionsData", JSON.stringify(data));
  };

  if (data.length === 0) {
    loadData();
  }

  useEffect(() => {
    const savedData = localStorage.getItem("extensionsData");
    if (savedData) return;
    const load = async () => await loadData();
    load();
  }, []);

  const handleRemove = async (id: number) => {
    setData((prevData) => {
      const newData = prevData.filter((extension) => extension.id !== id);
      localStorage.setItem("extensionsData", JSON.stringify(newData));
      return newData;
    });
  };

  const handleSwitch = (e: ChangeEvent<HTMLInputElement>) => {
    const card = e.target.closest(".extension-card");
    const id = card?.getAttribute("data-id"); // string | null
    if (!id) return;

    setData((prevData) => {
      const newData = prevData.map((extension) =>
        extension.id === Number(id)
          ? { ...extension, isActive: e.target.checked }
          : extension
      );
      localStorage.setItem("extensionsData", JSON.stringify(newData));
      return newData;
    });
  };

  const filteredData = data.filter((extension) => {
    if (filter === "active") return extension.isActive;
    if (filter === "inactive") return !extension.isActive;
    return true;
  });

  return (
    <main className="extensions-container">
      {Array.isArray(filteredData) &&
        filteredData.length > 0 &&
        filteredData.map((extension) => {
          return (
            <div
              className="extension-card"
              data-id={extension.id}
              key={extension.id}
            >
              <div className="ex-top">
                <img
                  className="ex-icon"
                  src={extension.logo}
                  alt={extension.name}
                />

                <div className="ex-info">
                  <h2 className="extension-name">{extension.name}</h2>
                  <p className="ex-description">{extension.description}</p>
                </div>
              </div>

              <div className="ex-bottom">
                <button onClick={() => handleRemove(extension.id)}>
                  Remove
                </button>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={extension.isActive}
                    onChange={handleSwitch}
                  />
                  <span className="slider round" />
                </label>
              </div>
            </div>
          );
        })}
    </main>
  );
}
