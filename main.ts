const TARGET = "https://colegiocolondeocotlan.com";

Deno.serve(async (req) => {
  const url = new URL(req.url);

  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "*",
      },
    });
  }

  const targetUrl = TARGET + url.pathname + url.search;

  const res = await fetch(targetUrl, {
    method: req.method,
    headers: {
      "User-Agent": req.headers.get("user-agent") || "Mozilla/5.0",
      "Accept": req.headers.get("accept") || "text/html,application/xhtml+xml",
    },
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
