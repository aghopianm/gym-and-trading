import axios from "axios";
import { CryptoData, ApiResponse } from "./types"; // ✅ Import the shared type

const mockData: CryptoData[] = [
  { name: "BTC", price: 67245.12, marketCap: 1324.45, changePercent: 2.34 },
  { name: "ETH", price: 3521.67, marketCap: 423.12, changePercent: 1.56 },
  { name: "USDT", price: 1.0, marketCap: 114.23, changePercent: 0.01 },
  { name: "BNB", price: 567.89, marketCap: 87.45, changePercent: -0.78 },
  { name: "SOL", price: 145.23, marketCap: 65.32, changePercent: 4.32 },
];

export const fetchCryptoData = async (): Promise<CryptoData[]> => {
  try {
    const response = await axios.get<ApiResponse>(
      "https://api.coincap.io/v2/assets?limit=10"
    );

    return response.data.data.map((item) => ({
      name: item.symbol,
      price: parseFloat(item.priceUsd),
      marketCap: parseFloat(item.marketCapUsd) / 1e9,
      changePercent: parseFloat(item.changePercent24Hr),
    }));
  } catch {
    return mockData;
  }
};
