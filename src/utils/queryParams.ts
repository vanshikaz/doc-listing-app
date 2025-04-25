import { FilterState } from '../types';

export const setQueryParams = (filters: FilterState): void => {
  const url = new URL(window.location.href);
  
  // Clear existing params
  url.search = '';
  
  // Set new params if they exist
  if (filters.searchQuery) {
    url.searchParams.set('search', filters.searchQuery);
  }
  
  if (filters.consultationType) {
    url.searchParams.set('consultation', filters.consultationType);
  }
  
  if (filters.specialties.length > 0) {
    url.searchParams.set('specialties', filters.specialties.join(','));
  }
  
  if (filters.sortBy) {
    url.searchParams.set('sort', filters.sortBy);
  }
  
  // Update URL without reloading the page
  window.history.pushState({}, '', url);
};

export const getQueryParams = (): FilterState => {
  const url = new URL(window.location.href);
  
  const searchQuery = url.searchParams.get('search') || '';
  const consultationType = url.searchParams.get('consultation') as FilterState['consultationType'];
  const specialtiesParam = url.searchParams.get('specialties');
  const specialties = specialtiesParam ? specialtiesParam.split(',') : [];
  const sortBy = url.searchParams.get('sort') as FilterState['sortBy'];
  
  return {
    searchQuery,
    consultationType,
    specialties,
    sortBy
  };
};