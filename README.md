# How to Run the App

### navigate to folder and run `npm start` to start Metro

### open a new tab and run `npm run iPhone13` or `npm run 12mini` to run the simulator for the desired device

### Getting the app to install a production build on my iPhone
- After changing the scheme to produciton in Xcode I was getting this error at the end of the build: 
`Undefined symbol: _OBJC_CLASS_$_FlipperClient`
- I made some changes to the Podfile and ran some commands I found in this thread `https://github.com/facebook/react-native/issues/39378`
  - But what I think actually got it to work was adding `'react-native-flipper': {platforms: {ios: null}},` to the dependencies of react-native.config.js

### Cocoapods and pod install

- When you install a package you generally need to run pod install afterward. To do so run `npx pod-install ios`
  - You don't have to cd into the ios folder to run this command

### Console log in Metro

- Run this command to see console logs in the Metro tab `npx react-native log-ios`
  - I am not sure if this is even required anymore. It may show logs there without running this command

### Where to find react-native-calendar theme and other changes

- The theme file is located in the mocks director
- Check the react-native-calendar file in the patches directory to see what changes have been made to node_module packages
- We still use vector icons in node_modules/react-native-calendar/expandable-calendar/index.js

# Remember

- We need to run `patch package` if we edit something in the node_modules and we want the changes to persist

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

- Having enablePromise true in the TipProvider breaks the db variable in StatsScreen
  - Not really sure why
- `https://github.com/OP-Engineering/op-sqlite`
- `https://stackoverflow.com/questions/5967426/select-day-of-week-from-date`
- `https://stackoverflow.com/questions/30215059/day-of-week-in-sql`

### Installed patch-package

- `https://www.npmjs.com/package/patch-package`
- This allows us to make changes to the files in node modules and save those changes even if we need to npm install again
  - react-native-calendars is the package that prompted this as I made several changes to that package
- To run the patch use this command `npx patch-package package-name` substitute `package-name` with the name of you package as it appears in node_modules

### Vector Icons Stopped Working

- I think all we need to do if this happens again is double click the xcworkspace file and let xcode launch that simulator.
  - After that the icons started working again with the normal metro and npm run 12mini commands

# Database Info

- id
  - Integer, Not Null, AutoIncrement
  - Used to identify each database item
- date
  - Text, Not Null
  - Each item needs to have a date, the same date can be used on multiple items
- job
  - Text, Not Null
  - The user must set a job to help identify the type of tip, for example "server" or "bar tender"
    section
  - Text
  - The user can enter a section which can be used to figure out how much money is earned on average in that section
    - The user may want to be able to filter by name, section, day of the week, month, and year
- time
  - Integer, Not Null
  - The period of time it took to earn the tip
    - The amount of time will be stored in minutes and a method will be used to display the time in hours and minutes for the UI
- section
  - Text
    - The user has the option to enter a section name to help filter useful tip information
- cash
  - Integer
  - The amount of cash money earned
    - The amount of money will be stored in cents and a method will be used to display the amount in dollars and cents for the UI
- credit
  - Integer
  - The amount of credit card money earned
    - The amount of money will be stored in cents and a method will be used to display the amount in dollars and cents for the UI
- tip_in
  - Integer
  - The amount the user added to their tips (sometimes a bar tender will get a "tip in" from the server they made drinks for)
    - The amount of money will be stored in cents and a method will be used to display the amount in dollars and cents for the UI
- tip_out
  - Integer
  - The amount the user subtracted from their tips (sometimes a server will "tip out" to the bar for making drinks for them)
    - The amount of money will be stored in cents and a method will be used to display the amount in dollars and cents for the UI
- total_sales
  - Integer
  - The total amount of sales the user was responsible for (including drinks and food)
    - The amount of money will be stored in cents and a method will be used to display the amount in dollars and cents for the UI
- hourly_rate
  - Integer
  - The amount of money the user is payed per hour
    - The amount of money will be stored in cents and a method will be used to display the amount in dollars and cents for the UI
- note
  - Text
