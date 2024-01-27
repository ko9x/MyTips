import React, {useRef, useState} from 'react';
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
  const theme = useRef(getTheme());

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
        // tempItems[strTime].push({
        //   name: '',
        //   height: 180,
        //   day: strTime,
        // });
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

  const itemObject = {
    '2024-01-24': [
      {day: '2024-01-24', name: 'server', amount: 420, hours: 8, section: '1'},
    ],
    '2024-01-26': [
      {day: '2024-01-26', name: 'bar', amount: 380, hours: 9, section: ''},
    ],
  };

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
        <ExpandableCalendar
          onCalendarToggled={(isOpen: boolean) => {
            setCalOpen(isOpen);
          }}
          calendarStyle={styles.calendar}
          theme={theme.current}
          firstDay={1}
          // markedDates={marked.current}
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
        // items={items}
        items={itemObject}
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
            return (
              <>
                <View style={styles.agendaItemContainer}>
                  <View style={styles.agendaItemTopContainer}>
                    <View>
                      <Text style={styles.agendaSectionTitle}>
                        {Moment(reservation.day).format('MMMM Do, YYYY')}
                      </Text>
                      <Text style={styles.agendaDaySubtitle}>Tip summary</Text>
                    </View>
                    <Button
                      buttonColor={Colors.primary}
                      onPress={() => console.log('clicked')}
                      icon="cash-multiple"
                      mode="contained">
                      Add Tips
                    </Button>
                  </View>
                  <View style={styles.tipSummaryContainer}>
                    <View>
                      <Text>$2.90/hr</Text>
                    </View>
                    <View>
                      <Text style={styles.tipSummaryDivider}>|</Text>
                    </View>
                    <View>
                      <Text>$30</Text>
                    </View>
                    <Text style={styles.tipSummaryDivider}>|</Text>
                    <View>
                      <Text>11hr 20min</Text>
                    </View>
                  </View>
                  <View style={{}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.agendaSectionTitle}>My Tips</Text>
                      <Text style={styles.agendaSectionTitle}>
                        Today's Total: $30
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 80,
                        borderColor: Colors.grey,
                        borderWidth: 1,
                        borderRadius: 20,
                        marginVertical: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text>We need to loop this</Text>
                    </View>
                  </View>
                </View>
              </>
            );
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
    marginHorizontal: 10,
    marginTop: 20,
  },
  agendaItemTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  agendaSectionTitle: {fontSize: 16, fontWeight: '600'},
  agendaDaySubtitle: {fontSize: 12, fontWeight: '300'},
  tipSummaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    height: 40,
    marginVertical: 20,
    borderRadius: 20,
    backgroundColor: Colors.lightGrey,
  },
  tipSummaryDivider: {fontWeight: '200'},
});
