import { json, type RequestEvent } from '@sveltejs/kit';

import { get, set, update } from '$lib/server/count.ts';

export async function GET(request: RequestEvent) {
  return json({ value: await get() });
}

export async function PUT(request: RequestEvent) {
  const { value } = request.params;
  return json({ value: await set(Number(value)) });
}

export async function PATCH(request: RequestEvent) {
  const { value } = request.params;
  return json({ value: await update(Number(value)) });
}
