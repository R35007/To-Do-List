export function convertDateNumberToTime(time: string | number): number {
  const newDate = new Date(parseInt(time.toString()));
  newDate.setHours(0, 0, 0, 0);
  return newDate.getTime();
}
