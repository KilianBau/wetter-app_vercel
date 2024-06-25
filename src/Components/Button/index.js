export default function Button({ children, type, onAddActivity }) {
  return (
    <button onClick={onAddActivity} type={type} className="button">
      {children}
    </button>
  );
}
