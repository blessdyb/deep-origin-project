
import { faker } from '@faker-js/faker';
faker.seed(123);

export const users = Array.from({ length: 100 }, () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fullName = `${firstName} ${lastName}`;
  const email = faker.internet.email({ firstName, lastName }).toLowerCase();

  return {
    name: fullName,
    email,
    avatar: `https://i.pravatar.cc/100?u=${email}`
  };
}).sort((a, b) => a.name.localeCompare(b.name));

export async function GET(request: Request) {
  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
