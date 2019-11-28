import Test from '../test';

export interface Statement {
  expression: string;
  params: any[];
}

function lex(input: string): Statement {
  const [ expression, ...params ] = input
    .trim()
    .split(/\s/g);

  if (!/[A-Z0-9]+/.test(expression)) {
    throw new Error(`Parse Error: Expected expression, found ${ expression }.`);
  }

  return {
    expression,
    params
  };
}

function isBlank(line: string): boolean {
  return /^\s*$/.test(line);
}

function extract(input: string): Statement[] {
  return input
    .split(/\r?\n/)
    .filter(line => !isBlank(line))
    .map(lex);
}

export default function parse(input: string): Test {
  const statements = extract(input);

  const command = statements.find(statement => statement.expression === 'CMD');

  if (!command) {
    throw new Error('A test case must contain a CMD statement');
  }

  const test: Test = {
    command: command.params.join(' '),
    assertions: []
  };

  return test;
}
