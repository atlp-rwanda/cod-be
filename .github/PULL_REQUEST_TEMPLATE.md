<!-- Change the "53" to your pull request number -->

![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/sergenm/fc852272be18bb21d4a7418ab58e2edc/raw/cod-be__pull_77.json)

### 1. Name of task
- Name Of The Assigned Task
### 2. Pivot Tracker ID
- Relevant Pivotal Tracker ID
### 3. Branch Name
- Relevant Branch Where The Assigned Task Is Implemented
### 4. Description of task
- Description Of Task and Logic Handling.
### 5. Database schema
```
- Model Before New Migration (example)
```
id(PK) | firstname | lastname | email | roleId | pasword | isVerified |
--- | --- | --- | --- |--- |--- |--- |
UUID | STRING | STRING | STRING | INTEGER | STRING | BOOLEAN | 
```
- Model After New Migration (example)
```
id(PK) | firstname | lastname | email | roleId | pasword | isVerified | email_token |
--- | --- | --- | --- |--- |--- |--- |--- |
UUID | STRING | STRING | STRING | INTEGER | STRING | BOOLEAN | STRING |

#### N.B: You can also use Snapshots If You Want.

### 6. Validations point 
- Describe The Validations Point Of What You Are Currently Working On.
### 7. Logic on the task to be completed

### 8. Logic On Actual Implementation

### 9. Endpoints 
- Add Relevant Endpoints
