const generateParenthesis = (num) => {
  const res = [];
  if (num <= 0) {
    return res;
  }
  getParenthesis("", num, num, res);

  return res;
};
//回溯
const getParenthesis = (str, l, r, res) => {
  if (l === 0 && r == 0) {
    res.push(str);
    return;
  }
  if (l > r) {
    return;
  }
  if (l > 0) {
    getParenthesis(str + "(", l - 1, r, res);
  }
  if (r > 0) {
    getParenthesis(str + ")", l, r - 1, res);
  }
  // if(l===r){
  //   getParenthesis
  // }
};

console.log(generateParenthesis(3));
