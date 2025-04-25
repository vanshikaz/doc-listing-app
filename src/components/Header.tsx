import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Doctor } from '../types';

interface HeaderProps {
  searchQuery: string;
  suggestions: Doctor[];
  onSearchChange: (query: string) => void;
  onSelectSuggestion: (doctor: Doctor) => void;
}

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  suggestions,
  onSearchChange,
  onSelectSuggestion
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsDropdownOpen(suggestions.length > 0);
    setSelectedIndex(-1);
  }, [suggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleSuggestionClick = (doctor: Doctor) => {
    onSelectSuggestion(doctor);
    setIsDropdownOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > -1 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          setIsDropdownOpen(false);
        }
        break;
      case 'Escape':
        setIsDropdownOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  return (
    <header className="bg-white shadow-md py-4 px-4 md:px-8 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-700">Medicos</h1>
          
          <div className="relative w-full max-w-lg mx-4" ref={dropdownRef}>
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                data-testid="autocomplete-input"
                placeholder="Search doctors by name"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Search doctors"
                role="combobox"
                aria-expanded={isDropdownOpen}
                aria-autocomplete="list"
                aria-controls="search-suggestions"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            
            {isDropdownOpen && suggestions.length > 0 && (
              <ul
                id="search-suggestions"
                role="listbox"
                className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden"
              >
                {suggestions.map((doctor, index) => (
                  <li
                    key={doctor.id}
                    role="option"
                    aria-selected={index === selectedIndex}
                    data-testid="suggestion-item"
                    className={`px-4 py-2 cursor-pointer transition-colors ${
                      index === selectedIndex
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleSuggestionClick(doctor)}
                  >
                    <div className="font-medium">{doctor.name}</div>
                    <div className="text-sm text-gray-500">
                      {doctor.specialty.join(', ')}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header