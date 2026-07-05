const TARGET = "https://67cdd7-2026-acd2c4.colegiocolondeocotlan.com";

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

  const url = new URL(req.url);
  const targetUrl = TARGET + url.pathname + url.search;

  const res = await fetch(targetUrl, {
    method: req.method,
    headers: req.headers,
    body: req.method === "GET" || req.method === "HEAD" ? undefined : req.body,
  });

  const headers = new Headers(res.headers);

  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "*");

  headers.delete("content-security-policy");
  headers.delete("x-frame-options");

  return new Response(res.body, {
    status: res.status,
    headers,
  });
});
