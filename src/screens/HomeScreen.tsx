import React, {useRef, useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button} from 'react-native-paper';
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
import {connectToDatabase, getCalendarData} from '../providers/TipProvider';
import {getCurrentMonthTotals} from '../helpers/helpers';
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

  const initializeApp = useCallback(() => {
    async function getTipData() {
      const db = await connectToDatabase();
      const tipData = await getCalendarData(db, selectedDate);
      setDatabaseItems(tipData.itemObj);
      setData(createMarked(tipData.itemArr));
      setMonthTotals(getCurrentMonthTotals(tipData.itemArr, selectedDate));
    }
    getTipData();
  }, [selectedDate, createMarked]);

  // Gives the calendar a half second to update after the calendar is closed
  useEffect(() => {
    if (!calOpen) {
      setCalClosedTimer(true);
      setTimeout(() => {
        setCalClosedTimer(false);
      }, 500);
    }
  }, [calOpen]);

  useEffect(() => {
    initializeApp();
  }, [selectedDate, initializeApp]);

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
              <View style={styles.agendaItemContainer}>
                <Text>Hey add something here!</Text>
                <Button
                  onPress={() => {
                    setShowManageTipModal(true);
                  }}
                  mode="contained">
                  Open Modal
                </Button>
              </View>
            );
          }}
          renderItem={(reservation: AgendaEntry) => {
            if (reservation.day === selectedDate) {
              return (
                <DayItem
                  handleSetShowManageTipModal={setShowManageTipModal}
                  reservation={reservation}
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
      <ManageTipModal
        showManageTipModal={showManageTipModal}
        closeManageTipModal={closeManageTipModal}
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
