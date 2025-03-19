import { useState, useEffect, useCallback } from "react";
import {
  Container,
  Header,
  Title,
  RefreshButton,
  ErrorMessage,
  LoadingMessage,
  Footer,
  Section,
  SectionTitle,
  ChartContainer,
} from "./DataDashboardStyles";
import { fetchCryptoData } from "./cryptoService";
import { CryptoData } from "./types"; // ✅ Import the shared type
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
import { RefreshCw } from "lucide-react";

const DataDashboard = () => {
  const [data, setData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const result = await fetchCryptoData();
    setData(result);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Container>
      <Header>
        <Title>Crypto Market Dashboard</Title>
        <RefreshButton onClick={fetchData} disabled={loading}>
          <RefreshCw className={loading ? "spinning" : ""} />
          Refresh Data
        </RefreshButton>
      </Header>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {loading ? (
        <LoadingMessage>Loading data...</LoadingMessage>
      ) : (
        <Charts data={data} />
      )}
      <Footer>
        Data provided by CoinCap API • Last updated:{" "}
        {new Date().toLocaleTimeString()}
      </Footer>
    </Container>
  );
};

const Charts = ({ data }: { data: CryptoData[] }) => (
  <>
    <ChartSection
      title="Current Price (USD)"
      dataKey="price"
      color="#3B82F6"
      data={data}
    />
    <ChartSection
      title="Market Cap (Billions USD)"
      dataKey="marketCap"
      color="#10B981"
      data={data}
    />
    <ChartSection
      title="24h Change (%)"
      dataKey="changePercent"
      color="#EC4899"
      data={data}
    />
  </>
);

const ChartSection = ({
  title,
  dataKey,
  color,
  data,
}: {
  title: string;
  dataKey: string;
  color: string;
  data: CryptoData[];
}) => (
  <Section>
    <SectionTitle>{title}</SectionTitle>
    <ChartContainer>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  </Section>
);

export default DataDashboard;
