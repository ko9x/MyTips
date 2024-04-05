import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import Moment from 'moment';
import {TipDataObj} from '../global/Interfaces';
import {toDollars} from '../helpers/helpers';

// enablePromise(true) is required for react-native-sqlite-storage to work
enablePromise(true);

// ********************************* CONNECT TO DATABASE ***************************************************
// Initial call to the database to create the database object to call db.executeSql
export const connectToDatabase = async () => {
  return openDatabase(
    {name: 'tip.db', location: 'Documents'},
    () => {},
    error => {
      console.log(error);
      throw Error('Could not connect to database');
    },
  );
};
// Create the database table (currently tip_3_tbl) if it does not already exist.
export const createDatabaseTable = async (db: SQLiteDatabase) => {
  const query =
    'CREATE TABLE IF NOT EXISTS tip_3_tbl (id INTEGER NOT NULL UNIQUE, date TEXT NOT NULL, job TEXT NOT NULL, time INTEGER NOT NULL, cash INTEGER, credit INTEGER, tip_in INTEGER, tip_out INTEGER, total_sales INTEGER, hourly_rate INTEGER, note TEXT, section TEXT, PRIMARY KEY(id AUTOINCREMENT)  );';
  await db.executeSql(query);
};
// ********************************* GET DATA FROM DATABASE ***************************************************
// Return all the data in the selected table and format it to our requirements
export const getAllData = async (db: SQLiteDatabase) => {
  interface DataObj {
    [key: string]: Array<any>;
  }
  try {
    const data: DataObj = {};
    const results = await db.executeSql('Select * from tip_3_tbl');
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        if (data[result.rows.item(index).date]) {
          data[result.rows.item(index).date][0].data.push({
            id: result.rows.item(index).id,
            job: result.rows.item(index).job,
            section: result.rows.item(index).section,
            time: result.rows.item(index).time,
            cash: result.rows.item(index).cash,
            credit: result.rows.item(index).credit,
            tip_in: result.rows.item(index).tip_in,
            tip_out: result.rows.item(index).tip_out,
            total_sales: result.rows.item(index).total_sales,
            hourly_rate: result.rows.item(index).hourly_rate,
            note: result.rows.item(index).note,
          });
        } else {
          data[result.rows.item(index).date] = [
            {
              day: result.rows.item(index).date,
              data: [
                {
                  id: result.rows.item(index).id,
                  job: result.rows.item(index).job,
                  section: result.rows.item(index).section,
                  time: result.rows.item(index).time,
                  cash: result.rows.item(index).cash,
                  credit: result.rows.item(index).credit,
                  tip_in: result.rows.item(index).tip_in,
                  tip_out: result.rows.item(index).tip_out,
                  total_sales: result.rows.item(index).total_sales,
                  hourly_rate: result.rows.item(index).hourly_rate,
                  note: result.rows.item(index).note,
                },
              ],
            },
          ];
        }
      }
    });
    return data;
  } catch (error) {
    console.error(error);
    throw Error('failed to get current month data from database');
  }
};
// Get all the data for the selected month as well as the prior month and next month
// This way the calendar will always show the days that have data
export const getCalendarData = async (
  db: SQLiteDatabase,
  selectedDate: string,
) => {
  const startDate = Moment(selectedDate)
    .subtract(40, 'days')
    .toISOString()
    .split('T')[0];
  const endDate = Moment(selectedDate)
    .add(40, 'days')
    .toISOString()
    .split('T')[0];

  interface DataObj {
    [key: string]: Array<any>;
  }
  try {
    const databaseObj = {};
    const data: DataObj = {};
    const itemArr: Array<any> = [];
    const results = await db.executeSql(
      'Select * from tip_3_tbl where (date between ? AND ?)',
      [startDate, endDate],
    );
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        if (data[result.rows.item(index).date]) {
          data[result.rows.item(index).date][0].data.push({
            id: result.rows.item(index).id,
            job: result.rows.item(index).job,
            section: result.rows.item(index).section,
            time: result.rows.item(index).time,
            cash: result.rows.item(index).cash,
            credit: result.rows.item(index).credit,
            tip_in: result.rows.item(index).tip_in,
            tip_out: result.rows.item(index).tip_out,
            total_sales: result.rows.item(index).total_sales,
            hourly_rate: result.rows.item(index).hourly_rate,
            note: result.rows.item(index).note,
          });
        } else {
          data[result.rows.item(index).date] = [
            {
              day: result.rows.item(index).date,
              data: [
                {
                  id: result.rows.item(index).id,
                  job: result.rows.item(index).job,
                  section: result.rows.item(index).section,
                  time: result.rows.item(index).time,
                  cash: result.rows.item(index).cash,
                  credit: result.rows.item(index).credit,
                  tip_in: result.rows.item(index).tip_in,
                  tip_out: result.rows.item(index).tip_out,
                  total_sales: result.rows.item(index).total_sales,
                  hourly_rate: result.rows.item(index).hourly_rate,
                  note: result.rows.item(index).note,
                },
              ],
            },
          ];
        }
      }
    });
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        itemArr.push(result.rows.item(index));
      }
    });
    return {itemObj: data, itemArr: itemArr};
  } catch (error) {
    console.error(error);
    throw Error('failed to get current month data from database');
  }
};
// Return all database objects that have a date that matches todays date
// So we can show the user their tips for the current day
export const getTodayData = async (db: SQLiteDatabase, today: String) => {
  try {
    const data: Array<any> = [];
    const results = await db.executeSql(
      'Select * from tip_3_tbl where date = ?',
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
      "Select * from tip_3_tbl where strftime('%m', date) = ? and strftime('%Y', date) = ?",
      [month, year],
    );
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        data.push(result.rows.item(index));
      }
    });
    return {data};
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
      "Select * from tip_3_tbl where strftime('%m', date) = ?",
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
      'Select * from tip_3_tbl where section = ?',
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
export const getExistingJobs = async (db: SQLiteDatabase) => {
  try {
    const jobArr: Array<any> = [];
    const rawWageArr: Array<any> = [];
    let wageArr: Array<any> = [];
    const results = await db.executeSql(
      'Select job, hourly_rate from tip_3_tbl',
    );
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        if (!jobArr.find(element => element === result.rows.item(index).job)) {
          jobArr.push(result.rows.item(index).job);
        }
        if (
          result.rows.item(index).hourly_rate &&
          !rawWageArr.find(
            element => element === result.rows.item(index).hourly_rate,
          )
        ) {
          rawWageArr.push(result.rows.item(index).hourly_rate);
        }
      }
    });
    rawWageArr.forEach(element => wageArr.push(toDollars(element)));
    return {jobs: jobArr, wages: wageArr};
  } catch (error) {
    console.error(error);
    throw Error('failed to get existing jobs data from database');
  }
};
// ********************************* ADD DATA TO DATABASE ***************************************************

export const addTip = async (db: SQLiteDatabase, tipObject: TipDataObj) => {
  try {
    const results = await db.executeSql(
      'INSERT into tip_3_tbl(date, job, time, cash, credit, tip_in, tip_out, total_sales, hourly_rate, note, section) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        tipObject.date,
        tipObject.job,
        tipObject.time,
        tipObject.cash,
        tipObject.credit,
        tipObject.tip_in,
        tipObject.tip_out,
        tipObject.total_sales,
        tipObject.hourly_rate,
        tipObject.note,
        tipObject.section,
      ],
    );
    if (results) {
      console.log(results);
    }
  } catch (error) {
    console.error(error);
    throw Error('failed to add tipObject data to database');
  }
};

export const editTip = async (
  db: SQLiteDatabase,
  tipObject: TipDataObj,
  id: number,
) => {
  const query =
    'UPDATE tip_3_tbl SET date=?, job=?, time=?, cash=?, credit=?, tip_in=?, tip_out=?, total_sales=?, hourly_rate=?, note=?, section=? WHERE id = ? RETURNING *';
  try {
    const results = await db.executeSql(query, [
      tipObject.date,
      tipObject.job,
      tipObject.time,
      tipObject.cash,
      tipObject.credit,
      tipObject.tip_in,
      tipObject.tip_out,
      tipObject.total_sales,
      tipObject.hourly_rate,
      tipObject.note,
      tipObject.section,
      id,
    ]);
    if (results) {
      return results[0].rows.item(0);
    }
  } catch (error) {
    console.error(error);
    throw Error('failed to add tipObject data to database');
  }
};

// ********************************* DELETE DATA FROM DATABASE ***************************************************

export const removeTip = async (db: SQLiteDatabase, id: number) => {
  const query = 'DELETE FROM tip_3_tbl WHERE id = ?';
  try {
    const results = await db.executeSql(query, [id]);
    if (results) {
      console.log(`Row with id ${id} removed from the database`);
    }
  } catch (error) {
    console.error(error);
    throw Error('failed to add tipObject data to database');
  }
};
