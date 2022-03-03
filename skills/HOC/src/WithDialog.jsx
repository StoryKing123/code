import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

export default class WithDialog {
  constructor(Component, props) {
    this._ele = null;
    this._dom = <Component {...props} onCancel={this.close} />;
    this.show();
  }
  show = () => {
    this._ele = document.createElement("div");
    render(this._dom, document.body.appendChild(this._ele));
  };
  close = () => {
    unmountComponentAtNode(this._ele);
    this._ele.remove();
  };
}
