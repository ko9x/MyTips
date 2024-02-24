import React from 'react';
import {
  View,
  TextInput,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  Button,
} from 'react-native';
import {Formik} from 'formik';
import ModalHeader from './ModalHeader';
import Colors from '../global/Colors';
import Cash from '../assets/SVG/cash.svg';
import {iconSmall} from '../global/Variables';
import TipItemInput from '../components/TipItemInput';

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
            <Formik
              initialValues={{email: ''}}
              onSubmit={values => console.log(values)}>
              {({handleChange, handleBlur, handleSubmit, values}) => (
                <View>
                  <View style={{paddingLeft: 10, paddingTop: 20}}>
                    <Text
                      style={[
                        styles.agendaSectionTitle,
                        styles.informationItemTitle,
                      ]}>
                      Tip Information
                    </Text>
                  </View>
                  <TipItemInput
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    values={values}
                    inputTitle={'Cash'}
                    iconColor={Colors.dark}
                    textColor={Colors.dark}
                    iconName={'cash'}
                  />
                  <Button onPress={() => handleSubmit} title="Submit" />
                </View>
              )}
            </Formik>
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
  },
  modalView: {
    backgroundColor: Colors.primary,
    width: '100%',
    height: '90%',
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
