import React, {useRef, useState} from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';
import {Formik, FormikProps, FormikValues} from 'formik';
import ModalHeader from './ModalHeader';
import Colors from '../global/Colors';
import TipItemInput from '../components/TipItemInput';
import {toDollars} from '../helpers/helpers';
import {ResDataObj} from '../global/Interfaces';

export default function ManageTipModal({
  reservation,
  itemId,
  showManageTipModal,
  closeManageTipModal,
}: any) {
  const [resDataObj, setResDataObj] = useState<ResDataObj | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  function handleFormikSubmit() {
    console.log(formRef?.current?.values);
  }
  if (itemId && resDataObj === null) {
    reservation.data.forEach((obj: ResDataObj) => {
      if (obj.id === itemId) {
        setResDataObj(obj);
        setIsEdit(true);
      }
    });
  }

  const formRef = useRef<FormikProps<FormikValues>>(null);
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
            rightButtonFunction={() => handleFormikSubmit()}
          />
          <View style={styles.innerModalView}>
            <Formik
              initialValues={{
                cash: isEdit ? toDollars(resDataObj!.cash).slice(1) : '',
                job: isEdit ? resDataObj!.job : '',
              }}
              innerRef={formRef}
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
                    handleChange={handleChange('cash')}
                    handleBlur={handleBlur('cash')}
                    value={values.cash}
                    inputTitle={'Cash'}
                    placeholder={'Enter amount'}
                    iconName={'cash'}
                    iconColor={Colors.dark}
                    textColor={Colors.dark}
                    keyboardType={'numeric'}
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
                  <TipItemInput
                    handleChange={handleChange('job')}
                    handleBlur={handleBlur('job')}
                    value={values.job}
                    inputTitle={'Job Title'}
                    placeholder={'Enter job title'}
                    iconName={'book-outline'}
                    iconColor={Colors.dark}
                    textColor={Colors.dark}
                    keyboardType={'default'}
                  />
                </View>
              )}
            </Formik>
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
