let obj = { name: 'aaa' }
let ws = new WeakSet()
ws.add(obj)
obj = null
console.log(ws)