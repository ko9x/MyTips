# Remember

- We need to run `patch package` if we edit something in the node_modules and we want the changes to persist

# What to do next

- Add total money made per hour to renderTipInformationItems
- Cleanup RenderJobInformationItems
- Rename RenderInformationItems to RenderTipInformationItems
- Use the itemId to only show the data from the ListItem that was clicked in the RenderInfoItems components
- Keep working on the modals
- Doublecheck that all the math is being done correctly and displaying correctly
- Optimize our what to do next flow

# Database TODO

# TipProvider TODO

- Create the rest of the functions needed to supply the data we need

# HomeScreen TODO
- General
  - The useEffect is mad because the getTipData function is not in the dependancy array
    - Fixing this will require useCallback which I don't think I have ever been able to get working
      - Maybve there is another way to fix the error. I just don't like having a red tab

- Main
  - Clicking on a ListItem should launch a modal that shows the informationItems for just that one ListItem
    - This will just render the information items like we do at the bottom of the DayItem
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
  - Add a $ icon instead of the dot. Use the multidot option to show days with larger tips
  - Have a subtitle under the date in the DayItem that says the tip size
  - When the calendar is opens and closes I would like the MultiItemBar to have an animation like the calendar does
  - Add some icons to the DayItem component to give it a litle more character
  - See if we can add some shadow to the white `selectedDay` icon
  - Try downloading the cash-clock SVG from material design icons and implement it that way
    - Maybe we should do that will all the icons
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
