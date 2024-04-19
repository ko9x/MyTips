# What to do next

- Figure out a way to create a database file with a ton of realistic data and import it 
- Get real data from the database to populate the charts

# Stats Screen
    - Data
      - Total income all time
        - Average for each year
        - Average for each month
          - So the user can see which month they make the most money
        - Average for each day of the week
          - So the user can see which day of the week they make the most money
        - Average for each section
          - Only show section data if the database has instances of it
      - Total income since the start of the year
        - Total for each month during the year
      - Total income for each month
        - Total for each day during that month
      - Total income for the last 365 days
        - Plot each month
      - Total income for the last 30 days
        - plot each day

    - Graphs
      - Total income
      - Let the use choose any metric like wages, tip-in tip-out and see a graph for it
      - If the user tracks sections have a graph with a different color line for each section
      - If the user has multiple jobs have a graph with a different color line for each job
      - Have a graph with a different color line for each day of the week
      
    - Info Boxes
      - Which Day of the week makes the most money
        - Show the days of the week graph when the user taps this info box
      - Which Month makes the most money
        - Show a graph with a different color line for each month when the user taps this box
      - Which section makes the most money (if the user has section data in the database)
        - Show the sections graph when the user taps this info box
          - If the user isn't tracking sections maybe have a note saying they should

    - Talk to Stephanie and see which stats she would like to see

    - Settings toggle for different charts?
      - This is more of a todo later

# Settings Screen
- Reminders
  - Add tip reminder
    - This will be a modal that allows the user to select which days they would like to be reminded and a time
  - Back up reminder
    - This will be a modal that pops up and allows the user to set an interval of time to be reminded to backup the database

  - We should be able to do some sort of lockscreen banner like bill tracker does
    - See what other tip apps do

# General TODO

- Get an Android device
- See what styling needs to be fixed when viewing on a physical device
- Doublecheck that all the maths is being done correctly and displaying correctly!
  - Stephanie is going to help with this
- We should decide if we want everything capitalized or not. Right now it is a mixture of both
  - Transform any words the user enters to be capitalized also if we decide to capitalize?
    - If we don't then the user could end up with duplicate job titles
      - But maybe we should leave it as is and see if people complain
- Get rid of react-native-share? The default Share from react-native seems to work just fine
  - We would need to delete the import from the package.json
    - Would we also need to remove it from the podlock file or would removing it from the package.json prevent it from getting added to the podlock file?


# What to do later

- Add a fade transition which you switch tabs
- Make a custom icon to replace the marked day dot
- Give the user the option to turn on or off different charts in the stats tab

# HomeScreen Later

- General
  - Find a better position for the "Today" button
    - It is currently commented out
      - Do users even want it?
- Styling
  - Add a $ icon instead of the dot. Use the multidot option to show days with larger tips
  - Have a subtitle under the date in the DayItem that says the tip size
  - When the calendar opens and closes I would like the MultiItemBar to have an animation like the calendar does
  - Add some icons to the DayItem component to give it a litle more character
  - See if we can add some shadow to the white `selectedDay` icon

# Bugs

- Fix this error or at least figure out what it means and if it needs to be fixed
  - `VirtualizedList: You have a large list that is slow to update - make sure your renderItem function renders components that follow React performance best practices like PureComponent, shouldComponentUpdate, etc. {"contentLength": 4875, "dt": 105431, "prevDt": 108791}`
- Weird bug on ios where the replace database file in the file system doesn't update unless the app reloads
  - Which doesn't make sense because we know the file is changing because we are getting data from the DB to load the information in the calendar
    - As a workaround I added an update database button that just reloads the app

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
- Continue validation for required inputs
  - At least one of cash or credit needs to have a valid dollar amount
  - At least one of hours or minutes needs to have a valid number amount
    - Add a regex that doesn't allow any on of the android buttons like . , - and space
- Create an app icon
- Finish adding the existing values functionality for job and hourly wage
  - Update the list if the user adds a new job or hourly rate
- Settings
  - This will pretty much just be the filters
    - Decide which filters should be created
      - Cash and Credit
        - On by default and turning off will just show a field that says money and we will store it under credit
      - Tip in
        - Off by default
      - Tip out
        - Off by default
      - Total Sales
        - Off by default
      - Section
        - Off by default
      - Hourly Rate
        - On by default and turning off will prevent the field from showing so we don't actually need to worry about turing off the default hourly rate functionality
      - Default Hourly Rate
        - On by default and turning off will clear local storage and no longer ask the user to set as default
      - Default job title
        - On by default and turning off will clear local storage and no longer ask the user to set as default
    - Use local storage to store what filters the user has turned on or off
      - We can just remove each specified TipItemInput with a ternary expression
- Get the app on Stephanie's iPhone
