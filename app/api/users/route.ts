import { users } from "@/data";

export async function GET(request: Request) {
  console.log(request.url);
  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
