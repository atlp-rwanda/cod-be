[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)
![example workflow](https://github.com/atlp-rwanda/cod-be/actions/workflows/node.js.yml/badge.svg)
![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/sergenm/fc852272be18bb21d4a7418ab58e2edc/raw/cod-be__pull_18.json)
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
- In Your .env file ```NODE_ENV``` Variable should be equal to ```development```
- Add A Sample In .env.example For Any New Environment Variable Created

### How To Initialize The App

- Open Your Terminal & Run The Following Commands:
- ```npm i```
- ```npm run createDb```
- ```npm run dbMigrate```
- ```npm run dev```

### APP DEMO
### How To Test If You Can Access Data Stored In Your DataBase:
  - Run ```npm run makeSeed``` In Your Terminal
  - N.B: <port> Is Equal To The Port Value You Set In Your .env file
  - Open PostMan & Send A GET Request To ```http://localhost:<port>/offices```
  - You Should Be Able To See All Seed Data Stored In Your DataBase
  
### How To Add A New Office To The DataBase: 
  - N.B: <port> Is Equal To The Port Value You Set In Your .env file
  - Open PostMan & Send A POST Request To ```http://localhost:<port>/offices/new```
  - Your JSON BODY Should Look Like This: 
      ```bash
    {
        "country": "Rwanda", 
        "state": "Kigali", 
        "address": "KK 774 St",
        "officeName": "BN HeadQuarter",
        "officeType": "HeadQuarter" 
    }
      ```
  - You Should Receive A Response Body Which Looks Simmillar To This One: 
    ```bash
    {
      "uuid": "b66cfc7c-be2c-41f5-b459-e888bfe881a6",
      "country": "Rwanda",
      "state": "Kigali",
      "address": "KK 774 St",
      "officeName": "BN HeadQuarter",
      "officeType": "HeadQuarter",
      "updatedAt": "2022-03-07T13:20:31.569Z",
      "createdAt": "2022-03-07T13:20:31.569Z"
    }
      ```

