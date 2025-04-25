import React from 'react';
import { CheckCircle, Circle, ArrowDownUp } from 'lucide-react';
import { FilterState } from '../types';

interface FilterPanelProps {
  filters: FilterState;
  allSpecialties: string[];
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onToggleSpecialty: (specialty: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  allSpecialties,
  onFilterChange,
  onToggleSpecialty
}) => {
  const handleConsultationChange = (type: 'video' | 'clinic') => {
    onFilterChange({ consultationType: filters.consultationType === type ? null : type });
  };

  const handleSortChange = (sortBy: 'fees' | 'experience') => {
    onFilterChange({ sortBy: filters.sortBy === sortBy ? null : sortBy });
  };

  return (
    <div className="bg-white shadow-sm rounded-md p-4 mb-5 divide-y divide-gray-200">
      {/* Consultation Mode Filter */}
      <div className="pb-4">
        <h3 
          data-testid="filter-header-moc" 
          className="text-lg font-medium mb-3 text-gray-800"
        >
          Consultation Mode
        </h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <button
              data-testid="filter-video-consult"
              onClick={() => handleConsultationChange('video')}
              className="flex items-center"
            >
              {filters.consultationType === 'video' ? (
                <CheckCircle className="h-5 w-5 text-blue-600" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400" />
              )}
              <span className="ml-2 text-gray-700">Video Consult</span>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              data-testid="filter-in-clinic"
              onClick={() => handleConsultationChange('clinic')}
              className="flex items-center"
            >
              {filters.consultationType === 'clinic' ? (
                <CheckCircle className="h-5 w-5 text-blue-600" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400" />
              )}
              <span className="ml-2 text-gray-700">In Clinic</span>
            </button>
          </div>
        </div>
      </div>

      {/* Specialties Filter */}
      <div className="py-4">
        <h3 
          data-testid="filter-header-speciality" 
          className="text-lg font-medium mb-3 text-gray-800"
        >
          Speciality
        </h3>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {allSpecialties.map((specialty) => (
            <div key={specialty} className="flex items-center">
              <button
                data-testid={`filter-specialty-${specialty.replace('/', '-')}`}
                onClick={() => onToggleSpecialty(specialty)}
                className="flex items-center"
              >
                <div className="h-5 w-5 flex items-center justify-center border border-gray-300 rounded text-white bg-white">
                  {filters.specialties.includes(specialty) && (
                    <CheckCircle className="h-4 w-4 text-blue-600" fill="currentColor" />
                  )}
                </div>
                <span className="ml-2 text-gray-700">{specialty}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sort Filter */}
      <div className="pt-4">
        <h3 
          data-testid="filter-header-sort" 
          className="text-lg font-medium mb-3 text-gray-800"
        >
          Sort By
        </h3>
        <div className="space-y-2">
          <button
            data-testid="sort-fees"
            onClick={() => handleSortChange('fees')}
            className={`flex items-center px-3 py-2 rounded-md w-full ${
              filters.sortBy === 'fees' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
            }`}
          >
            <ArrowDownUp className="h-4 w-4 mr-2" />
            <span>Fees (Low to High)</span>
          </button>
          <button
            data-testid="sort-experience"
            onClick={() => handleSortChange('experience')}
            className={`flex items-center px-3 py-2 rounded-md w-full ${
              filters.sortBy === 'experience' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
            }`}
          >
            <ArrowDownUp className="h-4 w-4 mr-2" />
            <span>Experience (High to Low)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;