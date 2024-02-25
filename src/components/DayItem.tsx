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
import {iconSmall} from '../global/Variables';
import ViewTipModal from '../modals/ViewTipModal';
import ManageTipModal from '../modals/ManageTipModal';
import MultiItemBar from './MultiItemBar';

export default function DayItem({reservation}: any): React.JSX.Element {
  const totalTime = combineTime(reservation.data);
  const [showViewTipModal, setShowViewTipModal] = useState(false);
  const [showManageTipModal, setShowManageTipModal] = useState(false);
  const [pressedItemId, setPressedItemId] = useState(null);
  function handleListItemPressed(itemId: any) {
    setPressedItemId(itemId);
    setShowViewTipModal(true);
  }
  function closeViewTipModal() {
    setShowViewTipModal(false);
  }
  function closeManageTipModal() {
    setShowManageTipModal(false);
  }
  return (
    <View style={styles.agendaItemContainer}>
      <MultiItemBar
        props={{
          first: toDollars(combineDayMoney(reservation.data)),
          second: {
            hours: toHoursAndMinutes(totalTime).hours,
            minutes: toHoursAndMinutes(totalTime).minutes,
          },
          third: toPerHour(totalTime, combineDayMoney(reservation.data)),
        }}
      />
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
            setShowManageTipModal(true);
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
              <CashMultiple
                width={iconSmall.width}
                height={iconSmall.height}
                fill={Colors.white}
              />
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
        showViewTipModal={showViewTipModal}
        closeViewTipModal={closeViewTipModal}
      />
      <ManageTipModal
        showManageTipModal={showManageTipModal}
        closeManageTipModal={closeManageTipModal}
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
  tipSummaryDivider: {color: Colors.lighterGrey},
  informationItemTitle: {paddingTop: 5},
});
