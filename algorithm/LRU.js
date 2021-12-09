// class LRU {
//   constructor(capacity) {
//     this.capacity = capacity;
//     this.map = new Map();
//   }
//   get(key) {
//     if (this.map.has(key)) {
//       const value = this.map.get(key);
//       this.map.delete(key);
//       this.map.set(key, value);
//       return this.map.get(key);
//     } else {
//       return -1;
//     }
//   }
//   set(key, value) {
//     if (this.map.size() < this.capacity) {
//     } else {
//       this.map.delete(key);
//     }

//     this.map.set(key, value);
//   }
// }

// let map = new Map();
// map.set("a", "2");
// map.set("b", "3");
// map.delete("c")
// map.set("a",4)
// console.log(map.keys().next())
