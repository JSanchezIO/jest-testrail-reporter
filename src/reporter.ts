/// <reference path = "reporter.d.ts" />

import * as TestRail from '@dlenroc/testrail';
import { logger } from './logger';

const JEST_TO_TESTRAIL_STATUS_IDS: Record<JestTestRailReporter.JestTestStatus, number> = {
  disabled: 3,
  failed: 5,
  passed: 1,
  pending: 3,
  skipped: 3,
  todo: 3,
} as const;

export class Reporter {
  private readonly _api: TestRail | undefined;

  private readonly _caseIds: Set<number> = new Set();

  private readonly _configuration: JestTestRailReporter.ConfigurationOptions;

  private readonly _testCaseIdRegex = new RegExp(/\bT?C(\d+)\b/g);

  private readonly _testCaseResults: Array<TestRail.AddResultForCase> = [];

  constructor(_: unknown, configuration: JestTestRailReporter.ConfigurationOptions) {
    this._configuration = configuration;

    if (this._configuration.host === undefined) {
      logger.error('You must configure the `host` property');
      return;
    }

    if (this._configuration.password === undefined) {
      logger.error('You must configure the `password` property');
      return;
    }

    if (this._configuration.projectId === undefined) {
      logger.error('You must configure the `projectId` property');
      return;
    }

    if (this._configuration.runName === undefined) {
      this._configuration.runName = 'Automated Test Run via jest-testrail-reporter';

      logger.warning(
        `You didn't configure the \`runName\` property, so it will default to: ${this._configuration.runName}`
      );
    }

    if (this._configuration.suiteId === undefined) {
      logger.error('You must configure the `suiteId` property');
      return;
    }

    if (this._configuration.username === undefined) {
      logger.error('You must configure the `username` property');
      return;
    }

    this._api = new TestRail({
      host: this._configuration.host,
      password: this._configuration.password,
      username: this._configuration.username,
    });
  }

  onRunComplete = async () => {
    if (this._api === undefined || this._caseIds.size === 0 || this._testCaseResults.length === 0) {
      return;
    }

    const testRailRun = await this._api.addRun(this._configuration.projectId, {
      case_ids: Array.from(this._caseIds),
      include_all: false,
      name: this._configuration.runName,
      suite_id: this._configuration.suiteId,
    });

    this._api.addResultsForCases(testRailRun.id, {
      results: this._testCaseResults,
    });

    this._api.closeRun(testRailRun.id);

    logger.success('The run has been completed and was closed successfully');
  };

  onTestResult = (
    _: unknown,
    testSuiteResult: {
      testResults: JestTestRailReporter.JestTestCaseResult[];
    }
  ) => {
    testSuiteResult.testResults.forEach((testCaseResult) => {
      let testCaseMatch;

      // eslint-disable-next-line no-cond-assign
      while ((testCaseMatch = this._testCaseIdRegex.exec(testCaseResult.title)) !== null) {
        const testCaseId = parseInt(testCaseMatch[1], 10);

        this._testCaseResults.push({
          case_id: testCaseId,
          comment:
            testCaseResult.status === 'passed'
              ? undefined
              : testCaseResult.failureMessages.join('\n'),
          status_id: JEST_TO_TESTRAIL_STATUS_IDS[testCaseResult.status],
        });

        this._caseIds.add(testCaseId);
      }
    });
  };
}
