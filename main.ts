const TARGET = "https://colegiocolondeocotlan.com/000247-2026-f5aa95";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "*",
      },
    });
  }

  const res = await fetch(TARGET, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Accept": "text/html,application/xhtml+xml",
    },
  });

  const headers = new Headers(res.headers);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.delete("content-security-policy");
  headers.delete("x-frame-options");

  return new Response(res.body, {
    status: res.status,
    headers,
  });
});
