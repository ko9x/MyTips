import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

// This breaks the database call in StatsScreen for some reason.
// But without it the data from the database doesn't render
enablePromise(true);

function toDollars(dataArr: Array<any>) {
  var amount: number = 0;
  dataArr.forEach(item => {
    amount += item.amount;
  });
  const dollars = (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return dollars;
}
function toHoursAndMinutes(dataArr: Array<any>) {
  var time: number = 0;
  dataArr.forEach(item => {
    time += item.minutes;
  });
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return {hours: hours, minutes: minutes};
}

export const connectToDatabase = async () => {
  return openDatabase(
    {name: 'tip.db', createFromLocation: 1},
    () => {},
    error => {
      console.log(error);
      throw Error('Could not connect to database');
    },
  );
};
// Return all database objects that have a date that matches todays date
// So we can show the user their tips for the current day
export const getTodayData = async (db: SQLiteDatabase, today: String) => {
  try {
    const data: Array<any> = [];
    const results = await db.executeSql(
      'Select * from tbl_tip where date = ?',
      [today],
    );
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        data.push(result.rows.item(index));
      }
    });
    return data;
  } catch (error) {
    console.error(error);
    throw Error('failed to get today data from database');
  }
};
// Return all database objects that match the current month and current year
// So we can show the user their tips for the current month
export const getCurrentMonthData = async (
  db: SQLiteDatabase,
  month: String,
  year: String,
) => {
  try {
    const data: Array<any> = [];
    const results = await db.executeSql(
      "Select * from tbl_tip where strftime('%m', date) = ? and strftime('%Y', date) = ?",
      [month, year],
    );
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        data.push(result.rows.item(index));
      }
    });
    const dollars = toDollars(data);
    const totalTime = toHoursAndMinutes(data);
    return {dollars: dollars, totalTime: totalTime};
  } catch (error) {
    console.error(error);
    throw Error('failed to get current month data from database');
  }
};
// Return all database objects that match the entered month
// So we can show the user how much they average in tips in a certain month
export const getMonthData = async (db: SQLiteDatabase, month: String) => {
  try {
    const data: Array<any> = [];
    const results = await db.executeSql(
      "Select * from tbl_tip where strftime('%m', date) = ?",
      [month],
    );
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        data.push(result.rows.item(index));
      }
    });
    return data;
  } catch (error) {
    console.error(error);
    throw Error('failed to get selected month data from database');
  }
};
// Return all database objects that match the entered section
// So we can show the user how much they average in tips in a certain section
export const getSectionData = async (db: SQLiteDatabase, section: String) => {
  try {
    const data: Array<any> = [];
    const results = await db.executeSql(
      'Select * from tbl_tip where section = ?',
      [section],
    );
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        data.push(result.rows.item(index));
      }
    });
    return data;
  } catch (error) {
    console.error(error);
    throw Error('failed to get section data from database');
  }
};
