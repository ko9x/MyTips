import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import Colors from '../global/Colors';
import Moment from 'moment';
import ListItems from './ListItems';
import InformationItem from './InformationItem';
import {
  combineDayMoney,
  toDollars,
  combineTime,
  toHoursAndMinutes,
  toPerHour,
} from '../helpers/helpers';

export default function DayItem({reservation}: any): React.JSX.Element {
  const totalTime = combineTime(reservation.data);
  function renderInformationItems(itemArr: Array<any>) {
    const infoItemArr: Array<any> = [];
    if (itemArr[0].cash) {
      const infoObj = {
        iconName: 'cash',
        title: 'cash',
        amount: toDollars(itemArr[0].cash),
        color: Colors.dark,
      };
      infoItemArr.push(<InformationItem key={1} {...infoObj} />);
    }
    if (itemArr[0].credit) {
      const infoObj = {
        iconName: 'credit-card',
        title: 'credit',
        amount: toDollars(itemArr[0].credit),
        color: Colors.dark,
      };
      infoItemArr.push(<InformationItem key={2} {...infoObj} />);
    }
    if (itemArr[0].hourly) {
      const infoObj = {
        iconName: 'cash-clock',
        title: 'hourly',
        amount: toDollars(itemArr[0].hourly),
        color: Colors.dark,
      };
      infoItemArr.push(<InformationItem key={3} {...infoObj} />);
    }
    if (itemArr[0].tip_in) {
      const infoObj = {
        iconName: 'cash-plus',
        title: 'tip in',
        amount: toDollars(itemArr[0].tip_in),
        color: Colors.dark,
      };
      infoItemArr.push(<InformationItem key={4} {...infoObj} />);
    }
    if (itemArr[0].tip_out) {
      const infoObj = {
        iconName: 'cash-minus',
        title: 'tip out',
        amount: toDollars(itemArr[0].tip_out),
        color: Colors.danger,
      };
      infoItemArr.push(<InformationItem key={5} {...infoObj} />);
    }
    if (itemArr[0].total_sales) {
      const infoObj = {
        iconName: 'cash-register',
        title: 'total sales',
        amount: toDollars(itemArr[0].total_sales),
        color: Colors.dark,
      };
      infoItemArr.push(<InformationItem key={6} {...infoObj} />);
    }
    return infoItemArr;
  }
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
          <Text>{toPerHour(totalTime, combineDayMoney(reservation.data))}</Text>
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
      <View>
        <Text style={[styles.agendaSectionTitle, styles.informationItemTitle]}>
          Tip Information
        </Text>
      </View>
      <View>{renderInformationItems(reservation.data)}</View>
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
  informationItemTitle: {paddingTop: 5},
});
