import { NextResponse } from "next/server"

export function GET() {
  const timestamp = new Date().toISOString()
  return NextResponse.json({ timestamp }, { status: 200 })
}
