import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronDown, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

interface FilterSectionProps {
  onFilterChange?: (filters: any) => void;
  onReset?: () => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({ 
  onFilterChange, 
  onReset 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    crypto: '',
    status: '',
    startDate: '',
    endDate: ''
  });

  const cryptocurrencies = ['BTC', 'ETH', 'USDT', 'USDC', 'BNB', 'ADA', 'XRP', 'SOL'];
  const statuses = [
    { value: 'PENDING', label: 'Pendiente' },
    { value: 'PARTIALLY_SETTLED', label: 'Parcialmente Liquidada' },
    { value: 'SETTLED', label: 'Liquidada' },
    { value: 'CANCELLED', label: 'Cancelada' }
  ];
  const operationTypes = [
    { value: 'BUY', label: 'Compra' },
    { value: 'SELL', label: 'Venta' },
    { value: 'REMITTANCE', label: 'Remesa' }
  ];

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Contar filtros activos
    const activeCount = Object.values(newFilters).filter(val => val !== '').length;
    setActiveFilters(activeCount);
    
    onFilterChange?.(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      search: '',
      type: '',
      crypto: '',
      status: '',
      startDate: '',
      endDate: ''
    };
    setFilters(resetFilters);
    setActiveFilters(0);
    onReset?.();
  };

  const getFilterLabel = (key: string, value: string) => {
    switch (key) {
      case 'type':
        return operationTypes.find(t => t.value === value)?.label || value;
      case 'status':
        return statuses.find(s => s.value === value)?.label || value;
      case 'crypto':
        return value;
      case 'search':
        return `"${value}"`;
      case 'startDate':
        return `Desde: ${new Date(value).toLocaleDateString()}`;
      case 'endDate':
        return `Hasta: ${new Date(value).toLocaleDateString()}`;
      default:
        return value;
    }
  };

  const removeFilter = (key: string) => {
    handleFilterChange(key, '');
  };

  return (
    <Card className="overflow-hidden">
      {/* Header compacto siempre visible */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-text-secondary" />
              <h3 className="text-lg font-medium text-text-primary">
                Filtros
              </h3>
              {activeFilters > 0 && (
                <Badge variant="primary" size="sm">
                  {activeFilters}
                </Badge>
              )}
            </div>
            
            {/* Búsqueda principal siempre visible */}
            <div className="w-80">
              <Input
                leftIcon={<Search size={16} />}
                placeholder="Buscar operaciones..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="h-9"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeFilters > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                icon={<RotateCcw size={16} />}
              >
                Limpiar
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              icon={
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} />
                </motion.div>
              }
            >
              {isExpanded ? 'Menos filtros' : 'Más filtros'}
            </Button>
          </div>
        </div>

        {/* Filtros activos como badges */}
        {activeFilters > 0 && (
          <motion.div
            className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border-primary"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {Object.entries(filters)
              .filter(([_, value]) => value !== '')
              .map(([key, value]) => (
                <motion.div
                  key={key}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                >
                  <Badge 
                    variant="secondary" 
                    className="flex items-center gap-1 pr-1"
                  >
                    <span>{getFilterLabel(key, value)}</span>
                    <button
                      onClick={() => removeFilter(key)}
                      className="hover:bg-bg-tertiary rounded-full p-0.5 ml-1"
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                </motion.div>
              ))}
          </motion.div>
        )}
      </div>

      {/* Filtros expandidos */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-4 pb-4 border-t border-border-primary">
              <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Tipo */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Select 
                    label="Tipo de Operación"
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                  >
                    <option value="">Todos los tipos</option>
                    {operationTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Select>
                </motion.div>

                {/* Criptomoneda */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <Select 
                    label="Criptomoneda"
                    value={filters.crypto}
                    onChange={(e) => handleFilterChange('crypto', e.target.value)}
                  >
                    <option value="">Todas las monedas</option>
                    {cryptocurrencies.map(crypto => (
                      <option key={crypto} value={crypto}>
                        {crypto}
                      </option>
                    ))}
                  </Select>
                </motion.div>

                {/* Estado */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Select 
                    label="Estado"
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                  >
                    <option value="">Todos los estados</option>
                    {statuses.map(status => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </Select>
                </motion.div>

                {/* Botón de acciones */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="flex items-end"
                >
                  <Button
                    variant="primary"
                    fullWidth
                    icon={<Filter size={16} />}
                  >
                    Aplicar Filtros
                  </Button>
                </motion.div>
              </div>

              {/* Fila de fechas */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Input
                    type="date"
                    label="Fecha desde"
                    value={filters.startDate}
                    onChange={(e) => handleFilterChange('startDate', e.target.value)}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <Input
                    type="date"
                    label="Fecha hasta"
                    value={filters.endDate}
                    onChange={(e) => handleFilterChange('endDate', e.target.value)}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};