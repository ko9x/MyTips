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
import {DUMMY_DATA} from '../mocks/DUMMYDB';
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

  function renderDataArray(arr: any = []): React.JSX.Element {
    return arr.map((item: any) => (
      <View key={item.id}>
        <View
          style={{
            borderColor: Colors.lighterGrey,
            borderWidth: 1,
            borderRadius: 20,
            marginVertical: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text>Job: Server</Text>
            <Text>Section: 1</Text>
          </View>
          <View
            style={{
              borderBottomColor: Colors.lighterGrey,
              borderBottomWidth: 1,
              marginLeft: 5,
              marginRight: 5,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              paddingTop: 10,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>total tips</Text>
              <Text>$15</Text>
            </View>
            <View>
              <Text style={styles.tipSummaryDivider}>|</Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>total hours</Text>
              <Text>8</Text>
            </View>
            <View>
              <Text style={styles.tipSummaryDivider}>|</Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>per hour</Text>
              <Text>$4.29</Text>
            </View>
          </View>
        </View>
      </View>
    ));
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
            return (
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                  }}>
                  <Text style={styles.agendaSectionTitle}>My Tips</Text>
                  <Text style={styles.agendaSectionTitle}>
                    Today's Total: $30
                  </Text>
                </View>
                {renderDataArray(reservation.data)}
              </View>
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
  },
  agendaItemTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
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
  tipSummaryDivider: {color: Colors.lighterGrey},
});
