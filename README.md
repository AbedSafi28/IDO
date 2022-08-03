# IDO
IDO is a web application created using Angular as Front-End framework and ASP.NET as Back-End.
This app allows the user to fill in his TODO list and store them locally using an SQL databse.

# Installation
1- Make sure you habe .Net installed on your machine
2- Make sure you have NodeJS installed on your machcine
3- SQL is required also in order for the app to save and fetch data
4- Clone the repo and initialize it in a folder
5- Go to client app folder and run the following command "npm install"

# Running the app
After following the installation steps mentioned above, go to the app root folder and type: dotnet run

This will initialize the app and local server.

In order to visit the app on your browser, go to the first localhosturl that appears after running dotnet run.
A command prompt will appear to redirect the url to our Angular server.
Browser will ask you to confirm if you want to visit this url, confirm and proceed.

# Future Work
This repo requires more enhancements in order to make it usable and ready to be published on the web.
Things that can be done to improve this app:
* Protect again SQL attacks by improving the logic and syntax when reading and writing from database
* Improve the design by enhancing the CSS code
* Add delete option to added items
* Refactor the code and make it more readable
* Adding logout button that appears when the mouse hovers the user profile icon
* Add reusable code blocks instead of the current implmentation where we can find redudant code blocks

The above points are the main things that can be done to improve the repo
