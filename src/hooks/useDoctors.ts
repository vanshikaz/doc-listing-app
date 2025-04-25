import { useState, useEffect } from 'react';
import { Doctor, FilterState } from '../types';
import { getQueryParams, setQueryParams } from '../utils/queryParams';

const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

export const useDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(() => {
    const queryParams = getQueryParams();
    return {
      searchQuery: queryParams.searchQuery || '',
      consultationType: queryParams.consultationType || null,
      specialties: queryParams.specialties || [],
      sortBy: queryParams.sortBy || null
    };
  });
  const [allSpecialties, setAllSpecialties] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);

  // Fetch doctors data
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch doctors: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from API');
        }

        // Process and validate the doctor data
        const processedDoctors = data.map((doctor: any): Doctor => ({
          id: doctor.id,
          name: doctor.name,
          specialty: Array.isArray(doctor.specialty) ? doctor.specialty : [],
          experience: Number(doctor.experience) || 0,
          fees: Number(doctor.fees) || 0,
          videoConsult: doctor.video_consult === true || doctor.videoConsult === true,
          inClinic: doctor.in_clinic === true || doctor.inClinic === true,
          imageUrl: doctor.imageUrl || ''
        }));

        setDoctors(processedDoctors);
        
        // Extract unique specialties
        const specialtiesSet = new Set<string>();
        processedDoctors.forEach(doctor => {
          doctor.specialty.forEach(spec => specialtiesSet.add(spec));
        });
        
        setAllSpecialties(Array.from(specialtiesSet).sort());
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError(err instanceof Error ? err.message : 'Failed to load doctors');
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Apply filters
  useEffect(() => {
    if (!doctors.length) return;

    let result = [...doctors];

    // Apply search filter
    if (filters.searchQuery) {
      const searchLower = filters.searchQuery.toLowerCase();
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(searchLower)
      );
    }

    // Apply consultation type filter
    if (filters.consultationType) {
      result = result.filter(doctor => {
        if (filters.consultationType === 'video') {
          return doctor.videoConsult;
        }
        if (filters.consultationType === 'clinic') {
          return doctor.inClinic;
        }
        return true;
      });
    }

    // Apply specialties filter
    if (filters.specialties.length > 0) {
      result = result.filter(doctor =>
        doctor.specialty.some(spec => filters.specialties.includes(spec))
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      result.sort((a, b) => {
        if (filters.sortBy === 'fees') {
          return a.fees - b.fees;
        }
        return b.experience - a.experience;
      });
    }

    setFilteredDoctors(result);
    setQueryParams(filters);
  }, [doctors, filters]);

  // Generate suggestions
  useEffect(() => {
    if (!filters.searchQuery) {
      setSuggestions([]);
      return;
    }

    const query = filters.searchQuery.toLowerCase();
    const matchedDoctors = doctors
      .filter(doctor => doctor.name.toLowerCase().includes(query))
      .slice(0, 3);

    setSuggestions(matchedDoctors);
  }, [doctors, filters.searchQuery]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const toggleSpecialty = (specialty: string) => {
    setFilters(prev => {
      const specialties = prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty];
      return { ...prev, specialties };
    });
  };

  const clearFilters = () => {
    setFilters({
      searchQuery: '',
      consultationType: null,
      specialties: [],
      sortBy: null
    });
  };

  return {
    doctors: filteredDoctors,
    allSpecialties,
    loading,
    error,
    filters,
    suggestions,
    updateFilters,
    toggleSpecialty,
    clearFilters
  };
};