import { getIndentation } from './indentation';

describe('Indentation', () => {
  describe('getIndentation', () => {
    it('works using single tab', () => {
      const text = `
Foo
\tBar
\t\tBaz
`;
      const indentation = getIndentation(text);

      expect(indentation.tabCharacter).toEqual('\t');
      expect(indentation.tabSize).toEqual(1);
    });

    it('works using 2 tabs', () => {
      const text = `
Foo
\t\t\t\t\t\tBam

\t\tBar
\t\t\t\tBaz
`;
      const indentation = getIndentation(text);

      expect(indentation.tabCharacter).toEqual('\t');
      expect(indentation.tabSize).toEqual(2);
    });

    it('works with spaces', () => {
      const text = `
Foo
    Bam

    Bar
        Baz
`;
      const indentation = getIndentation(text);

      expect(indentation.tabCharacter).toEqual(' ');
      expect(indentation.tabSize).toEqual(4);
    });
  });
});
