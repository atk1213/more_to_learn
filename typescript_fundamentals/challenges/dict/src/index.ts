export type Dict<T> = {
  [anythingWeWant: string] : T | undefined;
};

// Array.prototype.map, but for Dict
export function mapDict<T, S>(
  dict: Dict<T>, 
  fn: (arg: T, idx: number) => S): Dict<S> {
    const out: Dict<S> = {};
    Object.keys(dict).forEach((dKey, idx) => {
      const thisItem = dict[dKey];
      if(typeof thisItem !== 'undefined'){
        out[dKey] = fn(thisItem, idx)
      }
    })
    return out
  }

  mapDict({
    a: 'a',
    b: 'b'
  }, (str) => ({val: str}))

// Array.prototype.reduce, but for Dict
export function reduceDict() {}
