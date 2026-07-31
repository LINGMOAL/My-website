export async function onRequest(context) {
  const { env } = context;
  const res = await fetch(env.API_BASE + '/v1/audio/voices', {
    headers: { 'Authorization': 'Bearer ' + env.API_KEY }
  });
  if (!res.ok) {
    return new Response('查询失败: ' + res.status, { status: res.status });
  }
  return new Response(await res.text(), {
    headers: { 'Content-Type': 'application/json' }
  });
}
