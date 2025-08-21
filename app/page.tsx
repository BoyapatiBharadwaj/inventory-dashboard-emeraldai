'use client';
import { useEffect, useState } from 'react';

export default function InventoryDashboard() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    async function fetchInventory() {
      const res = await fetch('/api/inventory');
      const data = await res.json();
      setInventory(data);
    }
    fetchInventory();

    const interval = setInterval(fetchInventory, 5000); // optional: refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Inventory Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
