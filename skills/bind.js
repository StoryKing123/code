function fn(a, b, c) {
    return a + b + c;
}

var _fn = fn.bind(null, 10, 30, 10);
var ans = _fn(); // 60
console.log(ans)