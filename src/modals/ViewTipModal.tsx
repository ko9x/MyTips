import React from 'react';
import {View, Text, Pressable, Modal, StyleSheet} from 'react-native';
import Moment from 'moment';
import Colors from '../global/Colors';
import RenderJobInformationItems from '../components/RenderJobInformationItems';
import RenderTipInformationItems from '../components/RenderTipInformationItems';

export default function ViewTipModal({
  reservation,
  itemId,
  showItemModal,
  handleShowItemModal,
}: any) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showItemModal}
      onRequestClose={() => {
        handleShowItemModal(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeaderContainer}>
            <Pressable onPress={() => handleShowItemModal(false)}>
              <View style={styles.backButtonContainer}>
                <Text
                  style={[styles.modalHeaderButton, styles.textShadowStyle]}>
                  Back
                </Text>
              </View>
            </Pressable>
            <View>
              <Text style={[styles.modalDate, styles.textShadowStyle]}>
                {Moment(reservation.day).format('MMMM Do, YYYY')}
              </Text>
            </View>
            <View style={styles.editButtonContainer}>
              <Text style={[styles.modalHeaderButton, styles.textShadowStyle]}>
                Edit
              </Text>
            </View>
          </View>
          <View style={styles.innerModalView}>
            <View style={{paddingLeft: 10, paddingTop: 20}}>
              <Text
                style={[
                  styles.agendaSectionTitle,
                  styles.informationItemTitle,
                ]}>
                Tip Information
              </Text>
            </View>
            <RenderTipInformationItems
              reservationData={reservation.data}
              itemId={itemId}
              showTotalPerHr={true}
            />
            <View style={{paddingLeft: 10, paddingTop: 20}}>
              <Text
                style={[
                  styles.agendaSectionTitle,
                  styles.informationItemTitle,
                ]}>
                Job Information
              </Text>
            </View>
            <RenderJobInformationItems
              reservationData={reservation.data}
              itemId={itemId}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
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
  agendaSectionTitle: {fontSize: 16, fontWeight: '600'},
  informationItemTitle: {paddingTop: 5},
});
