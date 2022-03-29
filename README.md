[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)
![example workflow](https://github.com/atlp-rwanda/cod-be/actions/workflows/node.js.yml/badge.svg)
![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/sergenm/fc852272be18bb21d4a7418ab58e2edc/raw/cod-be__pull_30.json)

# cod-be
# COD Barefoot Nomad Backend Development Server And DataBase Setup

### COD Barefoot Nomad Server App 
- Express Server Setup & Connection ```./src/app.js```
### COD Barefoot Nomad DataBase Connection
- PostgreSQL Server Setup & Connection ```./src/index.js```

## Usage
## (For development):

### Environment variables
- Create a .env file and insert referring values as shown in .env.example
- You can define many variables in .env as you wish but remember to include them in   config/envConfig file to be validated on the start of application
-New environment variables should also be stated in .env.example
- In Your .env file ```NODE_ENV``` Variable should be equal to ```development```
- Add A Sample In .env.example For Any New Environment Variable Created

### How To Initialize The App

- Open Your Terminal & Run The Following Commands:
- ```npm i```
- ```npm run dev```
- ```npm run dbMigrate```
### How To Add A New User: 
  - Open your Browser and visit ```http://localhost:<port>/api-docs``` and try to register a new user on `api/user/register` by editing the default values given.
  - You will see a JSON reponse with `emailToken` and `message` on successful registration
  - You can also use Postman and do a POST request on ```http://localhost:<port>/api/ user/register``` and post json data in the format 
  ```
  {
    'firstname':"value",
    'lastname':"value",
    'email':"value",
    'password':"value"
 }
 ### How To Add Assign a role to a user 
 -Login to your account with your email and password (Super Administrator) to a valid token for authentication 
 -Using Postman  add ```http://localhost:<port>/api/v1/users/assignRole ``` in the url 
 - Pass the token in the authorization header as Bearer token  
 - Do a post request with the data in the following format 
  {
    "rolename":"value",
    "user":""
  }
  - rolename: The rolename as registered, check in migration file for role
  - user: The user id of super Administrator(received in the response when login);
### Error handling in the application
- Inside src/utils/errors has possible applications errors' handlers, you are free to
use them and add your own whenever needed.
### How to work with login
in the browser ```http://localhost:/api-docs`/api/user/login`` and put in the input box the appropriate credentials which are email and password and execute, if the account the credentials are right and the account is verified you will get both the access token and refresh token and also the status(200) and the message saying "User logged in successfully". if the email is not right you get error with message "This email does not exist" with status 400. if the password is not correct you get error message "Invalid Password" with status 400 if you miss any credentials you get erro message "Invalid input" with status 400.
### How refresh token work
Because access token has to expire in short time the refresh token which have longer life span will be used as token dedicated to only recreate new access token when the current one is expired.

to get the new access token you go in your browser and go to ```http://localhost:/api-docs`/api/user/refresh`` and put in the input body the refreshTokenKey and you get the new access token and refresh token and the old one is expired and you get message sayin that "Access token created successfully" with status code of 200. If you use the expired refresh token or invalid token you get message "Invalid refresh token"with status code 400

### LOGOUT FUNCTIONALITY
To logout you have to be logged in and have access token in the authorization Headers. the logout function is used to delete the user from the loggedinuser database. when you provide wrong or expired access token you get error with message "Please log in" and error status code of 401. when you provide valid access token you get 204 status code. and you are now successfully logged out of session.
