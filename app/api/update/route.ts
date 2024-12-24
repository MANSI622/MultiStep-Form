import { NextResponse } from "next/server";

let formData = {
  personalInfo: { name: "", email: "" },
  addressDetails: { address: "", city: "" },
  preferences: { newsletter: false, notifications: false },
};

export async function GET() {
  return NextResponse.json(formData);
}

export async function POST(request: Request) {
  const updates = await request.json();
  formData = { ...formData, ...updates };
  return NextResponse.json({ success: true });
}
