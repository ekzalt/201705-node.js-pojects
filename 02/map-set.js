const key1 = {};
const key2 = {};

const map = new Map([
  [key1, 1], 
  [key2, 2]]);

for (let item of map.values()) {
  console.log(item);
}

for (let [key, val] of map) {
  console.log(val);
}

const set = new Set(['1', '2', '3']);
set.add('4');