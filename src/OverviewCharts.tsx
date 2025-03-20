import ChartSection from "./ChartSection";
import { CryptoData } from "./types";

const OverviewCharts = ({ data }: { data: CryptoData[] }) => (
  <>
    <ChartSection title="Current Price (USD)" dataKey="price" color="#3B82F6" data={data} />
    <ChartSection title="Market Cap (Billions USD)" dataKey="marketCap" color="#10B981" data={data} />
    <ChartSection title="24h Change (%)" dataKey="changePercent" color="#EC4899" data={data} />
  </>
);

export default OverviewCharts;
