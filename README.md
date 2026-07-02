# Stock Price API

[![MCP Server](https://img.shields.io/badge/MCP-server-blue)](https://stock-price.api.klymax402.com/mcp)
[![x402](https://img.shields.io/badge/payments-x402-6E56CF)](https://x402.org)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Real-time stock quotes -- price, change %, volume, market cap, company name. All major US and intl exchanges. Pay-per-call via [x402](https://x402.org) (USDC on Base L2) -- no API key, no signup, no rate-limit wall.

Part of the [klymax402](https://klymax402.com) marketplace -- 100 x402 micropayment APIs for AI agents, one wallet, USDC on Base.

## Quickstart -- MCP

Add to your MCP client config (Claude Desktop, Cursor, ElizaOS, etc.):

```json
{
  "mcpServers": {
    "stock-price": {
      "url": "https://stock-price.api.klymax402.com/mcp"
    }
  }
}
```

## Quickstart -- HTTP (x402)

```bash
curl -X POST "https://stock-price.api.klymax402.com/api/quote" \
  -H "Content-Type: application/json" \
  -d '{"symbol":"BTC"}'
# -> 402 Payment Required, with an x402 payment challenge in the response body
```

Any x402-aware client ([`@x402/fetch`](https://www.npmjs.com/package/@x402/fetch), [`x402-agent-tools`](https://www.npmjs.com/package/x402-agent-tools), ATXP) handles the 402 -> sign -> retry cycle automatically.

## Tools

| Tool | Method | Path | Price | Description |
|---|---|---|---|---|
| `finance_get_stock_price` | POST | `/api/quote` | $0.002 | Get real-time stock quote with price, change, volume, and market cap |

### `finance_get_stock_price`

Use this when you need a real-time stock price quote. Returns market data for any ticker symbol in JSON.

**Parameters**

| Name | Type | Required | Description |
|---|---|---|---|
| `symbol` | string | yes | Stock ticker symbol (e.g. AAPL, TSLA, MSFT, GOOG) |

Example response:

```json
{"symbol":"AAPL","companyName":"Apple Inc.","price":198.45,"change":2.30,"changePercent":1.17,"volume":54200000,"marketCap":3050000000000,"exchange":"NASDAQ","previousClose":196.15,"dayHigh":199.10,"dayLow":196.80}
```

**When to use**: portfolio monitoring, financial analysis, building stock dashboards, price alerts, and investment research.

**Not for**: crypto prices (use `finance_get_token_price`), currency conversion (use `finance_convert_currency`), weather data (use `data_get_weather`).

## Example agent prompts

- "A real-time stock price quote"

## Payment

- Protocol: [x402](https://x402.org) -- HTTP-native pay-per-call, no signup, no API key
- Network: Base L2 (`eip155:8453`)
- Asset: USDC
- Facilitator: Coinbase CDP (primary), PayAI (fallback)
- Also reachable via [ATXP](https://atxp.ai) (OAuth-wrapped x402, RFC 9728 protected-resource metadata)

## Part of klymax402

100 x402 micropayment APIs for AI agents -- one wallet, USDC on Base, zero signup.

- Catalog: https://klymax402.com/llms.txt
- Full API reference: https://klymax402.com/llms-full.txt
- Live stats: https://klymax402.com/stats

## License

MIT
