import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import Colors from '../global/Colors';

export default function StatsScreen(): React.JSX.Element {
  const screenWidth = Dimensions.get('window').width / 1.04;
  const bezierChartConfig = {
    backgroundColor: Colors.lightGrey,
    backgroundGradientFrom: Colors.dark,
    backgroundGradientTo: Colors.dark,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };
  const barChartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    // backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#FFFFFF',
    // backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(33, 153, 91, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    decimalPlaces: 0,
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  const bezierData = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        data: [
          3987.25, 1987.25, 2987.25, 2987.25, 987.25, 3987.25, 2987.25, 1987.25,
          4987.25, 987.25, 3987.25, 2987.25,
        ],
      },
    ],
  };
  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [340, 298, 287, 415, 388, 445, 401],
      },
    ],
  };
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 2.5,
        elevation: 3,
        marginHorizontal: 5,
      }}>
      <LineChart
        data={bezierData}
        width={screenWidth}
        height={220}
        yAxisLabel="$"
        chartConfig={bezierChartConfig}
        bezier
        style={styles.chartContainer}
      />
      <BarChart
        data={barData}
        width={screenWidth}
        height={250}
        yAxisLabel="$"
        yAxisSuffix=""
        chartConfig={barChartConfig}
        verticalLabelRotation={30}
        style={styles.chartContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    marginVertical: 8,
    borderRadius: 5,
  },
});
