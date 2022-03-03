

class Apple {

    a = 5;
    constructor() {
        this.test = this.test.bind(this)
    }
    test() {
        console.log(this.a)
    }

}


// class Dog {
//     eat() {
//         console.log()
//     }
// }
let apple = new Apple()
let b = apple.test
b()