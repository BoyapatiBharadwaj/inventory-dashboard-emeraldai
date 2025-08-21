'use client';
import { useEffect, useState } from 'react';

type InventoryItem = {
  name: string;
  quantity: number;
  lastUpdated: string;
};

export default function InventoryDashboard() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    async function fetchInventory() {
      const res = await fetch('/api/inventory');
      const data: InventoryItem[] = await res.json();
      setInventory(data);
    }
    fetchInventory();

    const interval = setInterval(fetchInventory, 5000); // refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-auto">
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
              <td colSpan={3} className="text-center py-4">
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
                <td className="py-3 px-6">{item.quantity}</td>
                <td className="py-3 px-6">{item.lastUpdated}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
