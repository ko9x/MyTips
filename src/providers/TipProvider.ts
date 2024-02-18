import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

// This breaks the database call in StatsScreen for some reason.
// But without it the data from the database doesn't render
enablePromise(true);

// Initial call to the database to we can create a database object in the HomeScreen
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
      'Select * from tip_2_tbl where date = ?',
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
export const getAllData = async (db: SQLiteDatabase) => {
  interface DataObj {
    [key: string]: Array<any>;
  }
  try {
    const data: DataObj = {};
    const results = await db.executeSql('Select * from tip_2_tbl');
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
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
    });
    return data;
  } catch (error) {
    console.error(error);
    throw Error('failed to get current month data from database');
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
      "Select * from tip_2_tbl where strftime('%m', date) = ? and strftime('%Y', date) = ?",
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
      "Select * from tip_2_tbl where strftime('%m', date) = ?",
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
      'Select * from tip_2_tbl where section = ?',
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
