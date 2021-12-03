function addMethod(object, name, fn) {
  const old = object[name];
  object[name] = function () {
    if (arguments.length === fn.length) {
      return fn.apply(this, arguments);
    } else {
      return old.apply(this, arguments);
    }
  };
}
addMethod(window, "fn", (name) => console.log(`我是${name}`));
addMethod(window, "fn", (name, age) => console.log(`我是${name},今年${age}岁`));
addMethod(window, "fn", (name, age, sport) =>
  console.log(`我是${name},今年${age}岁,喜欢运动是${sport}`)
);
/*
 * 实现效果
 */

window.fn("林三心"); // 我是林三心
window.fn("林三心", 18); // 我是林三心，今年18岁
window.fn("林三心", 18, "打篮球"); // 我是林三心，今年18岁，喜欢运动是打篮球

