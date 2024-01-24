import {Platform} from 'react-native';
import Colors from '../global/Colors';

export const themeColor = '#00AAAF';
export const lightThemeColor = '#f2f7f7';

export function getTheme() {
  return {
    // new stuff
    todayButtonTextColor: Colors.primary,
    calendarBackground: Colors.primary,
    expandableCalendarBackground: Colors.primary,
    calendarContainerBackground: Colors.primary,
    monthContainerBackground: Colors.light,
    // arrows
    arrowColor: Colors.white,
    arrowStyle: {padding: 0},
    // knob
    // expandableKnobColor: themeColor,
    // month
    monthTextColor: Colors.white,
    textMonthFontSize: 16,
    textMonthFontFamily: 'HelveticaNeue',
    textMonthFontWeight: 'bold' as const,
    // day names
    textSectionTitleColor: Colors.white,
    textDayHeaderFontSize: 14,
    textDayHeaderFontFamily: 'HelveticaNeue',
    textDayHeaderFontWeight: 'normal' as const,
    // dates
    dayTextColor: Colors.white,
    todayTextColor: Colors.dark,
    textDayFontSize: 18,
    textDayFontFamily: 'HelveticaNeue',
    textDayFontWeight: '500' as const,
    textDayStyle: {marginTop: Platform.OS === 'android' ? 2 : 4},
    // selected date
    selectedDayBackgroundColor: Colors.white,
    selectedDayTextColor: Colors.dark,
    // disabled date
    textDisabledColor: Colors.white,
    // dot (marked date)
    dotColor: themeColor,
    selectedDotColor: 'white',
    disabledDotColor: Colors.lighter,
    dotStyle: {marginTop: -2},
  };
}
