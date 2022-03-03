import { useState, useEffect } from "react";

const WithData = (Component, url) => {
  const WithDataComponent = (props) => {
    const [data, setData] = useState();
    useEffect(() => {
      setTimeout(() => {
        console.log("do fetch");
        setData("data" + url + Math.random() * 1000);
      }, 1000);
    }, []);
    return <Component {...props} data={data} />;
  };
  return WithDataComponent;
};

export default WithData;
