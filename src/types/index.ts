export interface Doctor {
  id: number;
  name: string;
  specialty: string[];
  experience: number;
  fees: number;
  inClinic: boolean;
  videoConsult: boolean;
  imageUrl: string;
}

export interface FilterState {
  searchQuery: string;
  consultationType: 'video' | 'clinic' | null;
  specialties: string[];
  sortBy: 'fees' | 'experience' | null;
}