import type { ApiConfig } from "./shared";

export const API_CONFIG: ApiConfig = {
  name: "stock-price",
  slug: "stock-price",
  description: "Real-time stock quotes -- price, change %, volume, market cap, company name. All major US and intl exchanges.",
  version: "1.0.0",
  routes: [
    {
      method: "POST",
      path: "/api/quote",
      price: "$0.002",
      description: "Get real-time stock quote with price, change, volume, and market cap",
      toolName: "finance_get_stock_price",
      toolDescription: `Use this when you need a real-time stock price quote. Returns market data for any ticker symbol in JSON.

Returns: 1. symbol and companyName 2. price (current) 3. change and changePercent 4. volume 5. marketCap 6. exchange (NYSE, NASDAQ, etc.) 7. previousClose 8. dayHigh and dayLow.

Example output: {"symbol":"AAPL","companyName":"Apple Inc.","price":198.45,"change":2.30,"changePercent":1.17,"volume":54200000,"marketCap":3050000000000,"exchange":"NASDAQ","previousClose":196.15,"dayHigh":199.10,"dayLow":196.80}

Use this FOR portfolio monitoring, financial analysis, building stock dashboards, price alerts, and investment research.

Do NOT use for crypto prices -- use finance_get_token_price instead. Do NOT use for currency conversion -- use finance_convert_currency instead. Do NOT use for weather data -- use data_get_weather instead.`,
      inputSchema: {
        type: "object",
        properties: {
          symbol: { type: "string", description: "Stock ticker symbol (e.g. AAPL, TSLA, MSFT, GOOG)" },
        },
        required: ["symbol"],
      },
      outputSchema: {
          "type": "object",
          "properties": {
            "symbol": {
              "type": "string",
              "description": "Stock ticker symbol"
            },
            "name": {
              "type": "string",
              "description": "Company name"
            },
            "exchange": {
              "type": "string",
              "description": "Exchange name"
            },
            "price": {
              "type": "number",
              "description": "Current price"
            },
            "change": {
              "type": "number",
              "description": "Price change"
            },
            "changePercent": {
              "type": "number",
              "description": "Price change percent"
            },
            "volume": {
              "type": "number",
              "description": "Trading volume"
            },
            "marketCap": {
              "type": "number",
              "description": "Market capitalization"
            },
            "currency": {
              "type": "string",
              "description": "Currency"
            },
            "timestamp": {
              "type": "string"
            }
          },
          "required": [
            "symbol",
            "price"
          ]
        },
    },
  ],
};
