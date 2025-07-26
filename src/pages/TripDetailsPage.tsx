import React, { useState } from 'react';
import type { Trip, MapLocation } from '../types';
import CalendarWidget from '../widgets/CalendarWidget';
import MapWidget from '../widgets/MapWidget';

interface TripDetailsPageProps {
  trip?: Trip;
}

const TripDetailsPage: React.FC<TripDetailsPageProps> = ({ trip }) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedLocation, setSelectedLocation] = useState<MapLocation>();

  const mockTrip: Trip = trip || {
    id: '1',
    title: 'Amazing European Adventure',
    destination: 'Europe',
    startDate: new Date('2024-06-15'),
    endDate: new Date('2024-06-25'),
    description: 'A wonderful 10-day journey through the most beautiful cities in Europe, experiencing culture, history, and amazing cuisine.',
    budget: 3500,
    participants: ['John Doe', 'Jane Smith'],
    itinerary: [
      {
        id: '1',
        date: new Date('2024-06-15'),
        time: '09:00',
        activity: 'Arrival and Hotel Check-in',
        location: 'Paris, France',
        description: 'Arrive at Charles de Gaulle Airport and check into hotel',
        estimatedCost: 150
      },
      {
        id: '2',
        date: new Date('2024-06-15'),
        time: '14:00',
        activity: 'Eiffel Tower Visit',
        location: 'Eiffel Tower, Paris',
        description: 'Visit the iconic Eiffel Tower and enjoy panoramic views',
        estimatedCost: 30
      },
      {
        id: '3',
        date: new Date('2024-06-16'),
        time: '10:00',
        activity: 'Louvre Museum',
        location: 'Louvre Museum, Paris',
        description: 'Explore the world-famous Louvre Museum',
        estimatedCost: 20
      }
    ]
  };

  const mockLocations: MapLocation[] = [
    {
      id: '1',
      name: 'Paris',
      coordinates: { lat: 48.8566, lng: 2.3522 },
      type: 'destination'
    },
    {
      id: '2',
      name: 'Eiffel Tower',
      coordinates: { lat: 48.8584, lng: 2.2945 },
      type: 'activity'
    },
    {
      id: '3',
      name: 'Hotel Ritz Paris',
      coordinates: { lat: 48.8681, lng: 2.3286 },
      type: 'accommodation'
    },
    {
      id: '4',
      name: 'Le Comptoir du 7ème',
      coordinates: { lat: 48.8566, lng: 2.3522 },
      type: 'restaurant'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getTotalEstimatedCost = () => {
    return mockTrip.itinerary.reduce((total, item) => total + (item.estimatedCost || 0), 0);
  };

  return (
    <div className="trip-details-page">
      <div className="trip-header">
        <div className="trip-title-section">
          <h1>{mockTrip.title}</h1>
          <p className="trip-destination">{mockTrip.destination}</p>
          <div className="trip-dates">
            {mockTrip.startDate.toLocaleDateString()} - {mockTrip.endDate.toLocaleDateString()}
          </div>
        </div>
        
        <div className="trip-stats">
          <div className="stat-card">
            <h3>Duration</h3>
            <p>{Math.ceil((mockTrip.endDate.getTime() - mockTrip.startDate.getTime()) / (1000 * 60 * 60 * 24))} days</p>
          </div>
          <div className="stat-card">
            <h3>Budget</h3>
            <p>{mockTrip.budget ? formatCurrency(mockTrip.budget) : 'Not set'}</p>
          </div>
          <div className="stat-card">
            <h3>Travelers</h3>
            <p>{mockTrip.participants.length} people</p>
          </div>
          <div className="stat-card">
            <h3>Estimated Cost</h3>
            <p>{formatCurrency(getTotalEstimatedCost())}</p>
          </div>
        </div>
      </div>

      {mockTrip.description && (
        <div className="trip-description">
          <h2>About This Trip</h2>
          <p>{mockTrip.description}</p>
        </div>
      )}

      <div className="trip-content">
        <div className="left-panel">
          <div className="itinerary-section">
            <h2>Detailed Itinerary</h2>
            <div className="itinerary-list">
              {mockTrip.itinerary.map((item) => (
                <div key={item.id} className="itinerary-item">
                  <div className="item-date">
                    {item.date.toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="item-content">
                    <div className="item-header">
                      <span className="item-time">{item.time}</span>
                      <h4 className="item-activity">{item.activity}</h4>
                      {item.estimatedCost && (
                        <span className="item-cost">{formatCurrency(item.estimatedCost)}</span>
                      )}
                    </div>
                    <p className="item-location">📍 {item.location}</p>
                    {item.description && (
                      <p className="item-description">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="participants-section">
            <h2>Travelers</h2>
            <div className="participants-list">
              {mockTrip.participants.map((participant, index) => (
                <div key={index} className="participant-card">
                  <div className="participant-avatar">
                    {participant.charAt(0).toUpperCase()}
                  </div>
                  <span className="participant-name">{participant}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="widget-section">
            <CalendarWidget
              itinerary={mockTrip.itinerary}
              onDateSelect={setSelectedDate}
              selectedDate={selectedDate}
            />
          </div>

          <div className="widget-section">
            <MapWidget
              locations={mockLocations}
              onLocationSelect={setSelectedLocation}
              selectedLocation={selectedLocation}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetailsPage;