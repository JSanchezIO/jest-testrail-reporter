<h1 align="center">jest-testrail-reporter</h1>

<section align="center">
  <img alt="CI Status" src="https://github.com/JSanchezIO/jest-testrail-reporter/workflows/CI/badge.svg" />
  <img alt="Code Style: Prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg" />
  <img alt="Commitizen Friendly" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" />
  <img alt="NPM Package Version" src="https://img.shields.io/npm/v/jest-testrail-reporter">
  <img alt="Semantic Release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" />
</section>

<br />

You've got some test cases in TestRail that are automated via Jest. This will report the results as
a run in TestRail.

<br />

## Installation

Begin by install the package as a dependency

```sh
npm i jest-testrail-reporter
```

<br />

## Usage

1. Add the reporter to the `reporters` array in your jest config, e.g. `jest.config.js`

   ```js
   module.exports = {
     reporters: [
       'default',
       [
         'jest-testrail-reporter',
         {
           host: YOUR_TESTRAIL_HOST,
           password: YOUR_TESTRAIL_ACCOUNT_PASSWORD,
           projectId: YOUR_TESTRAIL_PROJECT_ID,
           suiteId: YOUR_TESTRAIL_SUITE_ID,
           username: YOUR_TESTRAIL_USERNAME,
         },
       ],
     ],
   };
   ```

2. Add the test case identifier in the title of your test:

   ```js
     ...

     it('C123456 given some scenario when an action is taken then something is true', () => {})


     test('C654321 given some scenario when an action is taken then something is true', () => {})

     // multiple test cases are supported as well
     test('C123456 C654321 C678901 given some scenario when an action is taken then something is true', () => {})

     ...
   ```

3. Run your tests

<br />

## Configuration

| Property    | Description                                                     | Required | Default                                           |
| ----------- | --------------------------------------------------------------- | -------- | ------------------------------------------------- |
| `host`      | The host of the TestRail server to send results to.             | ✔️       | -                                                 |
| `password`  | The password, of the user, used to authenticate with TestRail.  | ✔️       | -                                                 |
| `projectId` | The identifier of the TestRail project to send results to.      | ✔️       | -                                                 |
| `runName`   | A brief description used to identify the automated test run.    | ❌       | `"Automated Test Run via jest-testrail-reporter"` |
| `suiteId`   | The identifier of the TestRail suite to classify results under. | ✔️       | -                                                 |
| `username`  | The username of the account to authenticate with TestRail.      | ✔️       | -                                                 |
