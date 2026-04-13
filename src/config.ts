import type { ApiConfig } from "./shared";

export const API_CONFIG: ApiConfig = {
  name: "stock-price",
  slug: "stock-price",
  description: "Real-time stock quotes from Yahoo Finance — price, change, volume, market cap.",
  version: "1.0.0",
  routes: [
    {
      method: "POST",
      path: "/api/quote",
      price: "$0.002",
      description: "Get real-time stock quote with price, change, volume, and market cap",
      toolName: "finance_get_stock_price",
      toolDescription: "Use this when you need a real-time stock price quote. Input a ticker symbol (e.g. AAPL, TSLA, MSFT) and get back current price, price change, change percent, volume, market cap, company name, and exchange. Supports all major US and international exchanges. Do NOT use for crypto prices — use finance_get_token_price instead. Do NOT use for currency conversion — use finance_convert_currency instead.",
      inputSchema: {
        type: "object",
        properties: {
          symbol: { type: "string", description: "Stock ticker symbol (e.g. AAPL, TSLA, MSFT, GOOG)" },
        },
        required: ["symbol"],
      },
    },
  ],
};
