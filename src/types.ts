export type CryptoData = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  changePercent: number;
}

export type TimeRange = '1d' | '1w' | '1m' | '3m' | '1y';

export type TimeDataPoint = {
  date: string;
  value: number;
};

export type CryptoTimeChartProps = {
  cryptoId: string;
  title: string;
  dataKey: string;
  color: string;
};

  
  export type ApiResponse = {
    data: {
      symbol: string;
      priceUsd: string;
      marketCapUsd: string;
      changePercent24Hr: string;
    }[];
  };

  export type CryptoSelectorProps = {
    cryptoList: CryptoData[];
    selectedCrypto: string;
    onSelectCrypto: (cryptoId: string) => void;
  }