# What to do next

- Create an app icon
- Get the app on Stephanie's iPhone
  - Have her test it and tell me what she likes and doesn't like
    - Is it annoying not having the filters to remove stuff like tip-in and total-sales?
  - Have her enter the same data into her other app and see if anything doesn't match up math wise
- Once we are happy with the functionality of the HomeScreen 
  - Decide which screen to work on next
    - Export
      - Find a library that lets me turn an SQLite database into an excel sheet and import/export them
    - Stats
      - Find a library that can turn our data into graphs and other displays to vizualize the data
    - Settings
      - This will pretty much just be the filters 

# General TODO
- See what styling needs to be fixed when viewing on a physical device
- Doublecheck that all the maths is being done correctly and displaying correctly!
  - Stephanie is going to help with this
- We should decide if we want everything capitalized or not. Right now it is a mixture of both
  - Transform any words the user enters to be capitalized also if we decide to capitalize?
    - I want to make sure when we do database queries for job title we don't get two different results for the same word
      - But maybe there is a better way to address that issue like text transform when grabbing the data

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
