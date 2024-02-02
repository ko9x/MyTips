import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

export default function StatsScreen(): React.JSX.Element {
  var db = openDatabase({
    name: 'tip.db',
    createFromLocation: 1,
  });

  // useEffect(() => {
  //   createTable();
  // }, []);

  // const createTable = async () => {
  //   const query_create = `CREATE TABLE IF NOT EXISTS users(
  //       id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,
  //       mobileNo TEXT NOT NULL UNIQUE, password TEXT NOT NULL
  //   );`;
  //   try {
  //     console.log('do this here');
  //     await db.executeSql(query_create);
  //   } catch (err) {
  //     console.log({err});
  //   }
  // };

  // const insertData = async () => {
  //   const query_insert =
  //     'INSERT INTO users (name, mobileNo, password) VALUES (?,?,?)';
  //   const params = ['Fran', '1234567890', '221B'];

  //   try {
  //     await db.executeSql(query_insert, params);
  //   } catch (err) {
  //     console.log('err', err);
  //   }
  // };

  // insertData();

  let searchUser = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tbl_tip where id = ?',
        [6],
        (dbObj, results) => {
          var len = results.rows.length;
          console.log('ugggggh', dbObj.db);
          if (len > 0) {
            let res = results.rows.item(0);
            console.log('up in here', res);
          } else {
            console.log('nothing');
          }
        },
      );
    });
  };

  searchUser();
  return (
    <View>
      <Text>Hello from Stats!</Text>
    </View>
  );
}
