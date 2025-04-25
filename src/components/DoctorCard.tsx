import React from 'react';
import { Doctor } from '../types';
import { CalendarClock, Video, MapPin, DollarSign } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div 
      data-testid="doctor-card" 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-5">
        <div className="flex items-start">
          {/* Doctor Image */}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
            <img 
              src={doctor.imageUrl || 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
              alt={doctor.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
              }}
            />
          </div>
          
          {/* Doctor Details */}
          <div className="ml-4 flex-1">
            <h2 
              data-testid="doctor-name" 
              className="text-xl font-semibold text-gray-800"
            >
              Dr. {doctor.name}
            </h2>
            
            <p 
              data-testid="doctor-specialty" 
              className="text-blue-600 font-medium mt-1"
            >
              {doctor.specialty.join(', ')}
            </p>
            
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
              <div 
                data-testid="doctor-experience" 
                className="flex items-center text-gray-600"
              >
                <CalendarClock className="w-4 h-4 mr-1 text-gray-500" />
                <span>{doctor.experience} years experience</span>
              </div>
              
              <div 
                data-testid="doctor-fee" 
                className="flex items-center text-gray-600"
              >
                <DollarSign className="w-4 h-4 mr-1 text-gray-500" />
                <span>₹{doctor.fees} consultation fee</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Available Consultation Types */}
        <div className="mt-4 flex flex-wrap gap-2">
          {doctor.videoConsult && (
            <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full">
              <Video className="w-3 h-3 mr-1" />
              Video Consult
            </span>
          )}
          {doctor.inClinic && (
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
              <MapPin className="w-3 h-3 mr-1" />
              In Clinic
            </span>
          )}
        </div>
      </div>
      
      <div className="bg-gray-50 p-3 border-t border-gray-100">
        <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;