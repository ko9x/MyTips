import React from 'react';
import {View, Text, Pressable, Modal, StyleSheet} from 'react-native';
import ModalHeader from './ModalHeader';
import Colors from '../global/Colors';

export default function ViewTipModal({
  reservation,
  itemId,
  showManageTipModal,
  closeManageTipModal,
}: any) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showManageTipModal}
      onRequestClose={() => {
        closeManageTipModal();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ModalHeader
            leftButtonText={'Back'}
            titleText={'Add Tips'}
            rightButtonText={'Save'}
            leftButtonFunction={closeManageTipModal}
            rightButtonFunction={() => {}}
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
            <View style={{paddingLeft: 10, paddingTop: 20}}>
              <Text
                style={[
                  styles.agendaSectionTitle,
                  styles.informationItemTitle,
                ]}>
                Job Information
              </Text>
            </View>
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
  agendaSectionTitle: {fontSize: 16, fontWeight: '600'},
  informationItemTitle: {paddingTop: 5},
});
