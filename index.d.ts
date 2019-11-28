declare module 'lex' {
  class Lexer {
    addRule(rule: RegExp, fn: Function): void;
    lex(input: string): any[];
  }

  export default Lexer;
}
