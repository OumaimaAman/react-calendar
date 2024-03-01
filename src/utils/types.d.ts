export enum CalendarViewType {
  DAY = 'DAY',
  MONTH = 'MONTH'
}

export interface Event {
  id: number;
  start: string;
  duration: number;
}

export interface EventsDay {
  date: Date, evenements: Event[];
}

