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
