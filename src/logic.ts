import type { Hono } from "hono";


// ATXP: requirePayment only fires inside an ATXP context (set by atxpHono middleware).
// For raw x402 requests, the existing @x402/hono middleware handles the gate.
// If neither protocol is active (ATXP_CONNECTION unset), tryRequirePayment is a no-op.
async function tryRequirePayment(price: number): Promise<void> {
  if (!process.env.ATXP_CONNECTION) return;
  try {
    const { requirePayment } = await import("@atxp/server");
    const BigNumber = (await import("bignumber.js")).default;
    await requirePayment({ price: BigNumber(price) });
  } catch (e: any) {
    if (e?.code === -30402) throw e;
  }
}

export function registerRoutes(app: Hono) {
  app.post("/api/quote", async (c) => {
    await tryRequirePayment(0.002);
    const body = await c.req.json().catch(() => null);
    if (!body?.symbol) {
      return c.json({ error: "Missing required field: symbol" }, 400);
    }

    const symbol = body.symbol.toUpperCase().trim();

    try {
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`;
      const resp = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      });

      if (!resp.ok) {
        return c.json({ error: `Yahoo Finance returned ${resp.status} for symbol: ${symbol}` }, 400);
      }

      const data = await resp.json() as any;
      const result = data?.chart?.result?.[0];
      if (!result) {
        return c.json({ error: `No data found for symbol: ${symbol}` }, 404);
      }

      const meta = result.meta;
      const price = meta.regularMarketPrice ?? null;
      const previousClose = meta.chartPreviousClose ?? meta.previousClose ?? null;
      const change = price && previousClose ? +(price - previousClose).toFixed(4) : null;
      const changePercent = price && previousClose ? +(((price - previousClose) / previousClose) * 100).toFixed(4) : null;
      const volume = meta.regularMarketVolume ?? null;

      return c.json({
        symbol: meta.symbol || symbol,
        name: meta.shortName || meta.longName || symbol,
        exchange: meta.exchangeName || meta.fullExchangeName || null,
        price,
        change,
        changePercent,
        volume,
        marketCap: null, // chart endpoint doesn't include marketCap
        currency: meta.currency || "USD",
        timestamp: new Date().toISOString(),
      });
    } catch (e: any) {
      return c.json({ error: `Failed to fetch stock data: ${e.message}` }, 500);
    }
  });
}
