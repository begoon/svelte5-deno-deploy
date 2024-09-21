import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const { request, locals } = event;

  const { method, url } = request;
  console.log(method, url);

  locals.id = crypto.randomUUID();
  locals.address = event.getClientAddress();

  const response = await resolve(event);
  return response;
};
