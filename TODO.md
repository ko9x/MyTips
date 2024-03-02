# What to do next

- run patch package on react-native-calends once we are sure the calClosedTimer is working properly

- Keep working on the modals
  - Use formik to add inputs and data collection to the ManageTipModal
    - Make sure we can use this modal for adding AND editing tips
    - When we are collecting data the user will be entering amounts that we need to convert
      - Hours and minutes to just minutes
      - dollars and cents to just cents
- Make an icon component for note-text-outline
  - To use with the note property
- Make a component for map-marker
  - To use with the section property
- Doublecheck that all the maths is being done correctly and displaying correctly!
- We should probably go through and capitalize all the hard coded. Right now its a mix of lower and upper case
- Transform any words the user enters to be capitalized also?
  - I want to make sure when we do database queries for job title we don't get two different results for the same word
    - But maybe there is a better way to address that issue

# Database TODO
- Once we are certain of the database columns we need to import the database into Xcode again because right now only the iPhone 12mini has access to the database where we made the new table
- Edit an item or add a new item to test the total_sales informationItem
- Add an item that has null for the hourly_wage and make sure that doesn't break anything
  - I think it will result in an informationItem coming from the renderJobInformationItems with a black value
    - We can do the same thing we did in the renderTipInformationItems component if an amount is 0 we don't add it
      - Then we filter out undefined items later in the code

# TipProvider TODO

- Create the rest of the functions needed to supply the data we need

# HomeScreen TODO
- General
  
- Main
  - Find a better position for the "Today" button
    - It is currently commented out
- Tip Modal
  - Style the modal
  - Add a Tips Section with the following inputs
    - cash amount
    - credit amount
    - tip in
    - tip out
    - total sales
  - Add Job Section with the following inputs
    - Job title
      - Search the database for existing jobs and display a list. Also have an option to enter a new job title
    - Hours
    - Minutes
    - Hourly rate
      - If the user has already selected a job, check the database to see if all the entries with that job title have the same hourly rate. If so, enter that into the hourly rate field but still allow the user to change it if they want to.
        - If 2 rates exist for the same job show the more common one, if more than 2 exist, don't auto fill the rate field
    - Note (text area type field)
- Main Styling
  - Add a $ icon instead of the dot. Use the multidot option to show days with larger tips
  - Have a subtitle under the date in the DayItem that says the tip size
  - When the calendar is opens and closes I would like the MultiItemBar to have an animation like the calendar does
  - Add some icons to the DayItem component to give it a litle more character
  - See if we can add some shadow to the white `selectedDay` icon
- Modal Styling
  - Make sure the modal looks good with and without the optional inputs (tip in, tip out, total sales, and hourly rate)
- Modal Testing
  - Make sure the modal looks good on multiple different devices for android and ios
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
- Fix this error or at least figure out what it means and if it needs to be fixed
  - `VirtualizedList: You have a large list that is slow to update - make sure your renderItem function renders components that follow React performance best practices like PureComponent, shouldComponentUpdate, etc. {"contentLength": 4875, "dt": 105431, "prevDt": 108791}`

# Done

- Add a calendar
  - Added react-native-calendars
- Break out some of the stuff in HomeScreen it is getting way too long
- Research what type of database to use and how to get it setup to collect user data
  - Do we want a local storage database? Is that possible for what we want to be able to do?
    - Yes. Research SQLite for React Native, here is a link https://blog.logrocket.com/using-sqlite-with-react-native/
      - This link is also bookmarked in the react native folder
  - Do we want to just make a database using Laravel and Docker like we have in the past?
  - UPDATE THE DATABASE!
  - renderInformationItems modal needs better icons
  - Figure out how to download SVG files into the assets folder and use them instead of vector icons
    - There are too many vector icons that don't work and I don't know if the app needs to be online to use them
      - Having the SVGs local would solve both problems
- Fix the calendar bug
  - We added the calClosedTimer state and a useEffect to give the calendar time to update the week after cal is closed
    - While calClosedTimer is true a we render a blank View with a high zIndex which prevents the user from pressing any buttons
- The useEffect is mad because the getTipData function is not in the dependancy array
    - Fixing this will require adding some useCallbacks
- If there are no tips for the selected day, Add an image of a pile of money or something and an "Add Tips" button
  - The "Add Tips" button will open a modal
