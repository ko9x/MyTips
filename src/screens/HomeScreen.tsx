import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Agenda} from 'react-native-calendars';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';
const initialDate = new Date();
const offsetAmount = initialDate.getTimezoneOffset() * 60000;
const offsetDate = initialDate.getTime() - offsetAmount;
const momentDate = Moment(offsetDate);
const today = momentDate.toISOString().split('T')[0];

export default function HomeScreen(): React.JSX.Element {
  const initialTitleMonth = Moment(momentDate).format('MMMM YYYY');
  const [titleMonth, setTitleMonth] = useState(initialTitleMonth);
  const [isCalOpen, setIsCalOpen] = useState(false);

  function determineKnobIcon(calState: boolean): React.JSX.Element {
    let iconName = '';
    if (calState) {
      iconName = 'chevron-up';
    } else {
      iconName = 'chevron-down';
    }
    return <MaterialCommunityIcons name={iconName} size={25} color={'white'} />;
  }

  return (
    <>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#46c482',
          height: '5%',
        }}>
        <Text style={{color: 'white'}}>{titleMonth}</Text>
      </View>
      <Agenda
        // The list of items that have to be displayed in agenda. If you want to render item as empty date
        // the value of date key has to be an empty array []. If there exists no value for date key it is
        // considered that the date in question is not yet loaded
        // items={{
        //   '2012-05-22': [{name: 'item 1 - any js object'}],
        //   '2012-05-23': [{name: 'item 2 - any js object', height: 80}],
        //   '2012-05-24': [],
        //   '2012-05-25': [
        //     {name: 'item 3 - any js object'},
        //     {name: 'any js object'},
        //   ],
        // }}
        // Callback that gets called when items for a certain month should be loaded (month became visible)
        // loadItemsForMonth={month => {
        //   console.log('trigger items loading');
        // }}
        firstDay={1}
        // Callback that fires when the calendar is opened or closed
        onCalendarToggled={calendarOpened => {
          setIsCalOpen(calendarOpened);
        }}
        // Callback that gets called on day press
        onDayPress={day => {
          setTitleMonth(Moment(day.dateString).format('MMMM YYYY'));
        }}
        // Callback that gets called when day changes while scrolling agenda list
        // onDayChange={day => {
        //   console.log('day changed');
        // }}
        // Initially selected day
        selected={today}
        // Specify how each item should be rendered in agenda
        renderItem={(item, firstItemInDay) => {
          return <View />;
        }}
        // Specify how each date should be rendered. day can be undefined if the item is not first in that day
        renderDay={(day, item) => {
          return <View />;
        }}
        // Specify how empty date content with no items should be rendered
        renderEmptyDate={() => {
          return <View />;
        }}
        // Specify how agenda knob should look like
        renderKnob={() => {
          return <View>{determineKnobIcon(isCalOpen)}</View>;
        }}
        // Specify what should be rendered instead of ActivityIndicator
        renderEmptyData={() => {
          return <View />;
        }}
        // Specify your item comparison function for increased performance
        // rowHasChanged={(r1, r2) => {
        //   return r1.text !== r2.text;
        // }}
        showClosingKnob={true}
        // By default, agenda dates are marked if they have at least one item, but you can override this if needed
        markedDates={{
          '2024-01-16': {marked: true},
          '2024-01-17': {marked: true},
        }}
        // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
        onRefresh={() => console.log('refreshing...')}
        // Set this true while waiting for new data from a refresh
        refreshing={false}
        // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
        // refreshControl={null}
        // Agenda theme
        theme={{
          selectedDayBackgroundColor: 'white',
          dayTextColor: 'white',
          agendaDayTextColor: 'white',
          todayTextColor: 'white',
          selectedDayTextColor: '#21995b',
          dotColor: 'white',
          calendarBackground: '#46c482',
          selectedDotColor: 'purple',
          textSectionTitleColor: 'white',
        }}
        // Agenda container style
        style={{}}
      />
    </>
  );
}
