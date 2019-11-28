import parse from './parser';

const input = `
CMD echo "Hello World" > message.txt

ASSERT
  FILE message.txt
  CONTENT message.txt
    Hello World
`;

export default class TestRunner {
  async run() {
    console.log(parse(input));
  }
}

