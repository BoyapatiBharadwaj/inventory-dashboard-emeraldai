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
    const interval = setInterval(fetchInventory, 5000); // auto-refresh
    return () => clearInterval(interval);
  }, []);

  // Function to get row color based on quantity
  const getQuantityColor = (qty: number) => {
    if (qty === 0) return 'text-red-600 font-bold';
    if (qty <= 5) return 'text-yellow-600 font-semibold';
    return 'text-green-600 font-semibold';
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-700 font-medium">
          Last Refresh: {lastRefresh || 'Never'}
        </span>
        <button
          onClick={fetchInventory}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>

      <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-6 text-left">Item</th>
            <th className="py-3 px-6 text-left">Quantity</th>
            <th className="py-3 px-6 text-left">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {inventory.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-4 text-gray-500">
                No inventory data available.
              </td>
            </tr>
          ) : (
            inventory.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <td className="py-3 px-6">{item.name}</td>
                <td className={`py-3 px-6 ${getQuantityColor(item.quantity)}`}>
                  {item.quantity}
                </td>
                <td className="py-3 px-6">{item.lastUpdated}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
