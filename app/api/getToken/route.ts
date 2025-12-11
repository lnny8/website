import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET // starkes, langes Secret!

export async function POST(req: Request) {
  const {code} = await req.json()
  if (code !== process.env.ACCESS_CODE) {
    return new Response("Forbidden", {status: 403})
  }

  const token = jwt.sign({allowed: true}, SECRET, {expiresIn: "20m"})

  return Response.json({token})
}
