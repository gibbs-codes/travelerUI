export interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  description?: string;
  itinerary: ItineraryItem[];
  budget?: number;
  participants: string[];
}

export interface ItineraryItem {
  id: string;
  date: Date;
  time: string;
  activity: string;
  location: string;
  description?: string;
  estimatedCost?: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export interface MapLocation {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  type: 'destination' | 'activity' | 'accommodation' | 'restaurant';
}