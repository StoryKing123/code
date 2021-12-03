/**
 * @param {number[]} nums
 * @return {number[][]}
 *
 */

/**
 * 
 * 示例 1：

输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
示例 2：

输入：nums = [0,1]
输出：[[0,1],[1,0]]
示例 3：

输入：nums = [1]
输出：[[1]]

 */
var permute = function (nums) {
  const list = [];
  backtrack(list, [], nums);
  return list;
};

const backtrack = (list, temp, nums) => {
  if (temp.length === nums.length) {
    return list.push([...temp]);
  }
  for (let i = 0; i < nums.length; i++) {
    if (temp.includes(nums[i])) {
      continue;
    }
    temp.push(nums[i]);
    backtrack(list, temp, nums);
    temp.pop();
  }
};
