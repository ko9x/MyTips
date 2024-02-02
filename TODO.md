# Remember

- We need to run `patch package` if we edit something in the node_modules and we want the changes to persist

# What to do next
- Come up with a game plan to optimize our what to do next flow
- Create some dummy data we can use to create the UI/UX
- Make sure the database object we create can be parsed to poplate our fields correctly
- Make sure our data capture fields populate the database correctly
- Get the android emulator working
  - use MultiItemBar component in the DayItem component
- Setup interface to collect and store user data
- Figure out how to display the stored data from the user
  - Decide how we want that data to be displayed in each screen
- Finish adding the todo list for each screen
- Add a fade transition between tabs
- Don't allow user to go into landscape view
- Check how app looks and runs on android
- Check if the user settings for large text breaks the styling (we disabled large text in NoteWorthy for this reason)

# HomeScreen TODO

- Main
  - Add an image of a pile of money or something
  - Add a button to open the "Add Tips" modal
- Modal
  - Add a field to enter the amount
    - cash amount
    - credit amount
  - Add a description field
  - Add a note field
  - Add a tip in field
  - Add a tip out field
  - Hourly rate field

# StatsScreen TODO

# ExportScreen TODO

# SettingsScreen TODO

- Reminder
  - Lets you set an alarm to remind you to enter tips

# Styling

- See if we can add some shadow to the white `selectedDay` icon

# Bugs

# Done

- Add a calendar
  - Added react-native-calendars
- Break out some of the stuff in HomeScreen it is getting way too long
- Research what type of database to use and how to get it setup to collect user data
  - Do we want a local storage database? Is that possible for what we want to be able to do?
    - Yes. Research SQLite for React Native, here is a link https://blog.logrocket.com/using-sqlite-with-react-native/
      - This link is also bookmarked in the react native folder
  - Do we want to just make a database using Laravel and Docker like we have in the past?
