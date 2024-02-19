export function combineTime(dataArr: Array<any>) {
  var totalTime: number = 0;
  dataArr.forEach(item => {
    totalTime += item.time;
  });
  return totalTime;
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

export function toDollars(cents: number) {
  const dollars = (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return dollars;
}

export function combineItemMoney(dataArr: Array<any>) {
  var itemsArr: Array<any> = [];
  dataArr.forEach(item => {
    var amount: number = 0;
    var id: number = item.id;
    amount += item.cash;
    amount += item.credit;
    amount += item.tip_in;
    amount += item.hourly_rate * (item.time / 60);
    amount -= item.tip_out;
    itemsArr.push({
      id: id,
      amount: (Math.round(amount * 100) / 100).toFixed(0),
    });
  });
  return itemsArr;
}

export function combineDayMoney(dataArr: Array<any>) {
  var amount: number = 0;
  dataArr.forEach(item => {
    amount += item.cash;
    amount += item.credit;
    amount += item.tip_in;
    amount += item.hourly_rate * (item.time / 60);
    amount -= item.tip_out;
  });
  return Number((Math.round(amount * 100) / 100).toFixed(0));
}
export function combineMonthMoney(dataArr: Array<any>) {
  var itemsArr: Array<any> = [];
  dataArr.forEach(item => {
    var amount: number = 0;
    var id: number = item.id;
    amount += item.cash;
    amount += item.credit;
    amount += item.tip_in;
    amount += item.hourly_rate * (item.time / 60);
    amount -= item.tip_out;
    itemsArr.push({
      id: id,
      amount: (Math.round(amount * 100) / 100).toFixed(0),
    });
  });
  return itemsArr;
}
