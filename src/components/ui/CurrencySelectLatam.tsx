import React from "react";
import { Select } from "@/components/ui/Select";

interface Currency {
  code: string;
  name: string;
  symbol: string;
  country: string;
  flag: string;
  type: "fiat" | "crypto";
}

interface CurrencySelectLatamProps {
  value?: string;
  onChange?: (code: string) => void;
  onCurrencyTypeChange?: (type: "fiat" | "crypto" | "unknown") => void;
  label?: string;
  error?: string;
  placeholder?: string;
  className?: string;
  showCrypto?: boolean;
  filterType?: "all" | "fiat" | "crypto";
}

const latinAmericaCurrencies: Currency[] = [
  // Monedas FIAT de Latinoamérica y España
  {
    code: "ARS",
    name: "Peso Argentino",
    symbol: "$",
    country: "Argentina",
    flag: "🇦🇷",
    type: "fiat",
  },
  {
    code: "BOB",
    name: "Boliviano",
    symbol: "Bs.",
    country: "Bolivia",
    flag: "🇧🇴",
    type: "fiat",
  },
  {
    code: "BRL",
    name: "Real Brasileño",
    symbol: "R$",
    country: "Brasil",
    flag: "🇧🇷",
    type: "fiat",
  },
  {
    code: "CLP",
    name: "Peso Chileno",
    symbol: "$",
    country: "Chile",
    flag: "🇨🇱",
    type: "fiat",
  },
  {
    code: "COP",
    name: "Peso Colombiano",
    symbol: "$",
    country: "Colombia",
    flag: "🇨🇴",
    type: "fiat",
  },
  {
    code: "CRC",
    name: "Colón Costarricense",
    symbol: "₡",
    country: "Costa Rica",
    flag: "🇨🇷",
    type: "fiat",
  },
  {
    code: "CUP",
    name: "Peso Cubano",
    symbol: "$",
    country: "Cuba",
    flag: "🇨🇺",
    type: "fiat",
  },
  {
    code: "DOP",
    name: "Peso Dominicano",
    symbol: "RD$",
    country: "República Dominicana",
    flag: "🇩🇴",
    type: "fiat",
  },
  {
    code: "USD",
    name: "Dólar Estadounidense",
    symbol: "$",
    country: "Ecuador/El Salvador/Panamá",
    flag: "🇺🇸",
    type: "fiat",
  },
  {
    code: "GTQ",
    name: "Quetzal Guatemalteco",
    symbol: "Q",
    country: "Guatemala",
    flag: "🇬🇹",
    type: "fiat",
  },
  {
    code: "HTG",
    name: "Gourde Haitiano",
    symbol: "G",
    country: "Haití",
    flag: "🇭🇹",
    type: "fiat",
  },
  {
    code: "HNL",
    name: "Lempira Hondureño",
    symbol: "L",
    country: "Honduras",
    flag: "🇭🇳",
    type: "fiat",
  },
  {
    code: "JMD",
    name: "Dólar Jamaiquino",
    symbol: "J$",
    country: "Jamaica",
    flag: "🇯🇲",
    type: "fiat",
  },
  {
    code: "MXN",
    name: "Peso Mexicano",
    symbol: "$",
    country: "México",
    flag: "🇲🇽",
    type: "fiat",
  },
  {
    code: "NIO",
    name: "Córdoba Nicaragüense",
    symbol: "C$",
    country: "Nicaragua",
    flag: "🇳🇮",
    type: "fiat",
  },
  {
    code: "PAB",
    name: "Balboa Panameño",
    symbol: "B/.",
    country: "Panamá",
    flag: "🇵🇦",
    type: "fiat",
  },
  {
    code: "PYG",
    name: "Guaraní Paraguayo",
    symbol: "₲",
    country: "Paraguay",
    flag: "🇵🇾",
    type: "fiat",
  },
  {
    code: "PEN",
    name: "Sol Peruano",
    symbol: "S/",
    country: "Perú",
    flag: "🇵🇪",
    type: "fiat",
  },
  {
    code: "UYU",
    name: "Peso Uruguayo",
    symbol: "$U",
    country: "Uruguay",
    flag: "🇺🇾",
    type: "fiat",
  },
  {
    code: "VED",
    name: "Bolívar Digital Venezolano",
    symbol: "Bs.D",
    country: "Venezuela",
    flag: "🇻🇪",
    type: "fiat",
  },
  {
    code: "EUR",
    name: "Euro",
    symbol: "€",
    country: "España",
    flag: "🇪🇸",
    type: "fiat",
  },
  {
    code: "BZD",
    name: "Dólar de Belice",
    symbol: "BZ$",
    country: "Belice",
    flag: "🇧🇿",
    type: "fiat",
  },
  {
    code: "GYD",
    name: "Dólar Guyanés",
    symbol: "G$",
    country: "Guyana",
    flag: "🇬🇾",
    type: "fiat",
  },
  {
    code: "SRD",
    name: "Dólar Surinamés",
    symbol: "Sr$",
    country: "Surinam",
    flag: "🇸🇷",
    type: "fiat",
  },
  {
    code: "TTD",
    name: "Dólar de Trinidad y Tobago",
    symbol: "TT$",
    country: "Trinidad y Tobago",
    flag: "🇹🇹",
    type: "fiat",
  },
  {
    code: "BBD",
    name: "Dólar de Barbados",
    symbol: "Bds$",
    country: "Barbados",
    flag: "🇧🇧",
    type: "fiat",
  },
  {
    code: "BSD",
    name: "Dólar Bahameño",
    symbol: "B$",
    country: "Bahamas",
    flag: "🇧🇸",
    type: "fiat",
  },
];

const cryptoCurrencies: Currency[] = [
  // Criptomonedas principales
  {
    code: "BTC",
    name: "Bitcoin",
    symbol: "₿",
    country: "Global",
    flag: "🌐",
    type: "crypto",
  },
  {
    code: "ETH",
    name: "Ethereum",
    symbol: "Ξ",
    country: "Global",
    flag: "🌐",
    type: "crypto",
  },
  {
    code: "USDT",
    name: "Tether USD",
    symbol: "₮",
    country: "Global",
    flag: "🌐",
    type: "crypto",
  },
  {
    code: "USDC",
    name: "USD Coin",
    symbol: "USDC",
    country: "Global",
    flag: "🌐",
    type: "crypto",
  },
  {
    code: "BNB",
    name: "Binance Coin",
    symbol: "BNB",
    country: "Global",
    flag: "🌐",
    type: "crypto",
  },
  {
    code: "ADA",
    name: "Cardano",
    symbol: "ADA",
    country: "Global",
    flag: "🌐",
    type: "crypto",
  },
  {
    code: "DOT",
    name: "Polkadot",
    symbol: "DOT",
    country: "Global",
    flag: "🌐",
    type: "crypto",
  },
  {
    code: "MATIC",
    name: "Polygon",
    symbol: "MATIC",
    country: "Global",
    flag: "🌐",
    type: "crypto",
  },
  {
    code: "AVAX",
    name: "Avalanche",
    symbol: "AVAX",
    country: "Global",
    flag: "🌐",
    type: "crypto",
  },
  {
    code: "SOL",
    name: "Solana",
    symbol: "SOL",
    country: "Global",
    flag: "🌐",
    type: "crypto",
  },
  {
    code: "LTC",
    name: "Litecoin",
    symbol: "Ł",
    country: "Global",
    flag: "🌐",
    type: "crypto",
  },
  {
    code: "LINK",
    name: "Chainlink",
    symbol: "LINK",
    country: "Global",
    flag: "🌐",
    type: "crypto",
  },
  {
    code: "XRP",
    name: "Ripple",
    symbol: "XRP",
    country: "Global",
    flag: "🌐",
    type: "crypto",
  },
  {
    code: "TRX",
    name: "TRON",
    symbol: "TRX",
    country: "Global",
    flag: "🌐",
    type: "crypto",
  },
  {
    code: "DAI",
    name: "Dai Stablecoin",
    symbol: "DAI",
    country: "Global",
    flag: "🌐",
    type: "crypto",
  },
];

const allCurrencies = [...latinAmericaCurrencies, ...cryptoCurrencies];

export const CurrencySelectLatam: React.FC<CurrencySelectLatamProps> = ({
  value,
  onChange,
  onCurrencyTypeChange,
  label = "Moneda",
  error,
  placeholder = "Seleccionar moneda",
  className,
  filterType = "all",
}) => {
  const handleCurrencyChange = (currencyCode: string) => {
    onChange?.(currencyCode);

    if (currencyCode) {
      const currencyType = getCurrencyTypeByCode(currencyCode);
      onCurrencyTypeChange?.(currencyType);
    } else {
      onCurrencyTypeChange?.("unknown");
    }
  };

  const getFilteredCurrencies = () => {
    if (filterType === "fiat") {
      return latinAmericaCurrencies;
    } else if (filterType === "crypto") {
      return cryptoCurrencies;
    }
    return allCurrencies;
  };

  const filteredCurrencies = getFilteredCurrencies();
  const fiatCurrencies = filteredCurrencies.filter((c) => c.type === "fiat");
  const cryptos = filteredCurrencies.filter((c) => c.type === "crypto");

  return (
    <Select
      selectSize="lg"
      label={label}
      value={value}
      onChange={(e) => handleCurrencyChange(e.target.value)}
      error={error}
      className={className}
    >
      <option value="">{placeholder}</option>

      {filterType === "all" && (
        <>
          <optgroup label="💰 Monedas FIAT - Latinoamérica y España">
            {fiatCurrencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.flag} {currency.code} - {currency.name} (
                {currency.symbol})
              </option>
            ))}
          </optgroup>

          <optgroup label="🪙 Criptomonedas">
            {cryptos.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.flag} {currency.code} - {currency.name} (
                {currency.symbol})
              </option>
            ))}
          </optgroup>
        </>
      )}

      {filterType === "fiat" &&
        fiatCurrencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.flag} {currency.code} - {currency.name} ({currency.symbol}
            )
          </option>
        ))}

      {filterType === "crypto" &&
        cryptos.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.flag} {currency.code} - {currency.name} ({currency.symbol}
            )
          </option>
        ))}
    </Select>
  );
};

export { latinAmericaCurrencies, cryptoCurrencies, allCurrencies };

// Funciones helper
export const getCurrencyNameByCode = (code: string): string => {
  const currency = allCurrencies.find((c) => c.code === code);
  return currency ? currency.name : code;
};

export const getCurrencySymbolByCode = (code: string): string => {
  const currency = allCurrencies.find((c) => c.code === code);
  return currency ? currency.symbol : "";
};

export const getCurrencyTypeByCode = (
  code: string,
): "fiat" | "crypto" | "unknown" => {
  const currency = allCurrencies.find((c) => c.code === code);
  return currency ? currency.type : "unknown";
};

export const getCurrencyFlagByCode = (code: string): string => {
  const currency = allCurrencies.find((c) => c.code === code);
  return currency ? currency.flag : "";
};

export const getCurrencyInfoByCode = (code: string): Currency | null => {
  return allCurrencies.find((c) => c.code === code) || null;
};
