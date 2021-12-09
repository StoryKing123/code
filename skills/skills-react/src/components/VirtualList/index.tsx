import { useEffect, useState } from "react";
import VirtualListComponent from "./component";
const VirtualList = () => {
  const wrapStyle = {
    height: "50vh",
    overflow: "scroll",
  };
  const [list, setList] = useState<any[]>([]);
  const tmpList: any[] = [];
  useEffect(() => {
    for (let i = 0; i < 10000; i++) {
      const obj = {
        id: i,
        name: `张${i}`,
        age: Math.floor(Math.random() * 90),
      };
      tmpList.push(obj);
    }
    setList(tmpList);
  }, []);
  return (
    <div>
      <VirtualListComponent
        list={list}
        item={(item: any, index: number) => (
          <div
            key={item.id}
            style={{ height: "30px", backgroundColor: "#13a3a2" }}
          >
            {item.name}
          </div>
        )}
        height="30vh" estimatedItemSize={20}      ></VirtualListComponent>
    </div>
  );
};
export default VirtualList;
