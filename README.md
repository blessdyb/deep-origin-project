This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Deploy on Vercel

You can use this link to check it on [`Vercel`](https://deep-origin-project.vercel.app/)

## Run it in local

```bash
pnpm i && pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Architecture
* The project is built with Next.js to leverage its modern App Router for quickly setting up mock API routes during development.
* FakeJS is used to generate mock user data.
* For simplicity, Redux or other global state management libraries are intentionally omitted.

## Assumptions
* The grid supports a fixed set of 5 columns.
* Backend APIs are assumed to return valid data, with correctness enforced via TypeScript type checking.

## Known Issues & Suggested Improvements
* Rendering performance is not optimized for thousands of rows. Currently, all rows are rendered in the DOM. To improve this, we can implement virtualization using the Intersection Observer API — replacing off-screen rows with fixed-height placeholders.
* For tens of thousands of records, performance can be further improved by adding pagination or by rendering the table with Canvas, similar to how Google Sheets handles large datasets.
* Error handling is limited. If the backend fails to return data or returns an invalid response, the app currently lacks graceful fallback or error messaging.
* Backend persistence of cell edits
