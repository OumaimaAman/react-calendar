import React, { ReactElement } from 'react';
import styles from './CalendarMonth.module.css';

interface CalendarMonthProps {
  currentDate: Date;
}

/**
 * Component representing a calendar month.
 * @param currentDate - Current date for the month to display.
 * @returns CalendarMonth component.
 */
const CalendarMonth = ({ currentDate }: CalendarMonthProps): ReactElement => {
  const weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const today = new Date();

  // Function to get the first day (e.g., Monday) of the month
  const firstDayOfMonth = () => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    return date.getDay();
  };

  // Function to get all days of the month
  const daysOfMonth = () => {
    const resultat = [];
    const annee = currentDate.getFullYear();
    const mois = currentDate.getMonth();

    const dernierJourDuMois = new Date(annee, mois + 1, 0).getDate();

    for (let jour = 1; jour <= dernierJourDuMois; jour++) {
      resultat.push(new Date(annee, mois, jour));
    }
    return resultat;
  };

  return (
    <div className={styles.calendrier}>
      <div className={`${styles['grid-container']} ${styles['week-days']}`}>
        {weekDays.map((day, index) => (
          <div key={index} className={styles['week-day']}>
            {day}
          </div>
        ))}
      </div>
      <div className={`${styles['grid-container']} ${styles['month-days']}`}>
        {Array(firstDayOfMonth())
          .fill(null)
          .map((_, index) => (
            <div key={`empty-${index}`} className={styles.empty} />
          ))}
        {daysOfMonth().map((day, index) => {
          const isCurrentDay =
            day.getDate() === today.getDate() &&
            day.getMonth() === today.getMonth() &&
            day.getFullYear() === today.getFullYear();
          return (
            <div key={index} className={styles.day}>
              <span className={isCurrentDay ? styles['current-day'] : ''}>{day.getDate()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarMonth;
