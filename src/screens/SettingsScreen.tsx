import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import {Agenda, DateData, AgendaEntry} from 'react-native-calendars';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';
import Colors from '../global/Colors';
const initialDate = new Date();
const offsetAmount = initialDate.getTimezoneOffset() * 60000;
const offsetDate = initialDate.getTime() - offsetAmount;
const momentDate = Moment(offsetDate);
const today = momentDate.toISOString().split('T')[0];

export default function SettingsScreen(): React.JSX.Element {
  const initialTitleMonth = Moment(momentDate).format('MMMM YYYY');
  const [titleMonth, setTitleMonth] = useState(initialTitleMonth);
  const [isCalOpen, setIsCalOpen] = useState(false);
  const [items, setItems] = useState({});

  function timeToString(time: number) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  const loadItems = (day: DateData) => {
    const tempItems: Record<string, any> = {} || items;

    // setTimeout(() => {
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
    // }, 1000);
  };

  function determineKnobIcon(calState: boolean): React.JSX.Element {
    let iconName = '';
    if (calState) {
      iconName = 'chevron-up';
    } else {
      iconName = 'chevron-down';
    }
    return (
      <MaterialCommunityIcons name={iconName} size={25} color={Colors.white} />
    );
  }

  return (
    <>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Colors.primary,
          height: '5%',
        }}>
        <Text style={{color: 'white'}}>{titleMonth}</Text>
      </View>
      <Agenda
        items={{
          '2024-01-24': [
            {day: '2024-01-24', height: 180, name: 'testing this'},
          ],
        }}
        // items={items}
        loadItemsForMonth={loadItems}
        firstDay={1}
        selected={today}
        onCalendarToggled={calendarOpened => {
          setIsCalOpen(calendarOpened);
        }}
        onDayPress={day => {
          setTitleMonth(Moment(day.dateString).format('MMMM YYYY'));
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
              style={[styles.item, {height: reservation.height}]}
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
        // Specify how agenda knob should look like
        renderKnob={() => {
          return <View>{determineKnobIcon(isCalOpen)}</View>;
        }}
        // Specify what should be rendered instead of ActivityIndicator
        renderEmptyData={() => {
          return (
            <View style={styles.item}>
              <Text>Hey add something here!</Text>
              <Button title={'click'} />
            </View>
          );
        }}
        showClosingKnob={true}
        // By default, agenda dates are marked if they have at least one item, but you can override this if needed
        markedDates={{
          '2024-01-24': {marked: true},
          '2024-01-25': {marked: true},
          '2024-01-22': {marked: true},
        }}
        // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
        onRefresh={() => console.log('refreshing...')}
        // Set this true while waiting for new data from a refresh
        refreshing={false}
        // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
        // refreshControl={null}
        // Agenda theme
        theme={{
          selectedDayBackgroundColor: Colors.white,
          todayBackgroundColor: Colors.accent,
          dayTextColor: Colors.white,
          agendaDayTextColor: Colors.grey,
          agendaTodayColor: Colors.secondary,
          todayTextColor: Colors.secondary,
          selectedDayTextColor: Colors.secondary,
          dotColor: Colors.white,
          calendarBackground: Colors.primary,
          selectedDotColor: Colors.secondary,
          textSectionTitleColor: Colors.white,
        }}
        // Agenda container style
        style={{}}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  itemText: {
    color: 'red',
    fontSize: 16,
  },
  customDay: {
    margin: 10,
    fontSize: 24,
    color: 'green',
  },
});
