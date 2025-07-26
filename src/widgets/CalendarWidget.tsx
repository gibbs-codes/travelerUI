import React, { useState } from 'react';
import type { ItineraryItem } from '../types';

interface CalendarWidgetProps {
  itinerary: ItineraryItem[];
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ 
  itinerary, 
  onDateSelect, 
  selectedDate 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getItineraryForDate = (date: Date) => {
    return itinerary.filter(item => 
      item.date.toDateString() === date.toDateString()
    );
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newMonth;
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dayItinerary = getItineraryForDate(date);
      const isSelected = selectedDate?.toDateString() === date.toDateString();
      const hasEvents = dayItinerary.length > 0;

      days.push(
        <div
          key={day}
          className={`calendar-day ${isSelected ? 'selected' : ''} ${hasEvents ? 'has-events' : ''}`}
          onClick={() => onDateSelect?.(date)}
        >
          <div className="day-number">{day}</div>
          {hasEvents && (
            <div className="event-indicators">
              {dayItinerary.slice(0, 3).map((item) => (
                <div key={item.id} className="event-dot" title={item.activity}></div>
              ))}
              {dayItinerary.length > 3 && (
                <div className="event-more">+{dayItinerary.length - 3}</div>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="calendar-widget">
      <div className="calendar-header">
        <button onClick={() => navigateMonth('prev')} className="nav-btn">‹</button>
        <h3>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button onClick={() => navigateMonth('next')} className="nav-btn">›</button>
      </div>

      <div className="calendar-weekdays">
        {weekDays.map(day => (
          <div key={day} className="weekday">{day}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {renderCalendarDays()}
      </div>

      {selectedDate && (
        <div className="selected-date-info">
          <h4>{selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</h4>
          <div className="day-events">
            {getItineraryForDate(selectedDate).map(item => (
              <div key={item.id} className="event-item">
                <span className="event-time">{item.time}</span>
                <span className="event-activity">{item.activity}</span>
                <span className="event-location">{item.location}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarWidget;