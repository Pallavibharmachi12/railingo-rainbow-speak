
export type User = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
};

export type Train = {
  id: string;
  trainNumber: string;
  trainName: string;
  source: string;
  destination: string;
  scheduledArrival: string;
  scheduledDeparture: string;
  actualArrival?: string;
  actualDeparture?: string;
  platform: string;
  status: TrainStatus;
};

export type TrainStatus = 
  | 'ON_TIME'
  | 'ARRIVING'
  | 'ARRIVED'
  | 'DEPARTING'
  | 'DEPARTED'
  | 'DELAYED'
  | 'PLATFORM_CHANGED'
  | 'CANCELLED';

export type Announcement = {
  id: string;
  trainId: string;
  train?: Train;
  messageType: 'ARRIVAL' | 'DEPARTURE' | 'DELAY' | 'PLATFORM_CHANGE' | 'CANCELLATION';
  platform: string;
  status: TrainStatus;
  message: Record<Language, string>;
  audioUrl?: Record<Language, string>;
  timestamp: string;
};

export type Language = 'english' | 'hindi' | 'telugu';
