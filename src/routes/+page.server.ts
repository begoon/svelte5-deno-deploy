import { get } from '$lib/server/count.ts';

export async function load() {
  return {
    count: await get()
  };
}
