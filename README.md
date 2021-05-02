<div align="center">

> ### This package has been archived in favor of [junit-testrail-reporter](https://github.com/JSanchezIO/junit-testrail-reporter)

</div>

<h1 align="center">jest-testrail-reporter</h1>

<div align="center">

[![CI Status](https://github.com/JSanchezIO/jest-testrail-reporter/workflows/CI/badge.svg)](https://github.com/JSanchezIO/jest-testrail-reporter/actions/workflows/ci.yml)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)
[![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![NPM Package Version](https://img.shields.io/npm/v/jest-testrail-reporter)](https://www.npmjs.com/package/jest-testrail-reporter)
[![Semantic Release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://semantic-release.gitbook.io/semantic-release/)

</div>

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
