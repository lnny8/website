export async function POST(req: Request) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(await req.json()),
  })
  const data = await response.json()
  return Response.json(data)
}
