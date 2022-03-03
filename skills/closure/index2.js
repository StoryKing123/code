function func() {
    const guang = 'guang';
    function func2() {
        const ssh = 'ssh';
        function func3() {
            const suzhe = 'suzhe';
        }
        return func3;
    }
    return func2;
}

// debugger;
const func2 = func();
// debugger;

console.log(1)
console.log(2)