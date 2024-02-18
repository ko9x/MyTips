import React, {useRef, useState, useEffect} from 'react';
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
import {DUMMY_DATA} from '../mocks/DUMMYDB';
import DayItem from '../components/DayItem';
import MultiItemBar from '../components/MultiItemBar';
import {
  connectToDatabase,
  getTodayData,
  getCurrentMonthData,
  getMonthData,
  getSectionData,
} from '../providers/TipProvider';
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

  function createMarked(arr: Array<any>) {
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
  }

  async function getThing() {
    const db = await connectToDatabase();
    const grabbedData = await getMonthData(db, '02');

    setData(createMarked(grabbedData));
  }

  // This useEffect is mad because we are not adding getThing to the dependancy array.
  // We could wrap getThing in a useCallback but I haven't done that yet.
  useEffect(() => {
    getThing();
  }, [selectedDate]);

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

  // This is here because I am probably going to need the calOpen state eventually and I kept getting warnings about it not being used anywhere
  if (calOpen) {
    console.log('calendar is open');
  }

  return (
    <CalendarProvider
      date={today}
      onDateChanged={date => handleDateChange(date)}
      showTodayButton={showTodayButton}
      theme={theme.current}
      todayBottomMargin={30}>
      <View
        style={{
          zIndex: 100,
          backgroundColor: Colors.primary,
        }}>
        <View style={{height: calOpen ? 60 : 0}}>
          <MultiItemBar
            props={{first: '$32.20/hr', second: '$300', third: '11hr 20min'}}
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
          // closeOnDayPress={false}
        />
      </View>
      <Agenda
        style={{zIndex: 0, marginTop: -105}}
        loadItemsForMonth={loadItems}
        items={DUMMY_DATA}
        selected={selectedDate}
        renderEmptyData={() => {
          return (
            <View style={styles.agendaItemContainer}>
              <Text>Hey add something here!</Text>
              <Button mode="contained">Click here</Button>
            </View>
          );
        }}
        renderItem={(reservation: AgendaEntry) => {
          if (reservation.day === selectedDate) {
            return <DayItem reservation={reservation} />;
          } else {
            return (
              <View style={{height: 0}}>
                <Text />
              </View>
            );
          }
        }}
        // Specify how empty date content with no items should be rendered
        renderEmptyDate={() => {
          return (
            <View style={styles.agendaItemContainer}>
              <Text>Hey add something here!</Text>
              <Button mode="contained">Click here</Button>
            </View>
          );
        }}
      />
    </CalendarProvider>
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
