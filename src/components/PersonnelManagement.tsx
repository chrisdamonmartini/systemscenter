import React, { useState } from 'react';
import { Technician } from '../types';
import * as FaIcons from 'react-icons/fa';
import { motion } from 'framer-motion';

interface PersonnelManagementProps {
  technicians: Technician[];
}

const PersonnelManagement: React.FC<PersonnelManagementProps> = ({ technicians }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available' | 'assigned'>('all');
  const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null);

  // Filter and search
  const filteredTechnicians = technicians.filter(tech => {
    const matchesSearch = searchTerm === '' || tech.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAvailability = availabilityFilter === 'all' ||
      (availabilityFilter === 'available' && tech.available) ||
      (availabilityFilter === 'assigned' && !tech.available);
    return matchesSearch && matchesAvailability;
  });

  // Summary statistics
  const totalPersonnel = technicians.length;
  const availablePersonnel = technicians.filter(tech => tech.available).length;
  const assignedPersonnel = totalPersonnel - availablePersonnel;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-900">
        <FaIcons.FaUsers className="mr-2" /> Personnel Management
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-blue-700 p-4 rounded-lg text-center shadow-md"
        >
          <div className="text-3xl font-bold text-white">{totalPersonnel}</div>
          <div className="text-sm text-blue-100">Total Personnel</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-green-700 p-4 rounded-lg text-center shadow-md"
        >
          <div className="text-3xl font-bold text-white">{availablePersonnel}</div>
          <div className="text-sm text-green-100">Available</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-orange-700 p-4 rounded-lg text-center shadow-md"
        >
          <div className="text-3xl font-bold text-white">{assignedPersonnel}</div>
          <div className="text-sm text-orange-100">Assigned</div>
        </motion.div>
      </div>

      {/* Search and Filter */}
      <div className="flex justify-between mb-4">
        <input 
          type="text"
          placeholder="Search by name..."
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="ml-4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={availabilityFilter}
          onChange={(e) => setAvailabilityFilter(e.target.value as 'all' | 'available' | 'assigned')}
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="assigned">Assigned</option>
        </select>
      </div>

      {/* Personnel List */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTechnicians.map((tech) => (
              <tr key={tech.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{tech.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{tech.specialties?.join(', ') || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    tech.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {tech.available ? 'Available' : 'Assigned'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => setSelectedTechnician(tech)}
                  >
                    <FaIcons.FaInfoCircle className="inline" /> Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Technician Details Modal */}
      {selectedTechnician && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            className="bg-white rounded-lg max-w-md w-full mx-4 overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-bold">Technician Details</h3>
              <button onClick={() => setSelectedTechnician(null)} className="text-gray-500 hover:text-gray-700">
                <FaIcons.FaTimes />
              </button>
            </div>
            <div className="p-4">
              <h4 className="font-medium">{selectedTechnician.name}</h4>
              <p className="text-gray-600 mt-2">Specialties: {selectedTechnician.specialties?.join(', ') || 'N/A'}</p>
              <p className="text-gray-600 mt-2">Status: {selectedTechnician.available ? 'Available' : 'Assigned'}</p>
              {selectedTechnician.currentAssignment && (
                <p className="text-gray-600 mt-2">Current Assignment: {selectedTechnician.currentAssignment}</p>
              )}
            </div>
            <div className="border-t p-4 flex justify-end">
              <button 
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setSelectedTechnician(null)}
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PersonnelManagement; 