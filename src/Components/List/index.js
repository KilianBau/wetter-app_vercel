import "./list.css";

export default function List({
  entries,
  isGoodWeather,
  isForGoodWeather,
  onDelete,
}) {
  return (
    <>
      <h3>
        {isGoodWeather
          ? "The weather is awesome! Go outside - Your activities"
          : "Bad weather outside! Here's what you can do now:"}
      </h3>
      <ul className="entry-list">
        {entries.map((entry) => (
          <>
            <li className="entry-list__item" key={entry.id}>
              {entry.name}
              <button
                className="entry-list__item button"
                type="button"
                title="delete entry"
                onClick={() => onDelete(entry.id)}>
                ✕
              </button>
            </li>
          </>
        ))}
      </ul>
    </>
  );
}
