import { json, type RequestEvent } from '@sveltejs/kit';

export async function GET(request: RequestEvent) {
  const ext = request.params.ext;
  if (ext == 'error') return json({ status: 'error' }, { status: 418 });

  const url = new URL(request.url);
  const excludes = (url.searchParams.get('exclude') || '').split(',');

  const info = {
    runtime: Deno.version,
    deno: Object.keys(Deno),
    memory: Deno.systemMemoryInfo(),
    usage: Deno.memoryUsage(),
    network: Deno.networkInterfaces(),
    pid: Deno.pid,
    ppid: Deno.ppid,
    loadavg: Deno.loadavg(),
    count: await get(),
    request
  };
  for (const v of excludes) info[v] = undefined;
  return json(info);
}
