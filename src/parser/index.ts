import { getIndentation } from './indentation';
import Test from './test';

export default function parse(input: string) {
  const { tabCharacter, tabSize } = getIndentation(input);

  if (tabSize === 0) {
    throw new Error(`Could not determine the tab size. Make
      sure that your test has a consistent indentation
      using either tabs or spaces
    `);
  }

  const lines = input
    .split(/\r\n|\r|\n/)
    .map(line => {
      const indentation = line.split('').takeWhile(char => char === tabCharacter).join('');
      const level = indentation.length / tabSize;
      const value = line.replace(indentation, '');

      return {
        level,
        value
      };
    });

  const test: Test = {
    arrangements: [],
    actions: [],
    assertions: []
  };

  const stages = ['ARRANGE', 'ACT', 'ASSERT'];

  let currentStage;
  let expression;

  /* Here be dragons */

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.level === 0) {
      if (line.value.length === 0) {
        continue;
      }

      const stage = line.value.trim();

      if (!stages.includes(stage)) {
        throw new Error(`Invalid syntax: A stage has to be one of 'ARRANGE', 'ACT' or 'ASSERT', got ${stage}`);
      }

      currentStage = stage;

      continue;
    }

    //let previousExpression = expression;
    expression = line.value.trim();

    let target;

    if (currentStage === 'ARRANGE') {
      target = test.arrangements;
    } else {
      target = test.actions;
    }

    if (line.level === 1) {
      if (currentStage === 'ASSERT') {
        const [ name, ...params ] = line.value.split(' ');

        test.assertions.push({
          name,
          params
        });

      } else {
        target.push(expression);
      }

      continue;
    }

    // With an indentation level greater than one means'
    // that the content of this line is part of
    // the previous arrangement.

    if (target.length === 0) {
      continue;
    }

    if (currentStage === 'ASSERT') {
      const lastExpression = test.assertions[test.assertions.length - 1];

      test.assertions[test.assertions.length - 1] = {
        ...lastExpression,
        params: [ ...lastExpression.params, expression ]
      };
    } else {
      const lastExpression = target[target.length - 1];

      target[target.length - 1] = [ lastExpression, expression ].join(' ');
    }
  }

  return test;
}
