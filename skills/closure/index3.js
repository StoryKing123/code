function func() {
    const a = 1;
    const b = 2;
    return function () {
        const c = 3;
        eval('console.log(a, b, c)')
    }
}
const f = func()
debugger