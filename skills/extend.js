// 定义一个动物类
function Animal(name) {
    console.log('animal construct')
    // 属性
    this.name = name || 'Animal';
    // 实例方法
    this.sleep = function () {
        console.log(this.name + '正在睡觉！');
    }
}
// 原型方法
Animal.prototype.eat = function (food) {
    console.log(this.name + '正在吃：' + food);
};

// function Cat() {


// }
// Cat.prototype = new Animal()
// Cat.prototype.name = 'cat'

// var cat = new Cat()
// console.log(cat.name)
// cat.eat('fish')
// cat.sleep()
// console.log(cat instanceof Animal)
// console.log(cat instanceof Cat)

// function Cat(name) {
//     Animal.call(this);
//     this.name = name || 'Tom';
// }

// var cat = new Cat();
// console.log(cat.name); // Tom
// cat.sleep() // Tom正在睡觉！
// console.log(cat instanceof Animal); // false
// console.log(cat instanceof Cat); // true

// function Cat(name) {
//     Animal.call(this);
//     this.name = name || 'Tom';
// }
// Cat.prototype = new Animal();

// Cat.prototype.constructor = Cat;

// var cat = new Cat();
// console.log(cat.name); // Tom
// cat.sleep() // Tom正在睡觉！
// console.log(cat instanceof Animal); // true
// console.log(cat instanceof Cat); // true
// console.log(cat.__proto__.__proto__.__proto__)
let obj = {}
let fun = function () { }
console.log(obj.prototype)
console.log(fun.prototype)