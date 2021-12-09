const sendXmlRequest = () => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://developer.mozilla.org/", true);
  xhr.send();
  setTimeout(() => xhr.abort(), 0);
};

const sendAxiosRequest = () => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  axios.post(
    "/user/12345",
    {
      name: "semlinker",
    },
    {
      cancelToken: source.token,
    }
  );

  source.cancel("Operation canceled by the user."); // 取消请求，参数是可选的
};
