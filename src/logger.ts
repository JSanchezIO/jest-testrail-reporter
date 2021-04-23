import * as chalk from 'chalk';

export const logger = {
  error: (message: string) => {
    console.error(chalk.red(`\n\n[jest-testrail-reporter] ${message}\n`));
  },
  success: (message: string) => {
    console.log(chalk.green(`\n\n[jest-testrail-reporter] ${message}\n`));
  },
  warning: (message: string) => {
    console.warn(chalk.yellow(`\n\n[jest-testrail-reporter] ${message}\n`));
  },
};
