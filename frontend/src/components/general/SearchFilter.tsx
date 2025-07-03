import React, { useState, useEffect, useCallback } from 'react';
import { Search, X, Filter } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface SearchFilterProps {
  onSearch: (searchTerm: string) => void;
  onFilterChange?: (filterType: string, value: string) => void;
  placeholder?: string;
  filters?: {
    type: string;
    label: string;
    options: FilterOption[];
    value?: string;
  }[];
  className?: string;
  debounceMs?: number;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  onSearch,
  onFilterChange,
  placeholder = "Search...",
  filters = [],
  className = "",
  debounceMs = 300
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      onSearch(term);
    }, debounceMs),
    [onSearch, debounceMs]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
    // Clear all filters
    if (onFilterChange) {
      filters.forEach(filter => {
        onFilterChange(filter.type, '');
      });
    }
  };

  const handleFilterChange = (filterType: string, value: string) => {
    if (onFilterChange) {
      onFilterChange(filterType, value);
    }
  };

  const hasActiveFilters = searchTerm || filters.some(filter => filter.value);

  return (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 ${className}`}>
      <div className="flex flex-col gap-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {hasActiveFilters && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Filters Toggle */}
        {filters.length > 0 && (
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filters</span>
            </button>
            {hasActiveFilters && (
              <span className="text-xs text-gray-400">
                {filters.filter(f => f.value).length} active filter{filters.filter(f => f.value).length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        )}

        {/* Filter Dropdowns */}
        {showFilters && filters.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-white/10">
            {filters.map((filter) => (
              <div key={filter.type} className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-300">
                  {filter.label}
                </label>
                <select
                  value={filter.value || ''}
                  onChange={(e) => handleFilterChange(filter.type, e.target.value)}
                  className="px-2 py-1.5 bg-gray-800 border border-white/20 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="" className="bg-gray-800 text-white text-sm">All {filter.label}</option>
                  {filter.options.map((option) => (
                    <option key={option.value} value={option.value} className="bg-gray-800 text-white text-sm">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default SearchFilter; 