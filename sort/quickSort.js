const quickSort = (arr, left, right) => {
  let partitionIndex;
  if (left < right) {
    partitionIndex = partitionIndex(arr, left, right);
    quickSort(arr, 0, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, arr.length - 1);
  }
  return arr;
};

const swap = (arr, l, j) => {
  let temp = arr[l];
  arr[l] = arr[j];
  arr[j] = temp;
};

const partition = (arr, left, right) => {
  let pivot = left;
  index = pivot + 1;
  for (let i = index; i <= right; i++) {
      if(arr)
  }
};

let arr = [2, 3, 5, 6, 4, 321, 32, 43, 23, 53, 13, 53];
let res = quickSort(arr, 0, arr.length - 1);
console.log(res);
