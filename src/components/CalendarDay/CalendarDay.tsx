import React, { useState, useEffect, CSSProperties } from 'react';
import styles from './CalendarDay.module.css';
import { EventsHandler, EventUI } from '../../utils/EventsHandler';
import { EventsDay } from '../../utils/types';

interface CalendarDayProps {
  evenements: EventsDay[];
  currentDate: Date;
}

/**
 * Component representing a calendar day with events.
 * @param evenements - Array of events grouped by day.
 * @param currentDate - Current date for filtering events.
 * @returns CalendarDay component.
 */
const CalendarDay: React.FC<CalendarDayProps> = ({ evenements, currentDate }) => {
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight * 0.8);
  const [hauteurParMinute, setHauteurParMinute] = useState<number>(windowHeight / (12 * 60));
  const drawnEvents: Set<number> = new Set();
  const heuresDuJour = Array.from({ length: 13 }, (_, i) => 9 + i); // De 09:00 à 21:00
  const [filteredEvents, setFilteredEvents] = useState<EventUI[]>([]);

  useEffect(() => {
    // find events to get those matching the current day
    const filteredEvents =
      evenements.find((eventsDay) => new Date(eventsDay.date).toDateString() === currentDate.toDateString())
        ?.evenements ?? [];

    const eventsHandler = new EventsHandler(filteredEvents);
    const eventUIs = eventsHandler.calculateWidthsAndPositions(100);
    setFilteredEvents([...eventUIs.values()]);
  }, [evenements, currentDate]);

  useEffect(() => {
    // Handle window resize event to update height and height per minute
    const handleResize = (): void => {
      const newHeight: number = window.innerHeight * 0.8;
      setWindowHeight(newHeight);
      setHauteurParMinute(newHeight / (12 * 60));
    };

    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Get minutes from start time.
   * @param start - Start time string (e.g., '09:00').
   * @returns Minutes from start time.
   */
  const getMinutesFromStart = (start: string): number => {
    const [hours, minutes] = start.split(':').map(Number);
    return hours * 60 + minutes - 540;
  };

  /**
   * Calculate styles for event UI representation.
   * @param eventUI - Event UI object.
   * @param totalColumns - Total number of columns.
   * @returns CSSProperties for the event.
   */
  const calculerStyleEvent = (eventUI: EventUI): CSSProperties | undefined => {
    if (drawnEvents.has(eventUI.id)) return undefined; // Skip if event has been drawn, return undefined
    drawnEvents.add(eventUI.id); // Mark event as drawn
    const width: number = eventUI.width;
    const startMinutes: number = getMinutesFromStart(eventUI.start);
    const top: number = startMinutes * hauteurParMinute;
    const height: number = eventUI.duration * hauteurParMinute;
    const left: number = (eventUI.position - 1) * eventUI.width;

    return {
      top: `${top}px`,
      height: `${height}px`,
      width: `${width}%`,
      left: `${left}%`,
      position: 'absolute',
      backgroundColor: '#E6E6FA',
      border: '1px solid #D1D5DB',
      color: '#1F2937',
      boxSizing: 'border-box',
      borderRadius: '0.3rem',
    };
  };

  return (
    <div className={styles.container}>
      <div className={styles.heures}>
        {heuresDuJour.map((heure, i) => (
          <div key={i} className={styles.heure} style={{ height: `${hauteurParMinute * 60}px` }}>
            {heure}:00
          </div>
        ))}
      </div>
      <div className={styles.lignesHorizontales}>
        {heuresDuJour.map((heure, i) => (
          <div key={i} className={styles.ligneHorizontale}></div>
        ))}
      </div>
      <div className={styles.evenements}>
        {filteredEvents.map((eventUI: EventUI) => (
          <div key={eventUI.id} style={calculerStyleEvent(eventUI)}>
            {eventUI.id}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarDay;
