import React from 'react';
import styles from './Header.module.css';
import IconArrows from '../Icons/IconLeftArrow';
import { CalendarViewType } from '../../utils/types.d';

interface HeaderProps {
  calendarViewType: CalendarViewType;
  currentDate: Date;
  setCalendarViewType: React.Dispatch<React.SetStateAction<CalendarViewType>>;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}

const Header: React.FC<HeaderProps> = ({ calendarViewType, currentDate, setCurrentDate, setCalendarViewType }) => {
  const onChangeCalendarViewType = (): void => {
    setCalendarViewType(calendarViewType === CalendarViewType.DAY ? CalendarViewType.MONTH : CalendarViewType.DAY);
  };

  const changeDate = (direction: 'left' | 'right', calendarViewType: CalendarViewType) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);

      if (calendarViewType === CalendarViewType.DAY) {
        // Logique pour changer le jour
        if (direction === 'left') {
          newDate.setDate(prevDate.getDate() - 1);
        } else {
          newDate.setDate(prevDate.getDate() + 1);
        }
      } else if (calendarViewType === CalendarViewType.MONTH) {
        // Logique pour changer le mois
        if (direction === 'left') {
          newDate.setMonth(prevDate.getMonth() - 1, 1);
        } else {
          newDate.setMonth(prevDate.getMonth() + 1, 1);
        }
      }

      return newDate;
    });
  };

  const setToCurrentDate = () => {
    setCurrentDate(new Date());
  };

  return (
    <div>
      <div className={styles['date-navigation']}>
        <button onClick={onChangeCalendarViewType}>
          {calendarViewType === CalendarViewType.DAY ? CalendarViewType.MONTH : CalendarViewType.DAY}
        </button>

        <div className={styles['center-group']}>
          <div onClick={() => changeDate('left', calendarViewType)} className={styles['nav-icon']}>
            <IconArrows direction="left" />
          </div>

          <div className={styles['current-date']}>
            {calendarViewType === CalendarViewType.DAY &&
              currentDate.toLocaleString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            {calendarViewType === CalendarViewType.MONTH &&
              currentDate.toLocaleString('fr', { month: 'long', year: 'numeric' })}
          </div>

          <div onClick={() => changeDate('right', calendarViewType)} className={styles['nav-icon']}>
            <IconArrows direction="right" />
          </div>
        </div>
        <button onClick={setToCurrentDate}>TODAY</button>
      </div>
    </div>
  );
};

export default Header;
