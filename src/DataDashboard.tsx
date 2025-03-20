import { useState, useEffect, useCallback } from "react";
import {
  Container,
  Header,
  Title,
  RefreshButton,
  ErrorMessage,
  LoadingMessage,
  Footer,
  ViewToggle,
  ToggleButton,
} from "./DataDashboardStyles";
import { fetchCryptoData } from "./cryptoService";
import { CryptoData } from "./types";
import { RefreshCw } from "lucide-react";
import CryptoSelector from "./CryptoSelector";
import OverviewCharts from "./OverviewCharts";
import DetailedCharts from "./DetailedCharts";

const DataDashboard = () => {
  const [data, setData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCryptoId, setSelectedCryptoId] = useState<string>("");
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchCryptoData();
      setData(result);
      
      // Initialize selected crypto if not set
      if (!selectedCryptoId && result.length > 0) {
        setSelectedCryptoId(result[0].id);
      }
    } catch (err) {
      setError("Failed to fetch cryptocurrency data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [selectedCryptoId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const selectedCrypto = data.find(crypto => crypto.id === selectedCryptoId);

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
        <>
          <ViewToggle>
            <ToggleButton 
              active={viewMode === 'overview'} 
              onClick={() => setViewMode('overview')}
            >
              Market Overview
            </ToggleButton>
            <ToggleButton 
              active={viewMode === 'detailed'} 
              onClick={() => setViewMode('detailed')}
            >
              Detailed View
            </ToggleButton>
          </ViewToggle>
          
          {viewMode === 'overview' ? (
            <OverviewCharts data={data} />
          ) : (
            <>
              <CryptoSelector 
                cryptoList={data} 
                selectedCrypto={selectedCryptoId} 
                onSelectCrypto={setSelectedCryptoId} 
              />
              
              {selectedCrypto && (
                <DetailedCharts cryptoId={selectedCryptoId} />
              )}
            </>
          )}
        </>
      )}
      
      <Footer>
        Data provided by CoinCap API • Last updated:{" "}
        {new Date().toLocaleTimeString()}
      </Footer>
    </Container>
  );
};

export default DataDashboard;