import React, { useState } from 'react';
import { mockAircraft, mockParts, mockTechnicians, mockWeather } from './mockData';
import './App.css';
import FleetOverview from './components/FleetOverview';
import DetailedAircraftView from './components/DetailedAircraftView';
import MissionSchedule from './components/MissionSchedule';
import MaintenanceStatus from './components/MaintenanceStatus';
import Sidebar from './components/Sidebar';
import { Aircraft, Repair } from './types';
import { motion } from 'framer-motion';
import FleetManagement from './components/FleetManagement';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import * as WiIcons from 'react-icons/wi';
import * as GiIcons from 'react-icons/gi';
import { format } from 'date-fns';
import PartsInventory from './components/PartsInventory';
import PersonnelManagement from './components/PersonnelManagement';
import Reports from './components/Reports';
import FlightTestManagement from './components/FlightTest/FlightTestManagement';
import Settings from './components/Settings/Settings';

// Helper function to get weather icon
const getWeatherIcon = (conditions: string) => {
  switch (conditions.toLowerCase()) {
    case 'sunny':
    case 'clear':
      return <WiIcons.WiDaySunny className="text-2xl text-yellow-300" />;
    case 'partly cloudy':
      return <WiIcons.WiDayCloudy className="text-2xl text-gray-100" />;
    case 'cloudy':
      return <WiIcons.WiCloudy className="text-2xl text-gray-300" />;
    case 'rain':
    case 'rainy':
      return <WiIcons.WiRain className="text-2xl text-blue-300" />;
    case 'thunderstorm':
      return <WiIcons.WiThunderstorm className="text-2xl text-yellow-300" />;
    case 'snow':
    case 'snowy':
      return <WiIcons.WiSnow className="text-2xl text-white" />;
    case 'fog':
    case 'foggy':
      return <WiIcons.WiFog className="text-2xl text-gray-300" />;
    default:
      return <WiIcons.WiDayCloudy className="text-2xl text-gray-300" />;
  }
};

// Create placeholder components for the other views
const Personnel = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-4">Personnel Management</h2>
    <p>Personnel management content would go here.</p>
  </div>
);

function App() {
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null);
  const [aircraft] = useState(mockAircraft);
  const [currentView, setCurrentView] = useState('dashboard');
  const [weather] = useState(mockWeather);

  // Function to pass to the Sidebar component
  const handleNavigation = (route: string) => {
    setCurrentView(route.replace('/', ''));
    // Reset selected aircraft when changing views
    if (route !== '/dashboard') {
      setSelectedAircraft(null);
    }
  };

  // Render the appropriate content based on currentView
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <FleetOverview 
                aircraft={aircraft} 
                onSelectAircraft={setSelectedAircraft} 
              />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              <motion.div 
                className="lg:col-span-7"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <MaintenanceStatus 
                  repairs={aircraft
                    .filter(a => a.currentRepair)
                    .map(a => a.currentRepair as unknown as Repair)
                  }
                  technicians={mockTechnicians}
                  parts={mockParts}
                />
              </motion.div>
              
              <motion.div
                className="lg:col-span-5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <MissionSchedule 
                  missions={aircraft.flatMap(a => a.missions)} 
                  aircraft={aircraft}
                />
              </motion.div>
            </div>
          </>
        );
        
      case 'fleet':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FleetManagement aircraft={aircraft} />
          </motion.div>
        );
        
      case 'schedule':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <MissionSchedule 
              missions={aircraft.flatMap(a => a.missions)} 
              aircraft={aircraft}
            />
          </motion.div>
        );
        
      case 'personnel':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <PersonnelManagement technicians={mockTechnicians} />
          </motion.div>
        );
        
      case 'inventory':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <PartsInventory parts={mockParts} />
          </motion.div>
        );
        
      case 'reports':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Reports 
              missions={aircraft.flatMap(a => a.missions)} 
              repairs={aircraft.flatMap(a => a.repairs)} 
              technicians={mockTechnicians} 
            />
          </motion.div>
        );
        
      case 'flight-test':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FlightTestManagement aircraft={aircraft} />
          </motion.div>
        );
        
      case 'settings':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Settings />
          </motion.div>
        );
        
      default:
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">Page not found</h2>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-900 text-white py-2 px-4 flex items-center">
        {/* FLIGHTCENTER Logo */}
        <div className="flex items-center">
          <GiIcons.GiJetFighter className="text-white mr-2 text-2xl" />
          <span className="font-bold text-lg mr-8">FLIGHTCENTER</span>
        </div>
        
        {/* Compact Weather Display with 3-day Forecast */}
        <div className="flex items-center mx-auto bg-blue-800 px-4 py-1 rounded-lg">
          <div className="flex items-center border-r border-blue-700 pr-4 mr-4">
            {getWeatherIcon(weather.conditions)}
            <div className="ml-2">
              <span className="font-medium">{weather.temperature}°F</span>
              <span className="text-blue-200 text-sm ml-2">{weather.conditions}</span>
            </div>
            {weather.windSpeed > 15 && (
              <div className="ml-3 flex items-center text-yellow-300">
                <WiIcons.WiStrongWind className="mr-1" />
                <span className="text-xs">{weather.windSpeed} mph</span>
              </div>
            )}
          </div>
          
          {/* 3-day Forecast */}
          <div className="flex space-x-6">
            {weather.forecast?.slice(0, 3).map((day: any, index: number) => (
              <div key={index} className="text-center flex items-center">
                <div className="text-xs text-blue-200 mr-1">
                  {format(new Date(day.time), 'EEE')}
                </div>
                <div className="mx-1">
                  {getWeatherIcon(day.conditions)}
                </div>
                <div className="text-sm font-medium">{day.temperature}°</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-blue-800 rounded-full">
            <FaIcons.FaSearch className="text-xl" />
          </button>
          <button className="p-2 hover:bg-blue-800 rounded-full relative">
            <FaIcons.FaBell className="text-xl" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-blue-800 rounded-full">
            <BiIcons.BiCog className="text-xl" />
          </button>
          <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center">
            <span className="font-semibold text-sm">JD</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onNavigate={handleNavigation} currentView={currentView} />
        
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App; 