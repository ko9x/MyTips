# What to do next
- Export
  - Change name on the page from Export to Database
  - Test on physical devices
  - Weird bug on ios where the replace option doesn't work more than once.
    - If I refresh the app after each step the replace option seems to work correctly.
      - I think we are gettin a stale reference because the useEffect is only running once. 
        - We need to use finder to grab the db file and look at it in DB Browser to see what is going on
          - We have to refresh when using iOS but we don't have to when using android
            - Which is weird because the are both getting their path during the useEffect
  - When canceling out of exporting the database it shows success toast on ios (can cancel on android)

- Stats
  - Find a library that can turn our data into graphs and other displays to vizualize the data
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

# General TODO
- Fix the alert font color on Android. It is hard to read
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

# Database TODO

# TipProvider TODO

- Create the rest of the functions needed to supply the data we need

# HomeScreen TODO
- General
  
- Main
  - Find a better position for the "Today" button
    - It is currently commented out
- Tip Modal
  - Add a Tips Section with the following inputs
    - cash amount
      - ensure at least one of cash or credit has an amount entered
    - credit amount
      - ensure at least one of cash or credit has an amount entered
    - tip in
      - optional
    - tip out
      - optional
    - total sales
      - optional
  - Add Job Section with the following inputs
    - Job title
      - Job must have a value entered
      - Search the database for existing jobs and display a list. Also have an option to enter a new job title
    - Hours
      - Make sure at least one of hours and minutes has a value entered
      - Only allow whole numbers
    - Minutes
    - Make sure at least one of hours and minutes has a value entered
      - Only allow whole numbers
    - Hourly rate
      - optional
        - If a value is entered it must follow a pattern of either a whole number or a number with one decimal point
          - Android gives the user a keyboard that includes a coma, a dash and a space key
            - We need to make sure a user can't send a value with one of those characters to the database
      - If the user has already selected a job, check the database to see if all the entries with that job title have the   same hourly rate. If so, enter that into the hourly rate field but still allow the user to change it if they want to.
        - If 2 rates exist for the same job show the more common one, if more than 2 exist, don't auto fill the rate field
    - Note (text area type field)
      - optional
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
  - Also want to be able to import the data

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
  - Section

# What to do later

- Add a fade transition which you switch tabs
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
