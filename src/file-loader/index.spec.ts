jest.mock('fs', () => ({
  promises: {
    readdir: () => Promise.resolve([ 'test1.whaam', 'test2.Whaam', 'other.txt' ]),
    readFile: (path: string) => {
      if (path === '/tests/test1.whaam') {
        return Promise.resolve('foo');
      }
      if (path === '/tests/test2.Whaam') {
        return Promise.resolve('bar');
      }

      return Promise.resolve();
    }
  }
}));

import loadTests from './index';

describe('File Loader', () => {
  describe('loadTests', () => {
    it('loads all the tests files found in a given set of paths', async() => {
      const tests = await loadTests(['/tests/']);

      expect(tests).toEqual([
        {
          content: 'foo',
          path: '/tests/test1.whaam'
        },
        {
          content: 'bar',
          path: '/tests/test2.Whaam'
        }
      ]);
    });
  });
});
