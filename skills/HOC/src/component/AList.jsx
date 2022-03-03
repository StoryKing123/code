import WithData from "../WithData";

const Alist = ({ data, title }) => {
  return (
    <div
      style={{
        padding: 20,
        border: "1px solid #e9e9e9",
        display: "inline-block",
      }}
    >
      data:{data}
      title:{title}
      {/* {data.map((item, index) => (
        <div key={index}>
          <div>
            姓名：{item.name}
          </div>
        </div>
      ))} */}
    </div>
  );
};

// console.log(Alist);
export default WithData(Alist, "www.baidu.com");
// export default Alist;
