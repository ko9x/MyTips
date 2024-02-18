# Remember

- We need to run `patch package` if we edit something in the node_modules and we want the changes to persist

# What to do next

- UPDATE THE DATABASE!
- Optimize our what to do next flow

# Database TODO

- Create an updated database with all the new database info in the readme file
  - We made a note in myNotes about it. It's in the react native section

# TipProvider TODO

- Update getAllData function to include all the new colums added to the database
- Create the rest of the functions needed to supply the data we need
- Clean up unused functions

# HomeScreen TODO

- Main
  - Update the ListItems and DayItem components to work with the new database columns
  - If the calendar is open grab all the data for the selected month and display it in the MultiItemBar above the month header
    - Figure out the amount of money made per hour function in the TipProvider for the MultiItemBars
  - Display tip data if selected day has tips in the database
  - If there are no tips for the selected day, Add an image of a pile of money or something and an "Add Tips" button
  - The "Add Tips" button will open a modal
- Modal
  - Create the modal
  - Add a Tips Section with the following inputs
    - cash amount
    - credit amount
    - tip in
    - tip out
    - total sales
  - Add Details Section with the following inputs
    - Job title
      - Search the database for existing jobs and display a list. Also have an option to enter a new job title
    - Hours
    - Minutes
    - Hourly rate
      - If the user has already selected a job, check the database to see if all the entries with that job title have the same hourly rate. If so, enter that into the hourly rate field but still allow the user to change it if they want to.
        - If 2 rates exist for the same job show the more common one, if more than 2 exist, don't auto fill the rate field
    - Note (text area type field)
- Main Styling
  - When the calendar is opened or closed I would like the MultiItemBar to have an animation like the calendar does
  - Add some icons to the DayItem component to give it a litle more character
  - See if we can add some shadow to the white `selectedDay` icon
- Modal Styling
  - Make sure the modal looks good with and without the optional inputs (tip in, tip out, total sales, and hourly rate)

# StatsScreen TODO

- Look into packages to display our data in some cool looking graphs

# ExportScreen TODO

- Look into packages that will allow us to export our database in an excel or csv file.

# SettingsScreen TODO

- Reminder
  - This will be a modal that allows the user to select which days they would like to be reminded and a time
    - Hopefully this isn't too difficult to implement
- Sliders to activiate/deactivate the following options
  - Cash & Credit
  - Hourly Wages
  - Tip In
  - Tip Out
  - Total Sales

# What to do later

- Get the android emulator working
- use MultiItemBar component in the DayItem component
- Add a fade transition which you switch tabs
- Don't allow user to go into landscape view
- Check if the user settings for large text breaks the styling (we disabled large text in NoteWorthy for this reason)
- Make a custom icon to replace the marked day dot

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
