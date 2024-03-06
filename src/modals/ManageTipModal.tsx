import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import {Formik, FormikProps, FormikValues} from 'formik';
import ModalHeader from './ModalHeader';
import Colors from '../global/Colors';
import TipItemInput from '../components/TipItemInput';
import {toDollars, toHoursAndMinutes} from '../helpers/helpers';
import {ResDataObj} from '../global/Interfaces';
import {useKeyboard} from '@react-native-community/hooks';
import {connectToDatabase, addTip, editTip} from '../providers/TipProvider';
import {TipDataObj} from '../global/Interfaces';

function compareResObjects(
  resObjArr: Array<any>,
  resObj: any,
  itemId: number,
  func: Function,
) {
  resObjArr?.forEach((obj: any) => {
    if (obj && obj.id === itemId) {
      let objA = JSON.stringify(obj);
      let objB = JSON.stringify(resObj);
      if (objA !== objB) {
        func(obj);
      }
    }
  });
}

export default function ManageTipModal({
  reservation,
  itemId,
  date,
  showManageTipModal,
  closeManageTipModal,
  setUserSaved,
  handleUpdatedDataObj,
}: any) {
  const [resDataObj, setResDataObj] = useState<ResDataObj | null>(null);
  const [reservationProp, setReservationProp] = useState<any>();
  const [isEdit, setIsEdit] = useState(false);
  const keyBoard = useKeyboard();
  const formRef = useRef<FormikProps<FormikValues>>(null);

  useEffect(() => {
    setReservationProp(reservation);
  }, [reservation]);

  // If modal is being used for editing an existing tip we find the correct tip object within the reservation array
  if (itemId && resDataObj === null) {
    reservationProp?.data.forEach((obj: ResDataObj) => {
      if (obj.id === itemId) {
        setResDataObj(obj);
        setIsEdit(true);
      }
    });
  }

  if (itemId && resDataObj) {
    compareResObjects(reservation?.data, resDataObj, itemId, setResDataObj);
  }

  function toCentNumber(strVal: string) {
    let tempVal = '';
    if (strVal.charAt(0) === '$') {
      tempVal = strVal.slice(1);
    }
    if (strVal.charAt(0) !== '$') {
      tempVal = strVal;
    }
    let numVal = Number(tempVal);
    return Math.round((Math.abs(numVal) / 100) * 10000);
  }

  function toMinuteNumber(hours: string, minutes: string) {
    let hourNum = Number(hours);
    let minNum = Number(minutes);

    return hourNum * 60 + minNum;
  }

  function validateMoneyValues(dataObj: any) {
    const moneyArr = [
      'cash',
      'credit',
      'tip_in',
      'tip_out',
      'total_sales',
      'hourly_rate',
    ];
    let boolVal = true;
    moneyArr.forEach(prop => {
      if (dataObj[prop].length && dataObj[prop] !== '$') {
        if (prop && dataObj[prop].search(/^\$?\d+(,\d{3})*(\.\d*)?$/) >= 0) {
        } else {
          boolVal = false;
        }
      } else {
      }
    });
    return boolVal;
  }

  async function handleFormikSubmit() {
    if (!validateMoneyValues(formRef.current?.values)) {
      Alert.alert('Invalid entry', 'Please enter a monetary value', [
        {
          text: 'Okay',
          onPress: () => {},
        },
      ]);
      return;
    }
    const tipDataObj: TipDataObj = {
      date: date,
      job: formRef?.current?.values?.job,
      time: toMinuteNumber(
        formRef?.current?.values?.hours,
        formRef?.current?.values?.minutes,
      ),
      cash: toCentNumber(formRef?.current?.values?.cash),
      credit: toCentNumber(formRef?.current?.values?.credit),
      tip_in: toCentNumber(formRef?.current?.values?.tip_in),
      tip_out: toCentNumber(formRef?.current?.values?.tip_out),
      total_sales: toCentNumber(formRef?.current?.values?.total_sales),
      hourly_rate: toCentNumber(formRef?.current?.values?.hourly_rate),
      note: formRef?.current?.values?.note,
      section: formRef?.current?.values?.section,
    };

    const db = await connectToDatabase();

    if (isEdit) {
      let updatedDataObj = await editTip(db, tipDataObj, itemId);
      handleUpdatedDataObj(updatedDataObj);
    }
    if (!isEdit) {
      await addTip(db, tipDataObj);
      setUserSaved(true);
    }
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
            titleText={isEdit ? 'Edit Tip' : 'Add Tip'}
            rightButtonText={isEdit ? 'Update' : 'Save'}
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
                total_sales: isEdit
                  ? toDollars(resDataObj!.total_sales).slice(1)
                  : '',
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
                      iconName={'map-marker'}
                      textColor={Colors.dark}
                      keyboardType={'default'}
                    />
                    <TipItemInput
                      handleChange={handleChange('note')}
                      handleBlur={handleBlur('note')}
                      value={values.note}
                      inputTitle={'Note'}
                      placeholder={'Enter a note (optional)'}
                      iconName={'note'}
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
    overflow: 'hidden',
  },
  agendaSectionTitle: {fontSize: 16, fontWeight: '600'},
  informationItemTitle: {paddingTop: 5},
});
