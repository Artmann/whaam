export default interface Test {
  arrangements: string[];
  actions: string[];
  assertions: { name: string; params: string[] }[];
}
