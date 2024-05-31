import axios from "axios"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const apiKey = process.env.WEBFLOW_API_KEY

  try {
    const response = await axios.get(
      "https://api.webflow.com/v2/collections/66504029b42db170eb90edfd/items",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    )

    const res = NextResponse.json(response.data)
    res.headers.set("Cache-Control", "s-maxage=60, stale-while-revalidate")

    return res
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "An error occurred while fetching data." },
      { status: 500 }
    )
  }
}
