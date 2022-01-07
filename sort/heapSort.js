

const heapSort = (arr) => {

    for (let i = Math.floor(arr.length / 2 - 1); i >= 0; i--) {
        adjustHeap(arr, i, arr.length)
    }
    for (let i = arr.length - 1; i >= 0; i--) {
        swap(arr, 0, i)
        adjustHeap(arr, 0, i)
    }
}

const adjustHeap = (arr, i, length) => {
    // console.log(`heap i:${i}`)
    let temp = i, left = 2 * i + 1, right = 2 * i + 2
    if (left < length && arr[left] > arr[temp]) {
        temp = left
    }
    if (right < length && arr[right] > arr[temp]) {
        temp = right;
    }
    if (temp !== i) {
        swap(arr, i, temp)
        adjustHeap(arr, temp, length)
    }
}

const swap = (arr, i, j) => {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

const arr = [1, 5, 3, 7, 8, 4, 32, 53, 63, 74, 32, 12, 4, 22]
heapSort(arr)
console.log(arr)