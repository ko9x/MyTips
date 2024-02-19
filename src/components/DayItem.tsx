import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import Colors from '../global/Colors';
import Moment from 'moment';
import ListItems from './ListItems';
import {
  combineDayMoney,
  toDollars,
  combineTime,
  toHoursAndMinutes,
  toPerHour,
} from '../helpers/helpers';

export default function DayItem({reservation}: any): React.JSX.Element {
  const totalTime = combineTime(reservation.data);
  return (
    <View style={styles.agendaItemContainer}>
      <View style={styles.tipSummaryContainer}>
        <View>
          <Text>{toDollars(combineDayMoney(reservation.data))}</Text>
        </View>
        <View>
          <Text style={styles.tipSummaryDivider}>|</Text>
        </View>
        <View>
          <Text>
            {toHoursAndMinutes(totalTime).hours}{' '}
            {toHoursAndMinutes(totalTime).hours > 1 ? 'hrs' : 'hr'}
            <Text> </Text>
            {toHoursAndMinutes(totalTime).minutes}{' '}
            {toHoursAndMinutes(totalTime).minutes > 1 ? 'mins' : 'min'}
          </Text>
        </View>
        <Text style={styles.tipSummaryDivider}>|</Text>
        <View>
          <Text>
            ${toPerHour(totalTime, combineDayMoney(reservation.data))}/hr
          </Text>
        </View>
      </View>
      <View style={styles.agendaItemTopContainer}>
        <View>
          <Text style={styles.agendaSectionTitle}>
            {Moment(reservation.day).format('MMMM Do, YYYY')}
          </Text>
          <Text style={styles.agendaSubTitle}>Tip size</Text>
        </View>
        <Button
          buttonColor={Colors.primary}
          onPress={() => console.log('clicked')}
          icon="cash-multiple"
          mode="contained">
          Add Tips
        </Button>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <Text style={styles.agendaSectionTitle}>My Tips</Text>
        <Text style={styles.agendaSectionTitle}>
          Today's Total: {toDollars(combineDayMoney(reservation.data))}
        </Text>
      </View>
      <ListItems itemArr={reservation.data} />
    </View>
  );
}

const styles = StyleSheet.create({
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
  agendaSubTitle: {fontSize: 12, fontWeight: '300'},
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
