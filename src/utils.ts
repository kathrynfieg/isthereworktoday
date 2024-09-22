import { County, Holiday } from '@/models';

export function getAllPublicHolidays(holidays: Holiday[], state: County) {
  return holidays.filter(
    (holiday) => holiday.counties?.includes(state) || !holiday.counties
  );
}

export function getRandomMessage<T>(messages: T[]): T {
  return messages[Math.floor(Math.random() * messages.length)];
}
