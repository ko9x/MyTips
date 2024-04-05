import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import {StyleSheet, View, Text, Animated, Pressable} from 'react-native';
import {
  ExpandableCalendar,
  CalendarProvider,
  Agenda,
  AgendaEntry,
  DateData,
} from 'react-native-calendars';
import Moment from 'moment';
import {getTheme} from '../mocks/theme';
import Colors from '../global/Colors';
import DayItem from '../components/DayItem';
import ManageTipModal from '../modals/ManageTipModal';
import MultiItemBar from '../components/MultiItemBar';
import {
  connectToDatabase,
  createDatabaseTable,
  getCalendarData,
} from '../providers/TipProvider';
import {getCurrentMonthTotals} from '../helpers/helpers';
import MoneyBag from '../assets/SVG/money-bag.svg';
import AddTipButton from '../components/AddTipButton';
import {OptionsContext} from '../providers/OptionsProvider';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
const initialDate = new Date();
const offsetAmount = initialDate.getTimezoneOffset() * 60000;
const offsetDate = initialDate.getTime() - offsetAmount;
const momentDate = Moment(offsetDate);
const today = momentDate.toISOString().split('T')[0];
const leftArrowIcon = require('../img/previous.png');
const rightArrowIcon = require('../img/next.png');

export default function HomeScreen() {
  const [showTodayButton, setShowTodayButton] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today);
  const [items, setItems] = useState({});
  const [calOpen, setCalOpen] = useState(false);
  const [data, setData] = useState(Object);
  const theme = useRef(getTheme());
  const [databaseItems, setDatabaseItems] = useState(Object);
  const [monthTotals, setMonthTotals] = useState(Object);
  const [showManageTipModal, setShowManageTipModal] = useState(false);
  const [calClosedTimer, setCalClosedTimer] = useState(false);
  const [deltaY, setDeltaY] = useState(new Animated.Value(-260));
  const [openY, setOpenY] = useState(new Animated.Value(150));
  const [userSaved, setUserSaved] = useState(false);
  const [documentsFolder, setDocumentsFolder] = useState('');
  const [files, setFiles] = useState<any>([]);
  const [fileResponse, setFileResponse] = useState<any>([]);
  const {createDefaultStorageState, clearAllAsyncStorage} =
    useContext(OptionsContext);

  useEffect(() => {
    setTimeout(() => {
      Animated.spring(deltaY, {
        toValue: openY,
        tension: 1,
        friction: 50,
        useNativeDriver: true,
      }).start();
    }, 200);
  }, [deltaY, openY]);

  interface MarkedItem {
    [key: string]: InnerObj;
  }

  interface InnerObj {
    marked?: boolean;
    dotColor?: string;
    selected?: boolean;
  }

  interface arrItem {
    date?: string;
  }

  const createMarked = useCallback(
    (arr: Array<any>) => {
      const marked: MarkedItem = {};
      arr.forEach((item: arrItem) => {
        if (item.date) {
          marked[item.date] = {marked: true, dotColor: 'white'};
        }
        if (item.date && item.date === selectedDate) {
          marked[item.date] = {
            selected: true,
            marked: true,
            dotColor: Colors.primary,
          };
        }
      });
      return marked;
    },
    [selectedDate],
  );

  const getFileContent = async (path: any) => {
    const reader = await RNFS.readDir(path);
    setFiles(reader);
  };

  const replaceDatabase = async (DBPath: any) => {
    const db = await connectToDatabase();
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      await db.close();
      await RNFS.unlink(DBPath);
      await RNFS.copyFile(response[0].uri, DBPath);
      initializeApp();
    } catch (err) {
      console.warn(err);
    }
  };

  const initializeApp = useCallback(() => {
    async function getTipData() {
      // await clearAllAsyncStorage();
      await createDefaultStorageState();
      const db = await connectToDatabase();
      await createDatabaseTable(db);
      const tipData = await getCalendarData(db, selectedDate);
      setDatabaseItems(tipData.itemObj);
      setData(createMarked(tipData.itemArr));
      setMonthTotals(getCurrentMonthTotals(tipData.itemArr, selectedDate));
    }
    getTipData();
    setDocumentsFolder(RNFS.DocumentDirectoryPath);
    getFileContent(RNFS.DocumentDirectoryPath);
  }, [
    selectedDate,
    createMarked,
    createDefaultStorageState,
    // clearAllAsyncStorage,
  ]);

  function shareDB() {
    Share.open({
      title: 'This is the DB',
      message: 'Working?',
      url: files[2].path,
      subject: 'DB',
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  }

  // Gives the calendar a half second to update after the calendar is closed
  useEffect(() => {
    if (!calOpen) {
      setCalClosedTimer(true);
      setTimeout(() => {
        setCalClosedTimer(false);
      }, 500);
      setOpenY(new Animated.Value(150));
    }
    if (calOpen) {
      setOpenY(new Animated.Value(0));
    }
  }, [calOpen]);

  useEffect(() => {
    initializeApp();
  }, [selectedDate, initializeApp]);

  useEffect(() => {
    initializeApp();
    setShowManageTipModal(false);
    setUserSaved(false);
  }, [userSaved, initializeApp]);

  function timeToString(time: number) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  const loadItems = (day: DateData) => {
    const tempItems: Record<string, any> = {} || items;

    for (let i = 0; i < 1; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);

      if (!tempItems[strTime]) {
        tempItems[strTime] = [];
      }
    }

    const newItems: Record<string, any> = {};
    Object.keys(tempItems).forEach(key => {
      newItems[key] = tempItems[key];
    });
    setItems(newItems);
  };

  function handleDateChange(date: any) {
    setSelectedDate(date);
    setShowTodayButton(true);
  }

  function closeManageTipModal() {
    setShowManageTipModal(false);
  }

  return (
    <>
      {calClosedTimer ? (
        <View
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            zIndex: 1000,
          }}
        />
      ) : null}
      <CalendarProvider
        date={today}
        onDateChanged={date => handleDateChange(date)}
        // We need to move the position of the todayButton. It covers the informationItems
        // showTodayButton={showTodayButton}
        theme={theme.current}
        todayBottomMargin={30}>
        <View
          style={{
            zIndex: 100,
            backgroundColor: Colors.primary,
          }}>
          <View style={{height: calOpen ? 60 : 0}}>
            <MultiItemBar
              props={{
                first: monthTotals?.money,
                second: {
                  hours: monthTotals.time?.hours,
                  minutes: monthTotals.time?.minutes,
                },
                third: monthTotals?.hourly,
              }}
            />
          </View>
          <ExpandableCalendar
            onCalendarToggled={(isOpen: boolean) => {
              setCalOpen(isOpen);
            }}
            calendarStyle={styles.calendar}
            theme={theme.current}
            firstDay={1}
            markedDates={data}
            leftArrowImageSource={leftArrowIcon}
            rightArrowImageSource={rightArrowIcon}
            // onDayPress={date => {
            //   console.log(date);
            // }}
            closeOnDayPress={false}
          />
        </View>
        <Agenda
          style={{zIndex: 0, marginTop: -105}}
          loadItemsForMonth={loadItems}
          items={databaseItems}
          selected={selectedDate}
          renderEmptyData={() => {
            return (
              <Animated.View style={{transform: [{translateY: deltaY}]}}>
                <View style={{alignItems: 'center'}}>
                  <MoneyBag width={150} height={150} color={Colors.dark} />
                  <View style={{paddingBottom: 20, marginTop: -20}}>
                    <Text style={{color: Colors.grey}}>
                      No tips entered for today
                    </Text>
                  </View>
                  <AddTipButton onPressFunc={setShowManageTipModal} />
                </View>
              </Animated.View>
            );
          }}
          renderItem={(reservation: AgendaEntry) => {
            if (reservation.day === selectedDate) {
              return (
                <DayItem
                  reservation={reservation}
                  setUserSaved={setUserSaved}
                />
              );
            } else {
              return (
                <View style={{height: 0}}>
                  <Text />
                </View>
              );
            }
          }}
        />
      </CalendarProvider>
      <Text>Documents folder: {documentsFolder}</Text>
      <Pressable
        onPress={() => {
          shareDB();
        }}>
        <Text>Export Database</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          replaceDatabase(files[2].path);
        }}>
        <Text>Import Database</Text>
      </Pressable>
      <ManageTipModal
        date={selectedDate}
        showManageTipModal={showManageTipModal}
        closeManageTipModal={closeManageTipModal}
        setUserSaved={setUserSaved}
      />
    </>
  );
}

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  agendaItemContainer: {
    zIndex: 1000,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
  },
});
