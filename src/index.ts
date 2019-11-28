import Command from '@oclif/command'
import cli from 'cli-ux';

import TestRunner from './test-runner';

class Whaam extends Command {

  async run() {
    const testRunner = new TestRunner();

    cli.action.start('Running test suite');

    await testRunner.run();

    cli.action.stop();
  }

}

export = Whaam;
