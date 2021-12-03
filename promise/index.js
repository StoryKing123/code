class MyPromise {
  constructor(exector) {
    this.promiseResult = null;
    this.promiseState = "pending";
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    try {
      exector(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  resolve(res) {
    if (this.promiseState !== "pending") {
      return;
    }
    this.promiseResult = res;
    this.promiseState = "fulfilled";
    while (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()(this.promiseResult);
    }
  }
  reject(err) {
    if (this.promiseState !== "pending") {
      return;
    }
    this.promiseResult = err;
    this.promiseState = "rejected";
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(this.promiseResult);
    }
  }
  //   then(onFulfilled, onRejected) {
  //     // 接收两个回调 onFulfilled, onRejected
  //     // 参数校验，确保一定是函数
  //     onFulfilled =
  //       typeof onFulfilled === "function" ? onFulfilled : (val) => val;
  //     onRejected =
  //       typeof onRejected === "function"
  //         ? onRejected
  //         : (reason) => {
  //             throw reason;
  //           };

  //     var thenPromise = new MyPromise((resolve, reject) => {
  //       const resolvePromise = (cb) => {
  //         try {
  //           const x = cb(this.PromiseResult);
  //           if (x === thenPromise) {
  //             // 不能返回自身哦
  //             throw new Error("不能返回自身。。。");
  //           }
  //           if (x instanceof MyPromise) {
  //             // 如果返回值是Promise
  //             // 如果返回值是promise对象，返回值为成功，新promise就是成功
  //             // 如果返回值是promise对象，返回值为失败，新promise就是失败
  //             // 谁知道返回的promise是失败成功？只有then知道
  //             x.then(resolve, reject);
  //           } else {
  //             // 非Promise就直接成功
  //             resolve(x);
  //           }
  //         } catch (err) {
  //           // 处理报错
  //           reject(err);
  //           throw new Error(err);
  //         }
  //       };

  //       //   console.log('then')
  //       if (this.promiseState === "fulfilled") {
  //         // 如果当前为成功状态，执行第一个回调
  //         console.log("then");
  //         console.log(onFulfilled);
  //         resolvePromise(onFulfilled);
  //       } else if (this.PromiseState === "rejected") {
  //         // 如果当前为失败状态，执行第二个回调
  //         resolvePromise(onRejected);
  //       } else if (this.PromiseState === "pending") {
  //         // 如果状态为待定状态，暂时保存两个回调
  //         // 如果状态为待定状态，暂时保存两个回调
  //         this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled));
  //         this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected));
  //       }
  //     });

  //     // 返回这个包装的Promise
  //     return thenPromise;
  //   }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (val) => val;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const thenPromise = new MyPromise((resolve, reject) => {
      const resolvePromise = (cb) => {
        try {
          const res = cb(this.promiseResult);
          if (res === thenPromise) {
            throw Error("can't return self");
          }
          if (res instanceof MyPromise) {
            // resolve()
            res.then(resolve, reject);
          } else {
            resolve(res);
          }
        } catch (error) {
          reject(error);
          throw new Error(error);
        }

        // if(res instanceof MyPromise)
      };

      //   if(this.promiseState==='fulfilled')
      if (this.promiseState === "fulfilled") {
        resolvePromise(onFulfilled);
        // onFulfilled(this.promiseResult);
      }
      if (this.promiseState === "rejected") {
        resolvePromise(onRejected);
        // onRejected(this.promiseResult);
      }
      if (this.promiseState === "pending") {
        this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled));
        this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected));
        // this.onRejectedCallbacks.push(onRejected.bind(this));
      }
    });

    // if (this.promiseState === "fulfilled") {
    //   onFulfilled(this.promiseResult);
    // }
    // if (this.promiseState === "rejected") {
    //   onRejected(this.promiseResult);
    // }
    // if (this.promiseState === "pending") {
    //   this.onFulfilledCallbacks.push(onFulfilled.bind(this));
    //   this.onRejectedCallbacks.push(onRejected.bind(this));
    // }
    return thenPromise;
  }
}

new Promise((resolve, reject) => {
  console.log("promise");
  //   setTimeout(() => {
  resolve("123");
  //   }, 2000);
})
  .then((res) => {
    console.log(res);
    return new Promise((resolve, reject) => {
      resolve(res);
    });
  })
  .then((res) => {
    // console.log("second then");
    console.log(res * 2);
  });
console.log("end");
// console.log(res);
