'use client';
import { useEffect, useState } from 'react';

type InventoryItem = {
  name: string;
  quantity: number;
  lastUpdated: string;
};

export default function InventoryDashboard() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [lastRefresh, setLastRefresh] = useState<string>('');

  async function fetchInventory() {
    const res = await fetch('/api/inventory');
    const data: InventoryItem[] = await res.json();
    setInventory(data);

    const now = new Date();
    setLastRefresh(now.toLocaleString());
  }

  useEffect(() => {
    fetchInventory();
    const interval = setInterval(fetchInventory, 5000);
    return () => clearInterval(interval);
  }, []);

  // Stock color styles
  const getStockStyles = (qty: number) => {
    if (qty === 0) return "bg-gradient-to-br from-red-100 via-red-50 to-white text-red-700 border-red-300";
    if (qty <= 5) return "bg-gradient-to-br from-yellow-100 via-yellow-50 to-white text-yellow-700 border-yellow-300";
    return "bg-gradient-to-br from-green-100 via-green-50 to-white text-green-700 border-green-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex flex-col items-center py-12 px-6">
      {/* Title */}
      <h1 className="text-6xl font-extrabold text-indigo-800 drop-shadow-md mb-10 text-center tracking-tight">
        📦 Inventory Dashboard
      </h1>

      {/* Refresh Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-6xl mb-10 gap-4">
        <span className="text-gray-600 font-medium text-lg">
          ⏳ Last Refresh: <span className="font-semibold text-indigo-700">{lastRefresh || 'Never'}</span>
        </span>
        <button
          onClick={fetchInventory}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl shadow-lg hover:bg-indigo-700 hover:shadow-xl transition"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Cards Grid */}
      {inventory.length === 0 ? (
        <div className="mt-24 text-gray-500 italic text-2xl font-light">
          🚫 No inventory data available.
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-6xl">
          {inventory.map((item, index) => (
            <div
              key={index}
              className={`p-8 border rounded-3xl shadow-xl ${getStockStyles(
                item.quantity
              )} hover:scale-105 hover:shadow-2xl transform transition duration-300`}
            >
              <h2 className="text-2xl font-bold mb-3 text-gray-900">{item.name}</h2>
              <p className="text-lg mb-2">
                <span className="font-semibold">Quantity:</span>{" "}
                <span className="text-xl font-bold">{item.quantity}</span>
              </p>
              <p className="text-sm text-gray-600 mt-2 italic">
                Last Updated: {item.lastUpdated}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
