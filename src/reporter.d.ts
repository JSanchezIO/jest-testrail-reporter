declare namespace JestTestRailReporter {
  type ConfigurationOptions = {
    /** The host of the TestRail server to send results to. */
    host: string;

    /** The password, of the user, used to authenticate with TestRail. */
    password: string;

    /** The identifier of the TestRail project to send results to. */
    projectId: number;

    /** A brief description used to identify the automated test run. */
    runName: string;

    /** The identifier of the TestRail suite to classify results under. */
    suiteId: number;

    /** The username of the account to authenticate with TestRail. */
    username: string;
  };

  type JestTestCaseResult = {
    failureMessages: string[];
    status: JestTestRailReporter.JestTestStatus;
    title: string;
  };

  type JestTestStatus = 'disabled' | 'failed' | 'passed' | 'pending' | 'skipped' | 'todo';
}
