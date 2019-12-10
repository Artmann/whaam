import parse from './index';

describe('parser', () => {
  it('parses a test suite', () => {
    const input = `
ARRANGE
  mkdir -p
    messages
    secrets

ACT
  echo "Hello World" > messages/greeting.txt

ASSERT
  FILE messages/greeting.txt
  CONTENT messages/greeting.txt
    Hello
    World

`;

    const test = parse(input);

    expect(test).toEqual({
      arrangements: [
        'mkdir -p messages secrets'
      ],
      actions: [
        'echo "Hello World" > messages/greeting.txt'
      ],
      assertions: [
        { name: 'FILE', params: ['messages/greeting.txt'] },
        { name: 'CONTENT', params: ['messages/greeting.txt', 'Hello', 'World'] }
      ]
    });
  });
});
