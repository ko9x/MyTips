import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

enablePromise(true);

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

export const getTodayData = async (db: SQLiteDatabase) => {
  try {
    const data: Array<any> = [];
    const results = await db.executeSql(
      'Select * from tbl_tip where date = ?',
      ['2024-02-03'],
    );
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        data.push(result.rows.item(index));
      }
    });
    return data;
  } catch (error) {
    console.error(error);
    throw Error('failed to get data from database');
  }
};

// tx.executeSql(
//     'SELECT * FROM tbl_tip where id = ?',
//     [7],
//     (dbObj, results) => {
//       var len = results.rows.length;
//       console.log('ugggggh', dbObj.db);
//       if (len > 0) {
//         let res = results.rows.item(0);
//         console.log('up in here', res);
//       } else {
//         console.log('nothing');
//       }
//     },
//   );
