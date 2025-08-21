import { NextRequest, NextResponse } from 'next/server';

type InventoryItem = {
  name: string;
  quantity: number;
  lastUpdated: string;
};

let inventoryData: InventoryItem[] = [];

export async function POST(req: NextRequest) {
  const data: InventoryItem[] = await req.json();
  inventoryData = data; // update inventory
  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json(inventoryData);
}
