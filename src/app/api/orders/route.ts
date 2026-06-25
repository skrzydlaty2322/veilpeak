import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

interface CartItemInput {
  id: string;
  slug: string;
  name: string;
  price: number;
  image_url: string | null;
  quantity: number;
}

interface CustomerInput {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
}

interface OrderInput {
  items: CartItemInput[];
  customer: CustomerInput;
  total: number;
}

export async function POST(request: Request) {
  const body: OrderInput = await request.json();
  const { items, customer, total } = body;

  const { data, error } = await supabase
    .from("orders")
    .insert({ items, customer, total })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id: data.id });
}
