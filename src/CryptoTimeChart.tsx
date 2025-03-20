import { useState, useEffect } from "react";
import { fetchCryptoHistoryData } from "./cryptoService"; // Assume we implement this
import { TimeRange, CryptoTimeChartProps, TimeDataPoint } from "./types";
import { ChartContainer, TimeRangeSelector, TimeButton } from "./CryptoTimeChartStyles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CryptoTimeChart = ({ cryptoId, title, dataKey, color }: CryptoTimeChartProps) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('1m');
  const [timeData, setTimeData] = useState<TimeDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistoricalData = async () => {
      setLoading(true);
      try {
        const data = await fetchCryptoHistoryData(cryptoId, dataKey, timeRange);
        setTimeData(data);
      } catch (error) {
        console.error("Failed to fetch historical data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHistoricalData();
  }, [cryptoId, dataKey, timeRange]);

  return (
    <div>
      <h3>{title}</h3>
      <TimeRangeSelector>
        {['1d', '1w', '1m', '3m', '1y'].map((range) => (
          <TimeButton 
            key={range} 
            active={timeRange === range} 
            onClick={() => setTimeRange(range as TimeRange)}
          >
            {range.toUpperCase()}
          </TimeButton>
        ))}
      </TimeRangeSelector>

      <ChartContainer>
        {loading ? (
          <div>Loading chart data...</div>
        ) : (
          <ResponsiveContainer>
            <LineChart data={timeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => {
                  const dateObj = new Date(date);
                  return timeRange === '1d' 
                    ? dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                    : dateObj.toLocaleDateString([], {month: 'short', day: 'numeric'});
                }}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(date) => new Date(date).toLocaleString()}
                formatter={(value) => [parseFloat(value.toString()).toFixed(2), title]}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                strokeWidth={2} 
                dot={false} 
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartContainer>
    </div>
  );
};

export default CryptoTimeChart;
