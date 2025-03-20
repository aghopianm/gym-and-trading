import CryptoTimeChart from "./CryptoTimeChart";

const DetailedCharts = ({ cryptoId }: { cryptoId: string }) => (
  <>
    <CryptoTimeChart cryptoId={cryptoId} title="Price (USD)" dataKey="price" color="#3B82F6" />
  </>
);

export default DetailedCharts;
