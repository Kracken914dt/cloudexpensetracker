import React, { useState, useEffect } from 'react';
import { Select } from '@/components/ui/Select';

interface Country {
  code: string;
  name: string;
  flag: string;
}

interface CountrySelectLatamProps {
  value?: string;
  onChange?: (code: string) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  className?: string;
  witoutCOP?:boolean;
}

const latinAmericaCountries: Country[] = [
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴' },
  { code: 'BR', name: 'Brasil', flag: '🇧🇷' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷' },
  { code: 'CU', name: 'Cuba', flag: '🇨🇺' },
  { code: 'DO', name: 'República Dominicana', flag: '🇩🇴' },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨' },
  { code: 'SV', name: 'El Salvador', flag: '🇸🇻' },
  { code: 'GT', name: 'Guatemala', flag: '🇬🇹' },
  { code: 'HT', name: 'Haití', flag: '🇭🇹' },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳' },
  { code: 'JM', name: 'Jamaica', flag: '🇯🇲' },
  { code: 'MX', name: 'México', flag: '🇲🇽' },
  { code: 'NI', name: 'Nicaragua', flag: '🇳🇮' },
  { code: 'PA', name: 'Panamá', flag: '🇵🇦' },
  { code: 'PY', name: 'Paraguay', flag: '🇵🇾' },
  { code: 'PE', name: 'Perú', flag: '🇵🇪' },
  { code: 'PR', name: 'Puerto Rico', flag: '🇵🇷' },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪' },
  { code: 'BZ', name: 'Belice', flag: '🇧🇿' },
  { code: 'GY', name: 'Guyana', flag: '🇬🇾' },
  { code: 'SR', name: 'Surinam', flag: '🇸🇷' },
  { code: 'GF', name: 'Guayana Francesa', flag: '🇬🇫' },
  { code: 'TT', name: 'Trinidad y Tobago', flag: '🇹🇹' },
  { code: 'BB', name: 'Barbados', flag: '🇧🇧' },
  { code: 'BS', name: 'Bahamas', flag: '🇧🇸' }
];

export const CountrySelectLatam: React.FC<CountrySelectLatamProps> = ({
  value,
  onChange,
  label = "País",
  error,
  placeholder = "Seleccionar país",
  className,
  witoutCOP,
}) => {
  const [availableCountries, setAvailableCountries] = useState<Country[]>(latinAmericaCountries);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
        if(witoutCOP){
         const countries = latinAmericaCountries.filter((country) => country.code !== "CO");
         setAvailableCountries(countries);
        } else {
         setAvailableCountries(latinAmericaCountries);
        }
  }, [witoutCOP]);

  return (
    <Select
      selectSize='lg'
      label={label}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      error={error}
      className={className}
      disabled={isLoading}
    >
      <option value="">{isLoading ? 'Cargando países...' : placeholder}</option>
      {availableCountries.map((country) => (
        <option
          key={country.code}
          value={country.code}
        >
          {country.flag} {country.code} - {country.name}
        </option>
      ))}
    </Select>
  );
};

export { latinAmericaCountries };

export const getCountryNameByCode = (code: string): string => {
  const country = latinAmericaCountries.find(c => c.code === code);
  return country ? country.name : code;
};

export const getCountryFlagByCode = (code: string): string => {
  const country = latinAmericaCountries.find(c => c.code === code);
  return country ? country.flag : '';
};

// Mapeo centralizado de código de país a moneda
const countryCodeToCurrency: Record<string, string> = {
  'AR': 'ARS',
  'BO': 'BOB',
  'BR': 'BRL',
  'CL': 'CLP',
  'CO': 'COP',
  'CR': 'CRC',
  'CU': 'CUP',
  'DO': 'DOP',
  'EC': 'USD',
  'SV': 'USD',
  'GT': 'GTQ',
  'HT': 'HTG',
  'HN': 'HNL',
  'JM': 'JMD',
  'MX': 'MXN',
  'NI': 'NIO',
  'PA': 'USD',
  'PY': 'PYG',
  'PE': 'PEN',
  'PR': 'USD',
  'UY': 'UYU',
  'VE': 'VED',
  'BZ': 'BZD',
  'GY': 'GYD',
  'SR': 'SRD',
  'GF': 'EUR',
  'TT': 'TTD',
  'BB': 'BBD',
  'BS': 'BSD',
  'US': 'USD',
};

const validCurrencies = new Set(Object.values(countryCodeToCurrency));

export const getCurrencyByCountryCode = (code?: string): string => {
  if (!code) return 'USD';
  const upper = code.toUpperCase();
  if (countryCodeToCurrency[upper]) return countryCodeToCurrency[upper];
  if (validCurrencies.has(upper)) return upper;
  return 'USD';
};