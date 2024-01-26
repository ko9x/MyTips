import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
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
        items={{
          '2024-01-24': [{day: '2024-01-24', name: 'testing this'}],
        }}
        selected={selectedDate}
        renderEmptyData={() => {
          return (
            <View style={styles.item}>
              <Text>Hey add something here!</Text>
              <Button title={'click'} />
            </View>
          );
        }}
        renderItem={(reservation: AgendaEntry, isFirst: boolean) => {
          // return (
          //   <View style={styles.item}>
          //     <Text>Hey add something here!</Text>
          //     <Button title={'click'} />
          //   </View>
          // );
          const fontSize = isFirst ? 16 : 14;
          const color = isFirst ? 'black' : '#43515c';
          return (
            <TouchableOpacity
              style={[styles.item, {height: 380}]}
              onPress={() => Alert.alert(reservation.name)}>
              <Text style={{fontSize, color}}>{reservation.name}</Text>
            </TouchableOpacity>
          );
        }}
        // Specify how empty date content with no items should be rendered
        renderEmptyDate={() => {
          return (
            <View style={styles.item}>
              <Text>Hey add something here!</Text>
              <Button title={'click'} />
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
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 17,
    height: 180,
  },
});
