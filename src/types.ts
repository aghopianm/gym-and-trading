export type CryptoData = {
    name: string;
    price: number;
    marketCap: number;
    changePercent: number;
  };
  
  export type ApiResponse = {
    data: {
      symbol: string;
      priceUsd: string;
      marketCapUsd: string;
      changePercent24Hr: string;
    }[];
  };
  