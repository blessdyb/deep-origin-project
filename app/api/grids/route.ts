import type { Grid } from "@/types";
import { users } from "@/data";

function getRandomItems<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

export async function GET(request: Request) {
  console.log(request.url);
  const grids: Grid[] = [
    {
      id: 1,
      name: "Full Columns",
      headers: ["Plasmid", "Volume", "Length", "Description", "Assigned"],
      data: [[
        { type: "link", label: "Link 1", url: "https://www.example.com" },
        { type: "tag", label: "Tag 1", id: "tag-1" },
        { type: "number", value: 121123.456 },
        { type: "text", value: "Text" },
        { type: "users", users: getRandomItems(users, 1) },
      ],
      [
        { type: "link", label: "Link 2", url: "https://www.example.com" },
        { type: "tag", label: "Tag 2", id: "tag-2" },
        { type: "number", value: 89.2 },
        { type: "text", value: "Text" },
        { type: "users", users: getRandomItems(users, 2) },
      ]]
    },
    {
      id: 2,
      name: "3 Columns",
      headers: ["Plasmid", "Volume", "Length", "Description", "Assigned"],
      data: [[
        { type: "link", label: "Link 1", url: "https://www.example.com" },
        { type: "tag", label: "Tag 1", id: "tag-1" },
        { type: "users", users: getRandomItems(users, 1) },
      ],
      [
        { type: "link", label: "Link 2", url: "https://www.example.com" },
        { type: "tag", label: "Tag 2", id: "tag-2" },
        { type: "users", users: getRandomItems(users, 2) },
      ]]
    },
  ];
  return new Response(JSON.stringify(grids), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
