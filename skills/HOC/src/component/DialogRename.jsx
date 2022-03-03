import { Input, Modal } from "antd";
import { useState } from "react";
import WithDialog from "../WithDialog";
const DialogRename = ({ onOk, ...props }) => {
  const [value, setValue] = useState("");
  const handleOk = () => {
    onOk(value);
    props.onCancel();
  };
  return (
    <Modal title="我是弹窗" visible onCancel={props.onCancel} onOk={handleOk}>
      <>
        <label>名称：</label>
        <Input
          style={{ width: 400 }}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder="请输入名称"
        />
      </>
    </Modal>
  );
};

export default (props) => new WithDialog(DialogRename, props);
