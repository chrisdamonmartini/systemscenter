export type MaintenanceStatus = 
  | 'Operational' 
  | 'In Mission' 
  | 'Diagnosing'
  | 'Fault Isolating'
  | 'Parts on Order'
  | 'Repair in Progress'
  | 'Repair Complete'
  | 'Safe for Flight';

export type Severity = 'Critical' | 'Warning' | 'Normal';

export interface Aircraft {
  id: string;
  tailNumber: string;
  model: string;
  status: MaintenanceStatus;
  location: string;
  missionCapable: boolean;
  lastMaintenance: string; // ISO date string
  nextScheduledMaintenance: string; // ISO date string
  errors: SystemError[];
  currentRepair: Repair | null;
  missions: Mission[];
}

export interface SystemError {
  id: string;
  system: string;
  component: string;
  description: string;
  severity: Severity;
  reportedAt: string; // ISO date string
  affectedSystems: string[];
}

export interface Mission {
  id: string;
  name: string;
  startTime: string; // ISO date string
  endTime: string; // ISO date string
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  aircraftId: string;
}

export interface Repair {
  id: string;
  aircraftId: string;
  relatedErrorId: string;
  stage: MaintenanceStatus;
  startTime: string; // ISO date string
  estimatedCompletionTime: string; // ISO date string
  actualCompletionTime?: string; // ISO date string
  assignedTechnicians: Technician[];
  partsRequired: Part[];
  notes: string;
}

export interface Technician {
  id: string;
  name: string;
  specialties: string[];
  available: boolean;
  currentAssignment?: string; // repairId
}

export interface Part {
  id: string;
  name: string;
  partNumber: string;
  inventory: number;
  onOrder: number;
  estimatedArrival?: string; // ISO date string
}

export interface WeatherCondition {
  temperature: number;
  windSpeed: number;
  visibility: number;
  conditions: string;
  forecast: WeatherForecast[];
}

export interface WeatherForecast {
  time: string; // ISO date string
  temperature: number;
  windSpeed: number;
  visibility: number;
  conditions: string;
} 