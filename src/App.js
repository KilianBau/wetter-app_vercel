import "./App.css";
import Form from "./Components/Form";
import { uid } from "uid";
import List from "./Components/List";
import useLocalStorageState from "use-local-storage-state";
import { useEffect, useState } from "react";

function App() {
  const [entries, setEntries] = useLocalStorageState("entries", {
    defaultValue: [],
  });
  const [weather, setWeather] = useState([]);

  const isGoodWeather = weather.isGoodWeather;
  const goodWeatherActivity = entries.filter(
    (entry) => entry.isForGoodWeather === isGoodWeather
  );

  function handleDeleteEntry(id) {
    const deleteEntry = entries.filter((entry) => {
      if (entry.id === id) {
        return false;
      } else {
        return true;
      }
    });

    setEntries(deleteEntry);
  }

  function handleAddActivity(newEntry) {
    setEntries([...entries, { id: uid(), ...newEntry }]);
  }

  async function startFetching() {
    const response = await fetch("https://example-apis.vercel.app/api/weather");
    const weather = await response.json();

    setWeather(weather);
  }
  useEffect(() => {
    startFetching();
    const interval = setInterval(startFetching, 5000);
    return () => clearInterval(interval);
  }, []);

  const entriesId = entries.filter((entry) => entry.id);
  console.log(entriesId);
  return (
    <div className="App">
      <header>
        <h1>Weather & Activities App</h1>
        <span>
          {weather.condition} {weather.temperature}
        </span>
      </header>
      <main>
        <List
          entries={goodWeatherActivity}
          isGoodWeather={isGoodWeather}
          onDelete={handleDeleteEntry}
        />
        <Form onAddActivity={handleAddActivity} />
      </main>
    </div>
  );
}

export default App;
