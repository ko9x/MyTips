import React, {useState} from 'react';
import {View, Text, StyleSheet, Modal, Pressable} from 'react-native';
import Colors from '../global/Colors';
import Moment from 'moment';
import ListItems from './ListItems';
import RenderTipInformationItems from './RenderTipInformationItems';
import {
  combineDayMoney,
  toDollars,
  combineTime,
  toHoursAndMinutes,
  toPerHour,
} from '../helpers/helpers';
import CashMultiple from '../assets/SVG/cash-multiple.svg';
import ViewTipModal from '../modals/ViewTipModal';

export default function DayItem({
  reservation,
  handleSetShowAddTipModal,
}: any): React.JSX.Element {
  const totalTime = combineTime(reservation.data);
  const [showItemModal, setShowItemModal] = useState(false);
  const [pressedItemId, setPressedItemId] = useState(null);
  function handleListItemPressed(itemId: any) {
    setPressedItemId(itemId);
    setShowItemModal(true);
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
        <Pressable
          android_ripple={{
            color: Colors.white,
            borderless: false,
            foreground: true,
          }}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? Colors.dark : Colors.primary,
              borderRadius: 20,
            },
          ]}
          onPress={() => {
            handleSetShowAddTipModal(true);
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 20,
              alignItems: 'center',
            }}>
            <View
              style={{
                marginLeft: -20,
                marginRight: -10,
              }}>
              <CashMultiple width={60} height={20} fill={Colors.white} />
            </View>
            <Text style={{color: Colors.white, fontWeight: '600'}}>
              Add Tips
            </Text>
          </View>
        </Pressable>
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
      <ListItems
        itemArr={reservation.data}
        pressHandler={handleListItemPressed}
      />
      <View>
        <Text style={[styles.agendaSectionTitle, styles.informationItemTitle]}>
          Tip Information
        </Text>
      </View>
      <RenderTipInformationItems reservationData={reservation.data} />
      <ViewTipModal
        reservation={reservation}
        itemId={pressedItemId}
        showItemModal={showItemModal}
        handleShowItemModal={setShowItemModal}
      />
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
