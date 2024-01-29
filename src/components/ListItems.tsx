import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../global/Colors';

export default function ListItems({itemArr}: any): React.JSX.Element {
  return itemArr.map((item: any) => (
    <View key={item.id}>
      <View
        style={{
          borderColor: Colors.lighterGrey,
          borderWidth: 1,
          borderRadius: 20,
          marginVertical: 10,
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Text>Job: Server</Text>
          <Text>Section: 1</Text>
        </View>
        <View
          style={{
            borderBottomColor: Colors.lighterGrey,
            borderBottomWidth: 1,
            marginLeft: 5,
            marginRight: 5,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            paddingTop: 10,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>total tips</Text>
            <Text>$15</Text>
          </View>
          <View>
            <Text style={styles.tipSummaryDivider}>|</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>total hours</Text>
            <Text>8</Text>
          </View>
          <View>
            <Text style={styles.tipSummaryDivider}>|</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>per hour</Text>
            <Text>$4.29</Text>
          </View>
        </View>
      </View>
    </View>
  ));
}

const styles = StyleSheet.create({
  tipSummaryDivider: {color: Colors.lighterGrey},
});
