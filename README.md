[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)
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

### How To Add A New User: 
  - Open your Browser and visit ```http://localhost:<port>/api-docs``` and choose try on api/user/register by editing the default values given.
  - You will see a JSON reponse with token and message on successful registration
  - You can also use Postman and do a POST request on ```http://localhost:<port>/api/ user/register``` and post json data in the format 
  {
    'firstname':"value",
    'lastname':"value",
    'email':"value",
    'password':"value"
 }
 