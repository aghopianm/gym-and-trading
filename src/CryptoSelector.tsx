

import { Label, SelectContainer, StyledSelect } from "./CryptoSelectorStyles";
import { CryptoSelectorProps } from "./types";

const CryptoSelector = ({ 
  cryptoList, 
  selectedCrypto, 
  onSelectCrypto 
}: CryptoSelectorProps) => {
  return (
    <SelectContainer>
      <Label htmlFor="crypto-select">Select Cryptocurrency:</Label>
      <StyledSelect
        id="crypto-select"
        value={selectedCrypto}
        onChange={(e) => onSelectCrypto(e.target.value)}
      >
        {cryptoList.map((crypto) => (
          <option key={crypto.id} value={crypto.id}>
            {crypto.name} ({crypto.symbol})
          </option>
        ))}
      </StyledSelect>
    </SelectContainer>
  );
};

export default CryptoSelector;