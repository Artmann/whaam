export default abstract class Assertion {
  abstract async assert(): Promise<Error | null>;
}
