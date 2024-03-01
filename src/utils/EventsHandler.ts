import { Event } from './types';

/**
 * Represents the UI representation of an event, including width and position.
 */
export type EventUI = Event & {
  width: number;
  position: number;
};

/**
 * Class responsible for handling events, including calculating widths and positions for UI representation.
 */
export class EventsHandler {
  private events: Event[];

  /**
  * Constructor for EventsHandler.
  * @param events - Array of events to handle.
  */
  constructor(events: Event[]) {
    this.events = events;
  }

  /**
  * Converts time string to minutes.
  * @param time - Time string in format 'HH:mm'.
  * @returns Time in minutes.
  */
  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  /**
   * Checks if two events overlap in time.
   * @param eventA - First event.
   * @param eventB - Second event.
   * @returns True if events overlap, otherwise false.
   */
  private eventsOverlap(eventA: Event, eventB: Event): boolean {
    const startA = this.timeToMinutes(eventA.start);
    const endA = startA + eventA.duration;
    const startB = this.timeToMinutes(eventB.start);
    const endB = startB + eventB.duration;
    return startA < endB && endA > startB;
  }

  /**
   * Creates subgroups of events based on overlapping time intervals.
   * @returns Array of arrays representing subgroups of events.
   */
  private createSubgroups(): Event[][] {
    const groups: Event[][] = [];
    const eventIdsInGroups = new Set<number>();

    this.events.forEach(event => {
      const overlappingGroups: Event[][] = groups.filter(group =>
        group.some(existingEvent => this.eventsOverlap(existingEvent, event))
      );

      let groupIndex;
      if (overlappingGroups.length === 0) {
        groups.push([event]);
        groupIndex = groups.length - 1;
      } else {
        groupIndex = groups.indexOf(overlappingGroups[0]);
        overlappingGroups.forEach(overlapGroup => {
          groups.splice(groups.indexOf(overlapGroup), 1);
        });
        groups.splice(groupIndex, 0, [...overlappingGroups.flat(), event]);
      }

      eventIdsInGroups.add(event.id);
      groups[groupIndex].sort((a, b) => b.duration - a.duration);
    });

    return groups;
  }

  /**
   * Calculates widths and positions for events in UI representation.
   * @param globalWidth - Total width available for events.
   * @returns Map of event IDs to EventUI objects containing width and position.
   */
  calculateWidthsAndPositions(globalWidth: number): Map<number, EventUI> {
    const groups = this.createSubgroups();
    const eventUIs = new Map<number, EventUI>();

    groups.forEach(group => {
      group.forEach((event, index) => {
        const width = globalWidth / group.length;
        const position = index + 1;
        const eventUI: EventUI = {
          ...event,
          width,
          position
        };
        eventUIs.set(event.id, eventUI);
      });
    });

    return eventUIs;
  }
}
