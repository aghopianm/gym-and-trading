import axios from 'axios';
import { CryptoData } from "./types";

const COINCAP_API_BASE = "https://api.coincap.io/v2";

// Fetch cryptocurrency data from CoinCap API
export const fetchCryptoData = async (): Promise<CryptoData[]> => {
  try {
    const response = await axios.get(`${COINCAP_API_BASE}/assets`);
    
    if (response.data && response.data.data) {
      // Transform the API response to match our CryptoData interface
      return response.data.data.map((coin: any) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        price: parseFloat(coin.priceUsd),
        marketCap: parseFloat(coin.marketCapUsd) / 1000000000, // Convert to billions
        changePercent: parseFloat(coin.changePercent24Hr),
      }));
    }
    
    throw new Error("Invalid response format from CoinCap API");
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    throw error;
  }
};

// Fetch historical data for a specific cryptocurrency
export const fetchCryptoHistoryData = async (
  cryptoId: string,
  dataType: string,
  timeRange: '1d' | '1w' | '1m' | '3m' | '1y'
) => {
  try {
    // Calculate start and end timestamps in milliseconds
    const end = Date.now();
    let start: number;
    let interval: string;
    
    // Set appropriate start time and interval based on the time range
    switch (timeRange) {
      case '1d':
        start = end - (24 * 60 * 60 * 1000); // 1 day in ms
        interval = 'm5'; // 5-minute intervals
        break;
      case '1w':
        start = end - (7 * 24 * 60 * 60 * 1000); // 7 days in ms
        interval = 'h1'; // 1-hour intervals
        break;
      case '1m':
        start = end - (30 * 24 * 60 * 60 * 1000); // 30 days in ms
        interval = 'h6'; // 6-hour intervals
        break;
      case '3m':
        start = end - (90 * 24 * 60 * 60 * 1000); // 90 days in ms
        interval = 'd1'; // Daily intervals
        break;
      case '1y':
        start = end - (365 * 24 * 60 * 60 * 1000); // 365 days in ms
        interval = 'd1'; // Daily intervals
        break;
      default:
        start = end - (24 * 60 * 60 * 1000); // Default to 1 day
        interval = 'h1'; // Default to hourly
    }
    
    console.log(`Fetching ${timeRange} data from ${new Date(start).toISOString()} to ${new Date(end).toISOString()}`);
    
    // Fetch history data from CoinCap API
    const response = await axios.get(
      `${COINCAP_API_BASE}/assets/${cryptoId}/history`, 
      { 
        params: { 
          interval, 
          start, 
          end 
        } 
      }
    );
    
    if (response.data && response.data.data && response.data.data.length > 0) {
      console.log(`Received ${response.data.data.length} data points from API`);
      
      // Transform the API response to match our time series format
      return response.data.data.map((point: any) => {
        // Extract the relevant data field based on dataType
        let value;
        switch (dataType) {
          case 'price':
            value = parseFloat(point.priceUsd);
            break;
          case 'marketCap':
            value = parseFloat(point.marketCapUsd) / 1000000000; // Convert to billions
            break;
          case 'changePercent':
          default:
            value = parseFloat(point.priceUsd); // Fallback to price if dataType is not recognized
        }
        
        return {
          date: new Date(point.time).toISOString(),
          value
        };
      });
    } else {
      console.warn("Empty or invalid response from CoinCap API history endpoint");
      throw new Error("No historical data available");
    }
  } catch (error) {
    console.error(`Error fetching ${dataType} history for ${cryptoId}:`, error);
    // If API call fails, fall back to mock data with proper time range
    return generateMockHistoryData(cryptoId, dataType, timeRange);
  }
};

// Improved mock data generator with proper date ranges
const generateMockHistoryData = (
  cryptoId: string,
  dataType: string,
  timeRange: '1d' | '1w' | '1m' | '3m' | '1y'
) => {
  let points: number;
  const end = new Date();
  let startDate = new Date(end);
  
  // Set appropriate number of points and start date based on time range
  switch (timeRange) {
    case '1d':
      points = 24;
      startDate.setDate(startDate.getDate() - 1);
      break;
    case '1w':
      points = 28; // 4 points per day for a week
      startDate.setDate(startDate.getDate() - 7);
      break;
    case '1m':
      points = 30;
      startDate.setMonth(startDate.getMonth() - 1);
      break;
    case '3m':
      points = 90;
      startDate.setMonth(startDate.getMonth() - 3);
      break;
    case '1y':
      points = 365;
      startDate.setFullYear(startDate.getFullYear() - 1);
      break;
    default:
      points = 24;
      startDate.setDate(startDate.getDate() - 1);
  }
  
  console.log(`Generating ${points} mock data points from ${startDate.toISOString()} to ${end.toISOString()}`);
  
  // Total time span in milliseconds
  const timeSpan = end.getTime() - startDate.getTime();
  const timeStep = timeSpan / (points - 1);
  
  // Generate base values based on crypto and data type
  const baseValue = cryptoId === 'bitcoin' 
    ? 55000 
    : cryptoId === 'ethereum' 
      ? 3000 
      : cryptoId === 'tether'
        ? 1
        : 100;
  
  const multiplier = dataType === 'price' 
    ? 1 
    : dataType === 'marketCap' 
      ? (cryptoId === 'bitcoin' ? 1000 : 400) 
      : 0.1;
  
  // Create array of time series data points with proper date distribution
  return Array.from({ length: points }, (_, i) => {
    const pointDate = new Date(startDate.getTime() + (i * timeStep));
    
    // Add some randomness but maintain a general trend based on the time period
    const trend = timeRange === '1y' 
      ? 1 + (i/points) * (Math.random() > 0.3 ? 0.4 : -0.2) // More upward trend for year
      : 1 + (i/points) * (Math.random() > 0.5 ? 0.2 : -0.1);
    
    const volatility = (Math.random() * 0.1) + 0.95;
    
    return {
      date: pointDate.toISOString(),
      value: baseValue * multiplier * volatility * trend
    };
  });
};