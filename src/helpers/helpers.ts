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

export function combineMoney(dataArr: Array<any>) {
  var amount: number = 0;
  dataArr.forEach(item => {
    amount += item.cash;
    amount += item.credit;
    amount += item.tip_in;
    amount += item.hourly_rate * (item.time / 60);
    amount -= item.tip_out;
  });
  console.log('amount', (Math.round(amount * 100) / 100).toFixed(2)); //@DEBUG
  return (Math.round(amount * 100) / 100).toFixed(2);
}

export function combineTime(dataArr: Array<any>) {
  var time: number = 0;
  dataArr.forEach(item => {
    time += item.minutes;
  });
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return {hours: hours, minutes: minutes};
}
