import { useEffect, useState } from "react";

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/inventory") // Next.js API route
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">📦 Inventory Dashboard</h1>
      <table className="min-w-full bg-white rounded-xl shadow-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Item</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Stock</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td className="py-2 px-4 border-b">{item.name}</td>
              <td className="py-2 px-4 border-b">{item.category}</td>
              <td className="py-2 px-4 border-b">{item.stock}</td>
              <td className={`py-2 px-4 border-b ${item.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                {item.stock > 0 ? "Available" : "Out of Stock"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
