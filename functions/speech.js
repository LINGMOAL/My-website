export async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  const { text, voice } = await request.json();
  const body = {
    model: 'moss-tts',
    input: text,
    delivery_method: 'audio',
    response_format: 'mp3'
  };
  if (voice && voice !== '-- 选一个音色 --') body.voice = voice;
  const res = await fetch(env.API_BASE + '/v1/audio/speech', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + env.API_KEY
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    return new Response('TTS 失败: ' + res.status, { status: res.status });
  }
  return new Response(await res.arrayBuffer(), {
    headers: { 'Content-Type': 'audio/mpeg' }
  });
}
