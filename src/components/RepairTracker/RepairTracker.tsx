import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Aircraft, Repair } from '../../types';
import { mockAircraft, mockBases } from '../../mockData';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import { format, formatDistanceToNow, differenceInMinutes, differenceInDays } from 'date-fns';

type RepairStage = 
  | 'Anomaly Detected'
  | 'Ambiguity Identified'
  | 'Fault Isolation'
  | 'Maintenance Identified'
  | 'Maintenance In Work'
  | 'Inspection'
  | 'Safe for Flight';

interface RepairStatus {
  stage: RepairStage;
  startTime: string;
  estimatedCompletion?: string;
  description: string;
  systemAffected: string;
  severity: 'Critical' | 'Warning' | 'Info';
}

interface StageDetails {
  technicians?: string[];
  equipment?: string[];
  location?: string;
  notes?: string;
  startTime?: string;
  completionTime?: string;
}

const stages: RepairStage[] = [
  'Anomaly Detected',
  'Ambiguity Identified',
  'Fault Isolation',
  'Maintenance Identified',
  'Maintenance In Work',
  'Inspection',
  'Safe for Flight'
];

// Add helper function for formatting duration
const formatDuration = (startTime: string, endTime: string) => {
  const days = differenceInDays(new Date(endTime), new Date(startTime));
  const minutes = differenceInMinutes(new Date(endTime), new Date(startTime)) % (24 * 60);
  return `${days}d ${Math.round(minutes)}m`;
};

const RepairTracker: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const getStageColor = (stage: RepairStage) => {
    switch (stage) {
      case 'Anomaly Detected': return 'bg-red-100 text-red-800';
      case 'Ambiguity Identified': return 'bg-orange-100 text-orange-800';
      case 'Fault Isolation': return 'bg-yellow-100 text-yellow-800';
      case 'Maintenance Identified': return 'bg-blue-100 text-blue-800';
      case 'Maintenance In Work': return 'bg-indigo-100 text-indigo-800';
      case 'Inspection': return 'bg-purple-100 text-purple-800';
      case 'Safe for Flight': return 'bg-green-100 text-green-800';
    }
  };

  const getStageIcon = (stage: RepairStage) => {
    switch (stage) {
      case 'Anomaly Detected': return <FaIcons.FaExclamationTriangle className="text-red-500" />;
      case 'Ambiguity Identified': return <FaIcons.FaSearch className="text-orange-500" />;
      case 'Fault Isolation': return <FaIcons.FaWrench className="text-yellow-500" />;
      case 'Maintenance Identified': return <FaIcons.FaClipboardList className="text-blue-500" />;
      case 'Maintenance In Work': return <FaIcons.FaTools className="text-indigo-500" />;
      case 'Inspection': return <FaIcons.FaClipboardCheck className="text-purple-500" />;
      case 'Safe for Flight': return <FaIcons.FaCheckCircle className="text-green-500" />;
    }
  };

  const getProgressPercentage = (stage: RepairStage): number => {
    return ((stages.indexOf(stage) + 1) / stages.length) * 100;
  };

  const getStageStatus = (currentStage: RepairStage, stage: RepairStage) => {
    const currentIndex = stages.indexOf(currentStage);
    const stageIndex = stages.indexOf(stage);
    
    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  const ChevronProgress: React.FC<{ currentStage: RepairStage; repair: Repair }> = ({ currentStage, repair }) => {
    const [selectedStage, setSelectedStage] = useState<string>(currentStage);

    return (
      <div className="flex flex-col w-full space-y-4">
        {/* Timing Information Above Chevrons */}
        <div className="flex items-center justify-between w-full space-x-2">
          {stages.map((stage, index) => {
            const status = getStageStatus(currentStage, stage);
            const isCurrent = status === 'current';
            
            return (
              <div key={stage} className="flex-1 flex flex-col items-center">
                {/* Timing info above bubble */}
                <div className="h-16 flex flex-col items-center justify-end text-xs text-gray-600 mb-2">
                  {status === 'completed' && (
                    <>
                      <div>Completed</div>
                      <div>{format(new Date(repair.estimatedCompletionTime!), 'MM/dd HH:mm')}</div>
                      <div className="text-green-600">{formatDuration(repair.startTime, repair.estimatedCompletionTime!)}</div>
                    </>
                  )}
                  {status === 'current' && (
                    <>
                      <div>In Progress</div>
                      <div>{format(new Date(repair.startTime!), 'MM/dd HH:mm')}</div>
                      <div className="text-blue-600">Est: {formatDuration(repair.startTime!, repair.estimatedCompletionTime!)}</div>
                    </>
                  )}
                </div>

                {/* Status Bubble */}
                <button 
                  onClick={() => setSelectedStage(stage)}
                  className={`
                    w-full py-3 px-4 rounded-full
                    ${status === 'completed' ? 'bg-green-500 text-white' :
                      status === 'current' ? 'bg-blue-500 text-white' :
                      'bg-gray-200 text-gray-500'}
                    transition-all duration-300
                    hover:brightness-95
                    ${isCurrent ? 'ring-2 ring-offset-2 ring-blue-500 shadow-lg' : ''}
                    flex items-center justify-center
                    min-h-[3.5rem]
                    text-sm font-medium
                  `}
                >
                  <span className="text-center whitespace-normal">
                    {stage}
                  </span>
                </button>

                {/* Connector line between bubbles */}
                {index < stages.length - 1 && (
                  <div className={`
                    h-0.5 w-full absolute top-1/2
                    ${status === 'completed' ? 'bg-green-500' :
                      status === 'current' ? 'bg-blue-500' :
                      'bg-gray-200'}
                    -z-10
                  `} 
                  style={{
                    left: '50%',
                    width: '100%'
                  }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Notes Section */}
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-lg">{selectedStage} Notes</h3>
            <div className="text-sm text-gray-500">
              {repair.assignedTechnicians.map(tech => tech.name).join(', ')}
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Location and Equipment */}
            <div className="flex gap-4 text-sm">
              <div className="flex-1">
                <p className="text-gray-500">Location</p>
                <p className="font-medium">{repair.location}</p>
              </div>
              <div className="flex-1">
                <p className="text-gray-500">Equipment</p>
                <p className="font-medium">
                  {repair.partsRequired.map(part => part.name).join(', ')}
                </p>
              </div>
            </div>

            {/* Notes Content */}
            <div className="bg-white rounded p-3 shadow-sm">
              <p className="text-gray-600">{repair.notes}</p>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Started</p>
                <p>{format(new Date(repair.startTime), 'MMM dd, yyyy HH:mm')}</p>
              </div>
              <div>
                <p className="text-gray-500">Estimated Completion</p>
                <p>{format(new Date(repair.estimatedCompletionTime), 'MMM dd, yyyy HH:mm')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Filter aircraft that are in repair
  const aircraftInRepair = mockAircraft.filter(aircraft => 
    aircraft.errors.length > 0 || aircraft.currentRepair !== null
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FaIcons.FaTools className="text-3xl text-blue-600 mr-3" />
          <h1 className="text-2xl font-bold">Repair Tracker</h1>
        </div>
        <div className="text-gray-500">
          {aircraftInRepair.length} Aircraft in Repair Process
        </div>
      </div>

      <div className="grid gap-6">
        {aircraftInRepair.map((aircraft) => {
          const base = mockBases.find(b => b.id === aircraft.baseId);
          const initialGroundTime = aircraft.currentRepair?.startTime || new Date().toISOString();
          const timeOnGround = formatDistanceToNow(new Date(initialGroundTime));
          const nextMission = aircraft.missions.find(m => m.status === 'Scheduled');

          return (
            <motion.div
              key={aircraft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              {/* Aircraft Header Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{aircraft.tailNumber}</h2>
                  <p className="text-lg text-gray-500">{aircraft.model}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500">Base</p>
                  <p className="font-normal">{base?.name}</p>
                  <p className="text-sm font-bold text-gray-500">Location</p>
                  <p className="font-normal">{aircraft.location} ({base?.code})</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500">Time on Ground</p>
                  <p className="font-normal">Initial: {format(new Date(initialGroundTime), 'MM/dd HH:mm')}</p>
                  <p className="font-normal">Total: {timeOnGround}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500">Next Mission</p>
                  {nextMission ? (
                    <>
                      <p className="font-normal">{nextMission.name}</p>
                      <p className="text-sm font-normal">
                        In: {formatDistanceToNow(new Date(nextMission.date))}
                      </p>
                    </>
                  ) : (
                    <p className="font-normal">No mission scheduled</p>
                  )}
                </div>
              </div>

              {/* Progress Chevrons */}
              {aircraft.currentRepair && (
                <ChevronProgress 
                  currentStage={aircraft.currentRepair.stage as RepairStage || 'Anomaly Detected'}
                  repair={aircraft.currentRepair}
                />
              )}

              {/* System Errors */}
              <div className="space-y-4">
                {aircraft.errors.map((error) => (
                  <div key={error.id} className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full ${error.severity === 'Critical' ? 'bg-red-100' : 'bg-yellow-100'}`}>
                      {error.severity === 'Critical' ? 
                        <FaIcons.FaExclamationCircle className="text-red-500" /> : 
                        <FaIcons.FaExclamationTriangle className="text-yellow-500" />
                      }
                    </div>
                    <div>
                      <h3 className="font-medium">{error.system} - {error.component}</h3>
                      <p className="text-gray-600">{error.description}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <BiIcons.BiTime className="mr-1" />
                        {format(new Date(error.reportedAt), 'MMM dd, yyyy HH:mm')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Current Repair Details */}
              {aircraft.currentRepair && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="font-medium mb-2">Current Repair Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Started</p>
                      <p>{format(new Date(aircraft.currentRepair.startTime), 'MMM dd, yyyy HH:mm')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Estimated Completion</p>
                      <p>{format(new Date(aircraft.currentRepair.estimatedCompletionTime), 'MMM dd, yyyy HH:mm')}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600">{aircraft.currentRepair.notes}</p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RepairTracker; 