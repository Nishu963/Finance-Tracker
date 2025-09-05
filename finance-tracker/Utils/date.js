import { format } from 'date-fns';

export const dateKey = (date) => format(new Date(date), 'yyyy-MM-dd');
export const prettyDate = (key) => format(new Date(key), 'EEE, dd MMM');

export const isToday = (date) => {
  const d = new Date(date);
  const now = new Date();
  return d.toDateString() === now.toDateString();
};

export const isThisWeek = (date) => {
  const d = new Date(date);
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 7);
  return d >= weekStart && d < weekEnd;
};

export const isThisMonth = (date) => {
  const d = new Date(date);
  const now = new Date();
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
};
