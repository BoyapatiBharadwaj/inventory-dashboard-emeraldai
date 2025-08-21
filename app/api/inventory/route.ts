import { NextRequest, NextResponse } from 'next/server';

type InventoryItem = {
  name: string;
  quantity: number;
};

let inventoryData: InventoryItem[] = []; // We'll store data here temporarily

export async function POST(req: NextRequest) {
  const data = await req.json();
  inventoryData = data; // Update inventory with n8n payload
  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json(inventoryData); // Return current inventory
}
