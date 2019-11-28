import Assertion from './assertion';

export default interface Test {
  command: string;
  assertions: Assertion[];
}
