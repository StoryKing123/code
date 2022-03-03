import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import AList from "./component/AList";
import DialogRename from "./component/DialogRename";
import DislogRename2 from "./component/DialogRename";
import { Button } from "antd";

function App() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const handleOpen = () => {
    DialogRename({
      onOk: (val) => {
        alert(val);
      },
    });
  };
  const handleOpen2 = () => {
    DialogRename({
      onOk: (val) => {
        alert(val + "12312");
      },
    });
  };

  return (
    <div className="App">
      sdf
      <AList title={"title1"}></AList>
      <Button onClick={handleOpen}>open</Button>
      <Button onClick={handleOpen2}>open2</Button>
      {/* <DialogRename
        visible={visible}
        onCancel={() => setVisible(false)}
      ></DialogRename> */}
    </div>
  );
}

export default App;
