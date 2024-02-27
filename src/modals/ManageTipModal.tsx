import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import {Formik, FormikProps, FormikValues} from 'formik';
import ModalHeader from './ModalHeader';
import Colors from '../global/Colors';
import TipItemInput from '../components/TipItemInput';
import {toDollars, toHoursAndMinutes} from '../helpers/helpers';
import {ResDataObj} from '../global/Interfaces';
import {useKeyboard} from '@react-native-community/hooks';

export default function ManageTipModal({
  reservation,
  itemId,
  showManageTipModal,
  closeManageTipModal,
}: any) {
  const [resDataObj, setResDataObj] = useState<ResDataObj | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const keyBoard = useKeyboard();
  const formRef = useRef<FormikProps<FormikValues>>(null);

  function handleFormikSubmit() {
    console.log(formRef?.current?.values);
  }

  // If modal is being used for editing an existing tip we find the correct tip object within the reservation array
  if (itemId && resDataObj === null) {
    reservation.data.forEach((obj: ResDataObj) => {
      if (obj.id === itemId) {
        setResDataObj(obj);
        setIsEdit(true);
      }
    });
  }

  // Different padding is needed for ios android for when the keyboard is open and when it is closed
  function determineKBOpenPadding() {
    if (Platform.OS === 'ios') {
      if (keyBoard.keyboardShown) {
        return {paddingBottom: keyBoard.keyboardHeight + 60};
      } else {
        return {paddingBottom: 40};
      }
    }
    if (Platform.OS === 'android') {
      if (keyBoard.keyboardShown) {
        return {paddingBottom: 80};
      } else {
        return {paddingBottom: 40};
      }
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showManageTipModal}
      onRequestClose={() => {
        closeManageTipModal();
      }}>
      <View style={styles.centeredView}>
        <View
          style={
            keyBoard.keyboardShown && Platform.OS === 'android'
              ? styles.modalViewOpen
              : styles.modalView
          }>
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
                credit: isEdit ? toDollars(resDataObj!.credit).slice(1) : '',
                hourly_rate: isEdit
                  ? toDollars(resDataObj!.hourly_rate).slice(1)
                  : '',
                job: isEdit ? resDataObj!.job : '',
                hours: isEdit ? toHoursAndMinutes(resDataObj!.time).hours : '',
                minutes: isEdit
                  ? toHoursAndMinutes(resDataObj!.time).minutes
                  : '',
                tip_in: isEdit ? toDollars(resDataObj!.tip_in).slice(1) : '',
                tip_out: isEdit ? toDollars(resDataObj!.tip_out).slice(1) : '',
                total_sales: isEdit ? resDataObj!.total_sales : '',
                section: isEdit ? resDataObj!.section : '',
                note: isEdit ? resDataObj!.note : '',
              }}
              innerRef={formRef}
              onSubmit={values => console.log(values)}>
              {({handleChange, handleBlur, handleSubmit, values}) => (
                <ScrollView>
                  <View style={determineKBOpenPadding()}>
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
                      textColor={Colors.dark}
                      keyboardType={'numeric'}
                      money
                    />
                    <TipItemInput
                      handleChange={handleChange('credit')}
                      handleBlur={handleBlur('credit')}
                      value={values.credit}
                      inputTitle={'Credit'}
                      placeholder={'Enter amount'}
                      iconName={'credit-card'}
                      textColor={Colors.dark}
                      keyboardType={'numeric'}
                      money
                    />
                    <TipItemInput
                      handleChange={handleChange('tip_in')}
                      handleBlur={handleBlur('tip_in')}
                      value={values.tip_in}
                      inputTitle={'Tip In'}
                      placeholder={'Enter amount'}
                      iconName={'cash-plus'}
                      textColor={Colors.dark}
                      keyboardType={'numeric'}
                      money
                    />
                    <TipItemInput
                      handleChange={handleChange('tip_out')}
                      handleBlur={handleBlur('tip_out')}
                      value={values.tip_out}
                      inputTitle={'Tip Out'}
                      placeholder={'Enter amount'}
                      iconName={'cash-minus'}
                      textColor={Colors.danger}
                      keyboardType={'numeric'}
                      money
                    />
                    <TipItemInput
                      handleChange={handleChange('total_sales')}
                      handleBlur={handleBlur('total_sales')}
                      value={values.total_sales}
                      inputTitle={'Total Sales'}
                      placeholder={'Enter amount'}
                      iconName={'cash-register'}
                      textColor={Colors.dark}
                      keyboardType={'numeric'}
                      money
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
                      textColor={Colors.dark}
                      keyboardType={'default'}
                    />
                    <TipItemInput
                      handleChange={handleChange('hours')}
                      handleBlur={handleBlur('hours')}
                      value={values.hours}
                      inputTitle={'Hours'}
                      placeholder={'Enter hours'}
                      iconName={'clock-outline'}
                      textColor={Colors.dark}
                      keyboardType={'numeric'}
                    />
                    <TipItemInput
                      handleChange={handleChange('minutes')}
                      handleBlur={handleBlur('minutes')}
                      value={values.minutes}
                      inputTitle={'Minutes'}
                      placeholder={'Enter minutes'}
                      iconName={'clock-outline'}
                      textColor={Colors.dark}
                      keyboardType={'numeric'}
                    />
                    <TipItemInput
                      handleChange={handleChange('hourly_rate')}
                      handleBlur={handleBlur('hourly_rate')}
                      value={values.hourly_rate}
                      inputTitle={'Hourly Rate'}
                      placeholder={'Enter hourly rate'}
                      iconName={'cash-clock'}
                      textColor={Colors.dark}
                      keyboardType={'numeric'}
                      money
                    />
                    <TipItemInput
                      handleChange={handleChange('section')}
                      handleBlur={handleBlur('section')}
                      value={values.section}
                      inputTitle={'Section'}
                      placeholder={'Enter section (optional)'}
                      iconName={'cash-sync'}
                      textColor={Colors.dark}
                      keyboardType={'default'}
                    />
                    <TipItemInput
                      handleChange={handleChange('note')}
                      handleBlur={handleBlur('note')}
                      value={values.note}
                      inputTitle={'Note'}
                      placeholder={'Enter a note (optional)'}
                      iconName={'book-outline'}
                      textColor={Colors.dark}
                      keyboardType={'default'}
                      multiline
                    />
                  </View>
                </ScrollView>
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
  modalViewOpen: {
    backgroundColor: Colors.primary,
    width: '100%',
    height: '100%',
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
