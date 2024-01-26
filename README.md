### How to Run the App

# navigate to folder and run `npx react-native start` to start Metro

# open a new tab and run `npm run iPhone13` or `npm run 12mini` to run the simulator for the desired device

### Cocoapods and pod install

- When you install a package you generally need to run pod install afterward. To do so run `npx pod-install ios`
  - You don't have to cd into the ios folder to run this command

### Console log in Metro

- Run this command to see console logs in the Metro tab `npx react-native log-ios`
  - I am not sure if this is even required anymore. It may show logs there without running this command

### Where to find react-native-calendar theme styles

- `node_modules/react-native-calendar/src/style.js`

### Setting the color of the StatusBar

- `<Tab.Screen
      key={index}
      name={name}
      component={screen}
      options={{
        headerShadowVisible: false,
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#46c482',
        },
        tabBarIcon: ({focused, color}: any) =>
          renderTabIcon({icon, focused, color, title}),
      }}
    />`
- The important bit is headerStyle with the backgroundColor property set to the desired color.
- headerShadowVisible set to false gets rid of the line that is under the header
- headerTintColor is the color of the text inside the header

### todayButton.js location
- To modify the today button
`node_modules/react-native-calendar/src/expandableCalendar/Context/todayButton.js`

### theme.js location
`src/mocks/theme.js`

### When we are ready to finalize the item object structure we can modify the declared type for AgendaEntry located in:
`node_modules/react-native-calendar/src/types.d.ts`

### Fixed the opening and closing animation by modifying some function in:
`node_modules/react-native-calendar/src/expandableCalendar/index.js`
- The main changes were: 
  - commenting out the pan gesture functions
  - modifying the knob appearance 
  - fixing the bounceToPosition function 

### MySql database stuff
  - `https://github.com/OP-Engineering/op-sqlite`
  - `https://stackoverflow.com/questions/5967426/select-day-of-week-from-date`
  - `https://stackoverflow.com/questions/30215059/day-of-week-in-sql`
