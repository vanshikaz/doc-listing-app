import React from 'react';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';
import { useDoctors } from './hooks/useDoctors';

function App() {
  const { 
    doctors, 
    allSpecialties, 
    loading, 
    error, 
    filters, 
    suggestions,
    updateFilters,
    toggleSpecialty
  } = useDoctors();

  const handleSearchChange = (query: string) => {
    updateFilters({ searchQuery: query });
  };

  const handleSelectSuggestion = (doctor: { name: string }) => {
    updateFilters({ searchQuery: doctor.name });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        searchQuery={filters.searchQuery}
        suggestions={suggestions}
        onSearchChange={handleSearchChange}
        onSelectSuggestion={handleSelectSuggestion}
      />
      
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Find the Best Doctors</h2>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Panel - Now fixed on scroll */}
          <div className="w-full md:w-1/4">
            <div className="md:sticky md:top-24">
              <FilterPanel 
                filters={filters}
                allSpecialties={allSpecialties}
                onFilterChange={updateFilters}
                onToggleSpecialty={toggleSpecialty}
              />
            </div>
          </div>
          
          {/* Doctor List */}
          <div className="w-full md:w-3/4">
            <DoctorList 
              doctors={doctors}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">© 2025 Medicos. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;