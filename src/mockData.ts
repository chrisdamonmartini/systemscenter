import { v4 as uuidv4 } from 'uuid';
import { Aircraft, SystemError, Part, Technician, Mission, Repair, WeatherCondition, MissionStage } from './types';
import { addDays, subDays } from 'date-fns';

const NOW = new Date();

// Helper to create ISO date strings
const toISOString = (date: Date) => date.toISOString();

// Generate mock technicians
export const mockTechnicians: Technician[] = [
  {
    id: uuidv4(),
    name: 'John Smith',
    specialties: ['Avionics', 'Electrical'],
    available: true,
  },
  {
    id: uuidv4(),
    name: 'Maria Garcia',
    specialties: ['Engines', 'Hydraulics'],
    available: false,
    currentAssignment: '1',
  },
  {
    id: uuidv4(),
    name: 'David Johnson',
    specialties: ['Airframe', 'Landing Gear'],
    available: true,
  },
  {
    id: uuidv4(),
    name: 'Sarah Williams',
    specialties: ['Weapons Systems', 'Radar'],
    available: true,
  },
];

// Generate mock parts
export const mockParts: Part[] = [
  {
    id: uuidv4(),
    name: 'Hydraulic Pump',
    partNumber: 'HP-2234-A',
    inventory: 5,
    onOrder: 2,
    estimatedArrival: toISOString(addDays(NOW, 3)),
  },
  {
    id: uuidv4(),
    name: 'Fuel Filter',
    partNumber: 'FF-1122-B',
    inventory: 12,
    onOrder: 0,
  },
  {
    id: uuidv4(),
    name: 'Navigation Computer',
    partNumber: 'NC-7788-C',
    inventory: 1,
    onOrder: 3,
    estimatedArrival: toISOString(addDays(NOW, 7)),
  },
  {
    id: uuidv4(),
    name: 'Landing Gear Actuator',
    partNumber: 'LGA-4456-D',
    inventory: 0,
    onOrder: 4,
    estimatedArrival: toISOString(addDays(NOW, 2)),
  },
];

// Generate mock system errors
const generateErrors = (): SystemError[] => {
  return [
    {
      id: uuidv4(),
      system: 'Hydraulics',
      component: 'Main Pump',
      description: 'Pressure fluctuations during operation',
      severity: 'Warning',
      reportedAt: toISOString(subDays(NOW, 2)),
      affectedSystems: ['Landing Gear', 'Control Surfaces'],
    },
    {
      id: uuidv4(),
      system: 'Avionics',
      component: 'Navigation System',
      description: 'GPS signal intermittent',
      severity: 'Warning',
      reportedAt: toISOString(subDays(NOW, 1)),
      affectedSystems: ['Navigation', 'Mission Systems'],
    },
    {
      id: uuidv4(),
      system: 'Engines',
      component: 'Turbine',
      description: 'Excessive vibration at high RPM',
      severity: 'Critical',
      reportedAt: toISOString(subDays(NOW, 1)),
      affectedSystems: ['Propulsion', 'Fuel System'],
    },
  ];
};

// Generate mock repairs
const generateRepair = (aircraftId: string, errorId: string): Repair => {
  return {
    id: uuidv4(),
    aircraftId,
    relatedErrorId: errorId,
    stage: 'Repair in Progress',
    startTime: toISOString(subDays(NOW, 1)),
    estimatedCompletionTime: toISOString(addDays(NOW, 2)),
    assignedTechnicians: [mockTechnicians[0], mockTechnicians[1]],
    partsRequired: [
      { id: mockParts[0].id, quantity: 1, name: mockParts[0].name },
      { id: mockParts[3].id, quantity: 2, name: mockParts[3].name }
    ],
    notes: 'Replacing main hydraulic pump and testing system integrity',
    status: 'In Progress',
    description: 'Repairing hydraulic system components'
  };
};

// Generate mock missions
const generateMissions = (aircraftId: string): Mission[] => {
  return [
    {
      id: uuidv4(),
      name: 'Training Exercise Alpha',
      title: 'Training Exercise Alpha',
      date: toISOString(subDays(NOW, 5)),
      duration: 24,
      startTime: toISOString(subDays(NOW, 5)),
      endTime: toISOString(subDays(NOW, 4)),
      status: 'Completed',
      priority: 'Medium',
      aircraftId,
      stages: [],
    },
    {
      id: uuidv4(),
      name: 'Reconnaissance Flight Bravo',
      title: 'Reconnaissance Flight Bravo',
      date: toISOString(addDays(NOW, 1)),
      duration: 48,
      startTime: toISOString(addDays(NOW, 1)),
      endTime: toISOString(addDays(NOW, 2)),
      status: 'Scheduled',
      priority: 'High',
      aircraftId,
      stages: [],
    },
    {
      id: uuidv4(),
      name: 'Transport Mission Charlie',
      title: 'Transport Mission Charlie',
      date: toISOString(addDays(NOW, 4)),
      duration: 72,
      startTime: toISOString(addDays(NOW, 4)),
      endTime: toISOString(addDays(NOW, 6)),
      status: 'Scheduled',
      priority: 'Medium',
      aircraftId,
      stages: [],
    },
  ];
};

// Update the missionStages with a larger flight path
const missionStages: MissionStage[] = [
  {
    id: '1',
    name: 'Takeoff',
    status: 'Completed',
    estimatedDuration: 15,
    waypoints: [
      { lat: 41.123, lng: -111.973, altitude: 0, order: 0 },
      { lat: 41.125, lng: -111.975, altitude: 1000, order: 1 },
      { lat: 41.127, lng: -111.977, altitude: 5000, order: 2 }
    ]
  },
  {
    id: '2',
    name: 'Mission Path Alpha',
    status: 'In Progress',
    estimatedDuration: 120,
    waypoints: [
      { lat: 41.127, lng: -111.977, altitude: 5000, order: 0 },
      { lat: 41.140, lng: -111.990, altitude: 10000, order: 1 },
      { lat: 41.160, lng: -112.010, altitude: 15000, order: 2 },
      { lat: 41.180, lng: -112.030, altitude: 20000, order: 3 },
      { lat: 41.200, lng: -112.050, altitude: 25000, order: 4 },
      { lat: 41.220, lng: -112.030, altitude: 25000, order: 5 },
      { lat: 41.240, lng: -112.010, altitude: 25000, order: 6 },
      { lat: 41.260, lng: -111.990, altitude: 25000, order: 7 },
      { lat: 41.280, lng: -111.970, altitude: 25000, order: 8 },
      { lat: 41.260, lng: -111.950, altitude: 25000, order: 9 },
      { lat: 41.240, lng: -111.930, altitude: 25000, order: 10 },
      { lat: 41.220, lng: -111.910, altitude: 25000, order: 11 },
      { lat: 41.200, lng: -111.890, altitude: 25000, order: 12 }
    ]
  },
  {
    id: '3',
    name: 'Landing',
    status: 'Pending',
    estimatedDuration: 20,
    waypoints: [
      { lat: 41.200, lng: -111.890, altitude: 25000, order: 0 },
      { lat: 41.180, lng: -111.880, altitude: 15000, order: 1 },
      { lat: 41.160, lng: -111.870, altitude: 10000, order: 2 },
      { lat: 41.140, lng: -111.860, altitude: 5000, order: 3 },
      { lat: 41.123, lng: -111.973, altitude: 0, order: 4 }
    ]
  }
];

// Helper function to generate varied flight hours and maintenance data
const generateAircraftMetrics = (baseAge: number, isNew: boolean = false) => {
  const flightHours = Math.floor(Math.random() * 1200 + 400); // 400-1600 hours
  const maxHoursBeforeMaintenance = 1000;
  const hoursUntilMaintenance = maxHoursBeforeMaintenance - (flightHours % maxHoursBeforeMaintenance);
  
  return {
    flightHours,
    flightHoursUntilMaintenance: hoursUntilMaintenance,
    age: isNew ? baseAge : baseAge + Math.random() * 2 - 1 // Vary age by ±1 year
  };
};

// Update aircraft with varied maintenance data
export const mockAircraft: Aircraft[] = [
  {
    id: '1',
    tailNumber: 'AF-10042',
    model: 'F-35A',
    status: 'Repair in Progress',
    location: 'Hangar A',
    locationLat: 41.123,
    locationLng: -111.973,
    missionCapable: false,
    lastMaintenance: toISOString(subDays(NOW, 30)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 60)),
    errors: generateErrors(),
    currentRepair: generateRepair('1', '1'),
    missions: generateMissions('1'),
    repairs: [],
    currentMission: {
      id: '1',
      name: 'Training Flight',
      title: 'Training Flight',
      date: new Date().toISOString(),
      duration: 155,
      status: 'In Progress',
      stages: missionStages,
      currentStage: '2',
      aircraftId: '1'
    },
    ...generateAircraftMetrics(4.5),
  },
  {
    id: '2',
    tailNumber: 'AF-10043',
    model: 'F-35A',
    status: 'Operational',
    location: 'Runway',
    locationLat: 41.124,
    locationLng: -111.974,
    missionCapable: true,
    lastMaintenance: toISOString(subDays(NOW, 15)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 75)),
    errors: [],
    currentRepair: null,
    missions: generateMissions('2'),
    repairs: [],
    currentMission: null,
    ...generateAircraftMetrics(3.8),
  },
  {
    id: '3',
    tailNumber: 'AF-10044',
    model: 'F-35A',
    status: 'In Mission',
    location: 'Airborne',
    locationLat: 41.125,
    locationLng: -111.975,
    missionCapable: true,
    lastMaintenance: toISOString(subDays(NOW, 7)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 83)),
    errors: [],
    currentRepair: null,
    missions: generateMissions('3'),
    repairs: [],
    currentMission: {
      id: '1',
      name: 'Training Flight',
      title: 'Training Flight',
      date: new Date().toISOString(),
      duration: 155,
      status: 'In Progress',
      stages: missionStages,
      currentStage: '2',
      aircraftId: '3'
    },
    ...generateAircraftMetrics(4.2),
  },
  {
    id: '4',
    tailNumber: 'AF-10045',
    model: 'F-35A',
    status: 'Diagnosing',
    location: 'Hangar B',
    locationLat: 41.126,
    locationLng: -111.976,
    missionCapable: false,
    lastMaintenance: toISOString(subDays(NOW, 45)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 45)),
    errors: generateErrors().slice(0, 2),
    currentRepair: null,
    missions: generateMissions('4'),
    repairs: [],
    currentMission: null,
    ...generateAircraftMetrics(5.1),
  },
  {
    id: '5',
    tailNumber: 'AF-10046',
    model: 'F-22A',
    status: 'Operational',
    location: 'Tarmac',
    locationLat: 41.127,
    locationLng: -111.977,
    missionCapable: true,
    lastMaintenance: toISOString(subDays(NOW, 5)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 85)),
    errors: [],
    currentRepair: null,
    missions: generateMissions('5'),
    repairs: [],
    currentMission: null,
    ...generateAircraftMetrics(6.5),
  },
  {
    id: '6',
    tailNumber: 'AF-10047',
    model: 'F-22A',
    status: 'Parts on Order',
    location: 'Hangar C',
    locationLat: 41.128,
    locationLng: -111.978,
    missionCapable: false,
    lastMaintenance: toISOString(subDays(NOW, 60)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 30)),
    errors: generateErrors().slice(1, 3),
    currentRepair: generateRepair('6', '2'),
    missions: generateMissions('6'),
    repairs: [],
    currentMission: null,
    ...generateAircraftMetrics(7.2),
  },
  {
    id: '7',
    tailNumber: 'AF-10048',
    model: 'F-35A',
    status: 'In Mission',
    location: 'Airborne',
    locationLat: 41.220,
    locationLng: -112.030,
    missionCapable: true,
    lastMaintenance: toISOString(subDays(NOW, 10)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 80)),
    errors: [],
    currentRepair: null,
    missions: generateMissions('7'),
    repairs: [],
    currentMission: {
      id: '2',
      name: 'Combat Air Patrol',
      title: 'Combat Air Patrol',
      date: new Date().toISOString(),
      duration: 180,
      status: 'In Progress',
      stages: missionStages,
      currentStage: '2',
      aircraftId: '7'
    },
    ...generateAircraftMetrics(2.5, true),
  },
  {
    id: '8',
    tailNumber: 'AF-10049',
    model: 'F-22A',
    status: 'In Mission',
    location: 'Airborne',
    locationLat: 41.240,
    locationLng: -112.010,
    missionCapable: true,
    lastMaintenance: toISOString(subDays(NOW, 8)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 82)),
    errors: [],
    currentRepair: null,
    missions: generateMissions('8'),
    repairs: [],
    currentMission: {
      id: '3',
      name: 'Combat Air Patrol',
      title: 'Combat Air Patrol',
      date: new Date().toISOString(),
      duration: 180,
      status: 'In Progress',
      stages: missionStages,
      currentStage: '2',
      aircraftId: '8'
    },
    ...generateAircraftMetrics(8.4),
  },
  {
    id: '9',
    tailNumber: 'AF-10050',
    model: 'F-35A',
    status: 'In Mission',
    location: 'Airborne',
    locationLat: 41.260,
    locationLng: -111.990,
    missionCapable: true,
    lastMaintenance: toISOString(subDays(NOW, 12)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 78)),
    errors: [],
    currentRepair: null,
    missions: generateMissions('9'),
    repairs: [],
    currentMission: {
      id: '4',
      name: 'Combat Air Patrol',
      title: 'Combat Air Patrol',
      date: new Date().toISOString(),
      duration: 180,
      status: 'In Progress',
      stages: missionStages,
      currentStage: '2',
      aircraftId: '9'
    },
    ...generateAircraftMetrics(3.9),
  },
  {
    id: '10',
    tailNumber: 'AF-10051',
    model: 'F-22A',
    status: 'In Mission',
    location: 'Airborne',
    locationLat: 41.280,
    locationLng: -111.970,
    missionCapable: true,
    lastMaintenance: toISOString(subDays(NOW, 6)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 84)),
    errors: [],
    currentRepair: null,
    missions: generateMissions('10'),
    repairs: [],
    currentMission: {
      id: '5',
      name: 'Combat Air Patrol',
      title: 'Combat Air Patrol',
      date: new Date().toISOString(),
      duration: 180,
      status: 'In Progress',
      stages: missionStages,
      currentStage: '2',
      aircraftId: '10'
    },
    ...generateAircraftMetrics(5.8),
  }
];

// Generate mock weather
export const mockWeather: WeatherCondition = {
  conditions: 'Partly Cloudy',
  temperature: 68,
  windSpeed: 12,
  windDirection: 'NW',
  humidity: 45,
  visibility: 8.5,
  ceiling: 25000,
  updatedAt: new Date().toISOString(),
  forecast: [
    {
      time: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      conditions: 'Sunny',
      temperature: 72,
      windSpeed: 8,
      precipitation: 0
    },
    {
      time: new Date(Date.now() + 86400000 * 2).toISOString(), // Day after tomorrow
      conditions: 'Cloudy',
      temperature: 65,
      windSpeed: 15,
      precipitation: 30
    },
    {
      time: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
      conditions: 'Rain',
      temperature: 59,
      windSpeed: 20,
      precipitation: 80
    }
  ]
};