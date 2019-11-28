import parse from '.';

describe('parser', () => {
  it('parses a test suite', () => {
    const input = `
      CMD echo "Hello World" > message.txt

      ASSERT
        FILE message.txt
        CONTENT message.txt
          Hello World

    `;

    const test = parse(input);

    expect(test).toEqual({
      command: 'echo "Hello World" > message.txt',
      assertions: [
        { name: 'FILE', args: ['message.txt'] },
        { name: 'CONTENT', args: ['message.txt', 'Hello', 'World'] }
      ]
    });
  });
});
