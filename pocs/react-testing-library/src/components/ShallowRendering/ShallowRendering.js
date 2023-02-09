import React from "react";
import SubComponent from "../SubComponent/SubComponent";

export default function ShallowRendering() {
  return (
    <div>
      <span className="heading">Shallow Rendering</span>
      <SubComponent title="Subcomponent" />
    </div>
  );
}
