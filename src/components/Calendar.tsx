import React, { useState, useEffect } from 'react';
import CalendarDay from './CalendarDay/CalendarDay';
import CalendarMonth from './CalendarMonth/CalendarMonth';
import './Calendar.css';
import Header from './Header/Header';
import { CalendarViewType, EventsDay } from '../utils/types.d';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarViewType, setCalendarViewType] = useState(CalendarViewType.DAY);
  const [evenementsByDay, setEvenementsByDay] = useState<EventsDay[]>([]);

  useEffect(() => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const previousDay = new Date(currentDate);
    previousDay.setDate(previousDay.getDate() - 1);

    const evenementsByDayData: EventsDay[] = [
      {
        date: currentDate,
        evenements: [
          { id: 1, start: '09:00', duration: 200 },
          { id: 2, start: '10:00', duration: 130 },
          { id: 3, start: '10:00', duration: 130 },
          { id: 4, start: '14:00', duration: 130 },
          { id: 5, start: '15:00', duration: 130 },
          { id: 6, start: '10:30', duration: 20 },
          { id: 7, start: '11:10', duration: 30 },
          { id: 8, start: '11:00', duration: 30 },
        ],
      },
      {
        date: nextDay,
        evenements: [
          { id: 1, start: '11:00', duration: 120 },
          { id: 2, start: '12:00', duration: 60 },
          { id: 3, start: '10:00', duration: 130 },
          { id: 4, start: '15:00', duration: 120 },
          { id: 5, start: '16:00', duration: 130 },
          { id: 6, start: '17:30', duration: 120 },
          { id: 7, start: '18:10', duration: 30 },
          { id: 8, start: '18:00', duration: 30 },
        ],
      },
      {
        date: previousDay,
        evenements: [
          { id: 1, start: '10:00', duration: 130 },
          { id: 2, start: '11:00', duration: 60 },
          { id: 3, start: '11:30', duration: 60 },
          { id: 4, start: '15:00', duration: 120 },
          { id: 5, start: '20:00', duration: 120 },
          { id: 6, start: '20:30', duration: 30 },
          { id: 7, start: '20:10', duration: 30 },
        ],
      },
    ];

    setEvenementsByDay(evenementsByDayData);
  }, []);

  return (
    <div className="container">
      <Header
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        calendarViewType={calendarViewType}
        setCalendarViewType={setCalendarViewType}
      />
      {calendarViewType === CalendarViewType.MONTH && <CalendarMonth currentDate={currentDate} />}
      {calendarViewType === CalendarViewType.DAY && (
        <CalendarDay evenements={evenementsByDay} currentDate={currentDate} />
      )}
    </div>
  );
}

export default Calendar;
