import React, { useState, useEffect } from 'react';
import type { MapLocation } from '../types';

interface MapWidgetProps {
  locations: MapLocation[];
  center?: { lat: number; lng: number };
  onLocationSelect?: (location: MapLocation) => void;
  selectedLocation?: MapLocation;
}

const MapWidget: React.FC<MapWidgetProps> = ({ 
  locations, 
  center = { lat: 40.7128, lng: -74.0060 }, 
  onLocationSelect,
  selectedLocation 
}) => {
  const [mapCenter, setMapCenter] = useState(center);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (locations.length > 0) {
      const avgLat = locations.reduce((sum, loc) => sum + loc.coordinates.lat, 0) / locations.length;
      const avgLng = locations.reduce((sum, loc) => sum + loc.coordinates.lng, 0) / locations.length;
      setMapCenter({ lat: avgLat, lng: avgLng });
    }
  }, [locations]);

  const getLocationIcon = (type: MapLocation['type']) => {
    switch (type) {
      case 'destination': return '📍';
      case 'activity': return '🎯';
      case 'accommodation': return '🏨';
      case 'restaurant': return '🍽️';
      default: return '📍';
    }
  };

  const getLocationColor = (type: MapLocation['type']) => {
    switch (type) {
      case 'destination': return '#e74c3c';
      case 'activity': return '#3498db';
      case 'accommodation': return '#9b59b6';
      case 'restaurant': return '#f39c12';
      default: return '#95a5a6';
    }
  };

  return (
    <div className="map-widget">
      <div className="map-header">
        <h3>Trip Locations</h3>
        <div className="map-controls">
          <button onClick={() => setZoom(Math.min(zoom + 1, 18))} className="zoom-btn">+</button>
          <span className="zoom-level">{zoom}</span>
          <button onClick={() => setZoom(Math.max(zoom - 1, 1))} className="zoom-btn">-</button>
        </div>
      </div>

      <div className="map-container">
        <div className="map-placeholder">
          <div className="map-info">
            <p>Interactive Map View</p>
            <p>Center: {mapCenter.lat.toFixed(4)}, {mapCenter.lng.toFixed(4)}</p>
            <p>Zoom: {zoom}</p>
          </div>
          
          <div className="map-locations-overlay">
            {locations.map((location, index) => (
              <div
                key={location.id}
                className={`map-marker ${selectedLocation?.id === location.id ? 'selected' : ''}`}
                style={{
                  left: `${50 + (index % 3 - 1) * 20}%`,
                  top: `${40 + Math.floor(index / 3) * 15}%`,
                  color: getLocationColor(location.type)
                }}
                onClick={() => onLocationSelect?.(location)}
                title={`${location.name} (${location.type})`}
              >
                <span className="marker-icon">{getLocationIcon(location.type)}</span>
                <span className="marker-label">{location.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="map-legend">
        <h4>Legend</h4>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-icon">📍</span>
            <span>Destination</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">🎯</span>
            <span>Activity</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">🏨</span>
            <span>Accommodation</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">🍽️</span>
            <span>Restaurant</span>
          </div>
        </div>
      </div>

      {selectedLocation && (
        <div className="location-details">
          <h4>{selectedLocation.name}</h4>
          <p>Type: {selectedLocation.type}</p>
          <p>Coordinates: {selectedLocation.coordinates.lat.toFixed(4)}, {selectedLocation.coordinates.lng.toFixed(4)}</p>
        </div>
      )}

      <div className="map-note">
        <p><strong>Note:</strong> This is a placeholder map component. In production, integrate with Google Maps, Mapbox, or OpenStreetMap.</p>
      </div>
    </div>
  );
};

export default MapWidget;