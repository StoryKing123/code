function* foo(x) {
    console.log(x)
    let y = yield x + 1
    console.log(y)
    let z = yield + y
    console.log(z)
    return z + 5;
    // console.log(0);
    // console.log(1, yield);
    // console.log(2, yield);
    // console.log(3, yield);

}

var gen = foo(5);

console.log(gen.next(1))
console.log(gen.next(2))
console.log(gen.next(5))
// gen.next('');    // 1 pretzel
// gen.next('california'); // 2 california
// gen.next('mayonnaise'); // 3 mayonnaiseconsole.log(0);
