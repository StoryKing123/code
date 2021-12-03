 const ajax = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest() ?? new ActiveXObject("Mscrosoft.XMLHttp");
    xhr.open("GET", url, false);
    // xhr.setRequestHeader("Accept", "application/json");
    // xhr.setRequestHeader('Access-Control-Allow-Origin','www.google.com')
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(xhr.responseText));
      }
    };
    xhr.send()
  });
};

