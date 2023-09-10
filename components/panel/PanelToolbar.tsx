"use client";
import { ReactElement, forwardRef } from "react";
import { BackgroundVariant, Node } from "reactflow";
import CanvasSettings from "./canvas-settings/CanvasSettings";
import ShapeSettings from "./shape-settings/ShapeSettings";

interface Props {
  setNodes: (nodes: Node[]) => void;
  bgColor: string;
  bgIcon: string;
  bgIconColor: string;
  setBgIcon: (val: BackgroundVariant) => void;
  setBgIconSize: (val: number) => void;
  setBgColor: (val: string) => void;
  bgIconSize: number;
  setBgIconColor: (val: string) => void;
}
const PanelToolbar = (props: Props) => {
  const {
    setNodes,
    bgIcon,
    setBgColor,
    bgIconColor,
    setBgIconColor,
    bgIconSize,
    setBgIcon,
    bgColor,
    setBgIconSize,
  } = props;

  return (
    <div className="flex flex-row items-center space-x-1 bg-gray-700 border border-gray-800 p-1 rounded-lg">
      <CanvasSettings
        bgColor={bgColor}
        setBgColor={setBgColor}
        bgIcon={bgIcon}
        setBgIcon={setBgIcon}
        bgIconColor={bgIconColor}
        setBgIconColor={setBgIconColor}
        setBgIconSize={setBgIconSize}
        bgIconSize={bgIconSize}
      />
      <ShapeSettings setNodes={setNodes} />
    </div>
  );
};

export default PanelToolbar;
