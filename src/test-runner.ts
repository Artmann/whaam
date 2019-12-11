import { join } from 'path';
import loadTests from './file-loader';

export default class TestRunner {
  async run() {
    const testPaths = [ join(__dirname, '..', 'tests' )];

    const tests = await loadTests(testPaths);

    console.log(tests);
  }
}

