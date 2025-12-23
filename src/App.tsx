import { Header } from "./components/Header";
import { ExtensionCard } from "./components/ExtensionCard";
import "./App.css";
import { useState, type MouseEvent } from "react";

function App() {
  const [filter, setFilter] = useState<string>("all");

  const handleSwitchFilter = (e: MouseEvent<HTMLButtonElement>) => {
    setFilter(e.currentTarget.value);
  };

  console.log(filter);
  return (
    <>
      <Header />

      <div className="extensions-list">
        <div className="container-filter">
          <h1>Extensions List</h1>
          <div className="filter">
            <button
              value="all"
              className={filter === "all" ? "active" : ""}
              onClick={handleSwitchFilter}
            >
              All
            </button>
            <button
              value="active"
              className={filter === "active" ? "active" : ""}
              onClick={handleSwitchFilter}
            >
              Active
            </button>
            <button
              value="inactive"
              className={filter === "inactive" ? "active" : ""}
              onClick={handleSwitchFilter}
            >
              Inactive
            </button>
          </div>
        </div>

        <ExtensionCard filter={filter} />
      </div>
    </>
  );
}

export default App;
