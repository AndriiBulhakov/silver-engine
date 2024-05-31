import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const apiKey = process.env.WEBFLOW_API_KEY

  try {
    const response = await fetch(
      "https://api.webflow.com/v2/collections/66504030e90df6ef962045dc/items",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const data = await response.json()

    const res = NextResponse.json(data)

    return res
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "An error occurred while fetching data." },
      { status: 500 }
    )
  }
}
