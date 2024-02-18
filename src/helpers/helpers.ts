export function toDollars(cents: number) {
  const dollars = (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return dollars;
}

export function toHoursAndMinutes(time: number) {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return {hours: hours, minutes: minutes};
}

export function toPerHour(time: number, cents: number) {
  const roughPerHr = ((cents / time) * 60) / 100;
  const perHr = (Math.round(roughPerHr * 100) / 100).toFixed(2);
  return perHr;
}
