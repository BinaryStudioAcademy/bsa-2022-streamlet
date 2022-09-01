## Repository for API test project

### API Testing Framework

Test runner - [Mocha](https://mochajs.org/)<br/>
Request lib - [got](https://github.com/sindresorhus/got)<br/>
Assertions - [Chai](https://www.chaijs.com/)<br/> 
 
### Setup

1. Install [NodeJS](https://nodejs.org/en/) - LTS version is preferable
2. Clone the repository
3. Locate to the project folder and install dependencies. - `npm install` 
4. Run the script command from the `package.json`

### Structure of the project

``` 
├───tests
    ├───api 
    │   ├───config
    │   ├───lib
    │   │   ├───controllers
    │   │   │   |   ├───<functionality-name>.controller.ts
    │   │   │   |   ├───... 
    │   │   │   ├───request.ts 
    │   │───specs
    │   │   ├───<functionality-name>
    │   │   |   ├───data
    │   │   |   ├───...api-test.ts
    │   │   ├───... 
    ├───helpers
├───...

```

-   scripts - bash scripts, js modules for particular job to be done.
-   test/api - test root folder with project folders.
-   test/helpers - helpers to use across the tests
-   api/config - directory with configs to run tests depends on env
-   api/lib - all controllers, request builder and other important files are in here
-   api/specs - put your tests here inside corresponding folder

Commands for running tests:
- "npm run api:tests" or "npm run api:tests:dev",
to see allure report:
- "npm run allure-report"(after test running).


