import React, { useState } from 'react';
import { Mission, Repair, Technician } from '../types';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as FaIcons from 'react-icons/fa';
import { motion } from 'framer-motion';

interface ReportsProps {
  missions: Mission[];
  repairs: Repair[];
  technicians: Technician[];
}

const Reports: React.FC<ReportsProps> = ({ missions, repairs, technicians }) => {
  const [dateRange, setDateRange] = useState<'all' | 'lastMonth' | 'lastWeek'>('all');

  // Filter data based on date range
  const filteredMissions = missions.filter(mission => {
    const missionDate = mission.startTime ? new Date(mission.startTime) : new Date();
    if (dateRange === 'lastMonth') {
      return missionDate >= new Date(new Date().setMonth(new Date().getMonth() - 1));
    } else if (dateRange === 'lastWeek') {
      return missionDate >= new Date(new Date().setDate(new Date().getDate() - 7));
    }
    return true;
  });

  // Calculate summary statistics
  const totalMissions = filteredMissions.length;
  const totalRepairs = repairs.length;
  const averageMissionDuration = (filteredMissions.reduce((sum, mission) => sum + (mission.duration || 0), 0) / totalMissions) || 0;
  const personnelUtilization = (technicians.filter(tech => !tech.available).length / technicians.length) * 100;

  // Prepare data for charts
  const missionData = filteredMissions.map(mission => ({
    date: mission.startTime ? format(new Date(mission.startTime), 'MMM d') : 'TBD',
    duration: mission.duration || 0,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-900">
        <FaIcons.FaChartLine className="mr-2" /> Reports
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-blue-700 p-4 rounded-lg text-center shadow-md"
        >
          <div className="text-3xl font-bold text-white">{totalMissions}</div>
          <div className="text-sm text-blue-100">Total Missions</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-green-700 p-4 rounded-lg text-center shadow-md"
        >
          <div className="text-3xl font-bold text-white">{totalRepairs}</div>
          <div className="text-sm text-green-100">Total Repairs</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-yellow-700 p-4 rounded-lg text-center shadow-md"
        >
          <div className="text-3xl font-bold text-white">{averageMissionDuration.toFixed(1)} hrs</div>
          <div className="text-sm text-yellow-100">Avg Mission Duration</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-orange-700 p-4 rounded-lg text-center shadow-md"
        >
          <div className="text-3xl font-bold text-white">{personnelUtilization.toFixed(1)}%</div>
          <div className="text-sm text-orange-100">Personnel Utilization</div>
        </motion.div>
      </div>

      {/* Date Range Filter */}
      <div className="flex justify-end mb-4">
        <select 
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value as 'all' | 'lastMonth' | 'lastWeek')}
        >
          <option value="all">All Time</option>
          <option value="lastMonth">Last Month</option>
          <option value="lastWeek">Last Week</option>
        </select>
      </div>

      {/* Mission Duration Chart */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Mission Duration Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={missionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="duration" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reports; 