const kv = await Deno.openKv();

export async function get() {
  return (await kv.get<number>(['count'])).value || 0;
}

export async function set(value: number) {
  await kv.set(['count'], value);
  return value;
}

export async function update(change: number) {
  return await set((await get()) + change);
}
