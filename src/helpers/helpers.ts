import Colors from '../global/Colors';

export function getCurrentMonthTotals(
  dataArr: Array<any>,
  selectedDate: String,
) {
  const itemArr: Array<any> = [];
  const totalsObj = {};
  dataArr.forEach(item => {
    if (item.date.slice(5, 7) === selectedDate.slice(5, 7)) {
      itemArr.push(item);
    }
  });
  const money = combineMonthMoney(itemArr);
  const time = combineTime(itemArr);
  const hourly = toPerHour(time, money);
  return {
    money: toDollars(money),
    time: toHoursAndMinutes(time),
    hourly: hourly,
  };
}

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
  const perHr = `$${(Math.round(roughPerHr * 100) / 100).toFixed(2)}/hr`;
  return perHr;
}

export function toDollars(cents: number) {
  const dollars = (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return dollars;
}

export function combineHourlyRateAndTime(hourlyRate: number, time: number) {
  const amount = hourlyRate * (time / 60);
  return amount;
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
  var amount: number = 0;
  dataArr.forEach(item => {
    amount += item.cash;
    amount += item.credit;
    amount += item.tip_in;
    amount += combineHourlyRateAndTime(item.hourly_rate, item.time);
    amount -= item.tip_out;
  });
  return Number((Math.round(amount * 100) / 100).toFixed(0));
}

export const infoItemBuilderObjArr: Array<any> = [
  {
    itemName: 'cash',
    iconName: 'cash',
    title: 'cash',
    color: Colors.dark,
    key: 1,
    itemFunction: (totalNum: number, itemNum: number) => {
      return totalNum + itemNum;
    },
  },
  {
    itemName: 'credit',
    iconName: 'credit-card',
    title: 'credit',
    color: Colors.dark,
    key: 2,
    itemFunction: (totalNum: number, itemNum: number) => {
      return (totalNum += itemNum);
    },
  },
  {
    itemName: 'hourly_rate',
    iconName: 'cash-fast',
    title: 'wages',
    color: Colors.dark,
    key: 3,
    itemFunction: combineHourlyRateAndTime,
  },
  {
    itemName: 'tip_in',
    iconName: 'cash-plus',
    title: 'tip in',
    color: Colors.dark,
    key: 4,
    itemFunction: (totalNum: number, itemNum: number) => {
      return (totalNum += itemNum);
    },
  },
  {
    itemName: 'tip_out',
    iconName: 'cash-minus',
    title: 'tip out',
    color: Colors.danger,
    key: 5,
    itemFunction: (totalNum: number, itemNum: number) => {
      return (totalNum -= itemNum);
    },
  },
  {
    itemName: 'total_sales',
    iconName: 'cash-register',
    title: 'total sales',
    color: Colors.dark,
    key: 6,
    itemFunction: (totalNum: number, itemNum: number) => {
      return totalNum + itemNum;
    },
  },
];
