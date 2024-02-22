import React, {useState} from 'react';
import {View, Text, StyleSheet, Modal, Pressable} from 'react-native';
import {Button} from 'react-native-paper';
import Colors from '../global/Colors';
import Moment from 'moment';
import ListItems from './ListItems';
import RenderInformationItems from './RenderInformationItems';
import {
  combineDayMoney,
  toDollars,
  combineTime,
  toHoursAndMinutes,
  toPerHour,
} from '../helpers/helpers';

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
        <Button
          buttonColor={Colors.primary}
          onPress={() => {
            handleSetShowAddTipModal(true);
          }}
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
      <ListItems
        itemArr={reservation.data}
        pressHandler={handleListItemPressed}
      />
      <View>
        <Text style={[styles.agendaSectionTitle, styles.informationItemTitle]}>
          Tip Information
        </Text>
      </View>
      <RenderInformationItems reservationData={reservation.data} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={showItemModal}
        onRequestClose={() => {
          setShowItemModal(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeaderContainer}>
              <View style={styles.backButtonContainer}>
                <Text
                  style={[styles.modalHeaderButton, styles.textShadowStyle]}>
                  Back
                </Text>
              </View>
              <View>
                <Text style={[styles.modalDate, styles.textShadowStyle]}>
                  {Moment(reservation.day).format('MMMM Do, YYYY')}
                </Text>
              </View>
              <View style={styles.editButtonContainer}>
                <Text
                  style={[styles.modalHeaderButton, styles.textShadowStyle]}>
                  Edit
                </Text>
              </View>
            </View>
            <View style={styles.innerModalView}>
              <Text style={styles.modalText}>Show Item Modal</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setShowItemModal(false)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
              <RenderInformationItems
                reservationData={reservation.data}
                reservationDay={reservation.day}
                itemId={pressedItemId}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: Colors.primary,
    width: '100%',
    height: '90%',
    alignItems: 'center',
  },
  innerModalView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalHeaderContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: '5%',
    paddingBottom: 20,
  },
  modalDate: {
    color: 'white',
    fontWeight: '800',
  },
  backButtonContainer: {
    paddingLeft: 20,
  },
  editButtonContainer: {
    paddingRight: 20,
  },
  modalHeaderButton: {
    color: 'white',
    fontWeight: '700',
  },
  textShadowStyle: {
    textShadowColor: Colors.textShadow,
    textShadowRadius: Colors.shadowRadius,
    textShadowOffset: Colors.shadowOffset,
  },
});
