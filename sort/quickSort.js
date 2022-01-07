





const quickSort = (arr) => {

  _quickSort(arr, 0, arr.length - 1)
}
const _quickSort = (arr, left, right) => {
  let partitionIndex

  if (left < right) {
    partitionIndex = partition(arr, left, right)
    _quickSort(arr, left, partitionIndex - 1)
    _quickSort(arr, partitionIndex + 1, right)
  }

}



const partition = (arr, left, right) => {
  let pivot = arr[left + 1]
  let l = left, r = right
  while (l < r) {
    while (l < r && pivot < arr[r]) {
      r--
    }
    if (l < r) {
      arr[l] = arr[r]
      l++
    }
    while (l < r && pivot > arr[l]) {
      l++
    }
    if (l < r) {
      arr[r] = arr[l]
      r--
    }
  }
  arr[l] = pivot
  return l
}















// const quickSort = (arr) => {
//   _quickSort(arr, 0, arr.length - 1)

// }

// const _quickSort = (arr, left, right) => {
//   if (left >= right) {
//     return
//   }

//   let pivot = arr[left]
//   let i = left
//   let j = right
//   while (i < j) {
//     while (i < j && pivot < arr[j]) {
//       j--
//     }
//     if (i < j) {
//       arr[i] = arr[j]
//       i++
//     }
//     while (i < j && pivot > arr[i]) {
//       i++
//     }
//     if (i < j) {
//       arr[j] = arr[i]
//       j--
//     }
//   }
//   arr[i] = pivot
//   _quickSort(arr, left, i - 1)
//   _quickSort(arr, i + 1, right)
// }


const arr = [2, 3, 5, 6, 3, 1, 34, 5, 6, 3, 64, 4, 43, 43, 536, 73, 4]

quickSort(arr)
console.log(arr)
