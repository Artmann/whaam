interface Array<T> {
  reject(predicate: (item: T) => boolean): T[];
  takeWhile(predicate: (item: T) => boolean): T[];
}

Array.prototype.reject = function(predicate: (item: any) => boolean): any[] {
  return this.filter(item => predicate(item) == false);
}

Array.prototype.takeWhile = function(predicate: (item: any) => boolean): any[] {
  const list: any[] = [];

  for (let i = 0; i < this.length; i++) {
    if (!predicate(this[i])) {
      break;
    }

    list.push(this[i]);
  }

  return list;
}
