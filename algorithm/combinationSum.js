const combinationSum = (candidates, target) => {
    let res = []
    dfs(target, candidates, res, [], 0)
    return res
}
const dfs = (target, arr, res, combine, idx) => {
    if (target < 0) {
        return
    }
    if (target === 0) {
        res.push([...combine])
    }
    for (let i = idx; i < arr.length; i++) {
        combine.push(arr[i])
        dfs(target - arr[i], arr, res, combine, i)
        combine.pop()
    }
}

const res = combinationSum([2, 3, 6, 7], 7)
console.log(res)















// const dfs = (target, arr, res, combine, idx) => {
//     if (idx === arr.length) {
//         return
//     }
//     if (target === 0) {
//         res.push(combine)
//         return
//     }
//     dfs(target, arr, res, combine, idx + 1)
//     if (target - arr[idx] >= 0) {
//         dfs(target - arr[idx], arr, res, [...combine, arr[idx]], idx)
//     }
// }
// const res = combinationSum([2, 3, 6, 7], 7)
// console.log(res)