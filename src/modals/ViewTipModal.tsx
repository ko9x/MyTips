import React, {useState} from 'react';
import {View, Text, Pressable, Modal, StyleSheet} from 'react-native';
import Moment from 'moment';
import Colors from '../global/Colors';
import ModalHeader from './ModalHeader';
import RenderJobInformationItems from '../components/RenderJobInformationItems';
import RenderTipInformationItems from '../components/RenderTipInformationItems';
import ManageTipModal from './ManageTipModal';

export default function ViewTipModal({
  reservation,
  itemId,
  showViewTipModal,
  closeViewTipModal,
}: any) {
  const [showManageTipModal, setShowManageTipModal] = useState(false);
  function closeManageTipModal() {
    setShowManageTipModal(false);
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showViewTipModal}
      onRequestClose={() => {
        closeViewTipModal();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ModalHeader
            leftButtonText={'Back'}
            titleText={Moment(reservation.day).format('MMMM Do, YYYY')}
            rightButtonText={'Edit'}
            leftButtonFunction={closeViewTipModal}
            rightButtonFunction={() => setShowManageTipModal(true)}
          />
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
      <ManageTipModal
        showManageTipModal={showManageTipModal}
        closeManageTipModal={closeManageTipModal}
        itemId={itemId}
        reservation={reservation}
        date={reservation.day}
      />
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
  agendaSectionTitle: {fontSize: 16, fontWeight: '600'},
  informationItemTitle: {paddingTop: 5},
});
