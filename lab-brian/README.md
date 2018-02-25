##Configuration
*README.md
*.gitignore
*.eslintrc
*.eslintignore
*package.json
*a lint script has been configured for running eslint
*a test script has been configured for running jest
*a start script has been configured for running the server
*lib/ - contains helper modules
*parse-json.js
*parse-url.js
*router.js
*storage.js
*model - contains resource model
*test - contains route tests
*server.js - runs the application


##About
This application is a refactored vanilla Javascript server with minimal dependencies and an execise in modularity and promises.

##Installation && Commands
To install this application, fork or clone this repo and cd into the lab-brian folder and run npm i to install the dependencies. Please install httpie and jest globally as well. Then Run node server.js in one terminal window to start the server. In another terminal window (still inside the lab-brian folder) run the following commands:
  to post a new file:
    http POST :3000/api/job title=assistant salary=40,000 
  to read a file:
    http :3000/api/job id==[the id from the file you just posted]
  to update a file:
    http PUT :3000/api/job [the id from the file you just posted] title=developer salary=100,000
  to delete a file:
    http DELETE :3000/api/job id==[the id from the file you just posted]

to run app and run jest from terminal to run tests