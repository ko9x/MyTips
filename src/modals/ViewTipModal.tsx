import React, {useState, useEffect} from 'react';
import {View, Text, Modal, StyleSheet, Alert} from 'react-native';
import Moment from 'moment';
import Colors from '../global/Colors';
import ModalHeader from './ModalHeader';
import RenderJobInformationItems from '../components/RenderJobInformationItems';
import RenderTipInformationItems from '../components/RenderTipInformationItems';
import ManageTipModal from './ManageTipModal';
import {connectToDatabase, removeTip} from '../providers/TipProvider';

export default function ViewTipModal({
  reservation,
  itemId,
  showViewTipModal,
  closeViewTipModal,
  setUserSaved,
}: any) {
  const [reservationProp, setReservationProp] = useState(reservation);
  const [showManageTipModal, setShowManageTipModal] = useState(false);
  const [updatedDataObj, setUpdatedDataObj] = useState<any>();
  function closeManageTipModal() {
    setShowManageTipModal(false);
  }

  useEffect(() => {
    setReservationProp(reservation);
  }, [reservation]);

  useEffect(() => {
    if (updatedDataObj) {
      setReservationProp({data: [updatedDataObj], day: updatedDataObj.date});
      setShowManageTipModal(false);
      setUserSaved(true);
    }
  }, [updatedDataObj, setUserSaved]);

  async function deleteTip() {
    const db = await connectToDatabase();
    await removeTip(db, itemId);
    setUserSaved(true);
    closeViewTipModal();
  }

  async function handleRemoveTip() {
    Alert.alert('Delete tips?', 'This action cannot be undone', [
      {
        text: 'Delete',
        onPress: () => deleteTip(),
        style: 'destructive',
      },
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
    ]);
    const db = await connectToDatabase();
  }

  function handleEditButtonPress() {
    Alert.alert('Select an action', '', [
      {
        text: 'Update',
        onPress: () => setShowManageTipModal(true),
      },
      {
        text: 'Delete',
        onPress: () => handleRemoveTip(),
        style: 'destructive',
      },
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
    ]);
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
            titleText={Moment(reservationProp.day).format('MMMM Do, YYYY')}
            rightButtonText={'Edit'}
            leftButtonFunction={closeViewTipModal}
            rightButtonFunction={() => handleEditButtonPress()}
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
              reservationData={reservationProp.data}
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
              reservationData={reservationProp.data}
              itemId={itemId}
            />
          </View>
        </View>
      </View>
      <ManageTipModal
        showManageTipModal={showManageTipModal}
        closeManageTipModal={closeManageTipModal}
        itemId={itemId}
        reservation={reservationProp}
        date={reservationProp.day}
        handleUpdatedDataObj={setUpdatedDataObj}
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
