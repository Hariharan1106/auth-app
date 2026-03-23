export default function Header({ title }) {
  return (
    <div className="bg-white-500 text-lime-700 p-4 border-b">
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
}