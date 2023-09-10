"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { CircleIcon } from "lucide-react";
import { SquareIcon, TextIcon } from "@radix-ui/react-icons";
import { Node, useNodes, useOnSelectionChange } from "reactflow";
import { RoundedBox } from "@/public/icons/RoundedSquare";
import TextSize from "./shape-options/TextSize";
import TextColor from "./shape-options/TextColor";
import BorderRadius from "./shape-options/BorderRadius";
import BorderWidth from "./shape-options/BorderWidth";
import NodeBorderColor from "./shape-options/NodeBorderColor";
import NodeBackgroundColor from "./shape-options/NodeBackgroundColor";

interface Props {
  setNodes: (nodes: Node[]) => void;
}

export default function ShapeSettings(props: Props) {
  const { setNodes } = props;
  const [selectedNode, setSelectedNodes] = useState<Node[]>();
  const [isEnterPressed, setIsEnterPressed] = useState<boolean>(false);
  const [id, setId] = useState<number>(1);
  const nodes = useNodes();

  const addCircle = () => {
    const currNodes = nodes;
    const newNode = {
      id: `${id}`,
      type: "circle",
      data: [],
      position: { x: 250, y: 100 },
      style: {
        //default styles
        borderRadius: "50%",
        background: "#d9d9d9",
        borderColor: "#BEBEBE",
        borderWidth: "1px",
      },
    };
    setNodes([...currNodes, newNode]);
    setId(id + 1);
  };

  const addSquare = () => {
    const currNodes = nodes;
    const newNode = {
      id: `${id}`,
      type: "square",
      data: [],
      position: { x: 250, y: 100 },
      style: {
        //default styles
        borderRadius: "0%",
        background: "#d9d9d9",
        borderColor: "#BEBEBE",
        borderWidth: "1px",
      },
    };
    setNodes([newNode, ...currNodes]);
    setId(id + 1);
  };

  const addRoundedBox = () => {
    const currNodes = nodes;
    const newNode = {
      id: `${id}`,
      type: "roundedBox",
      data: [],
      position: { x: 100, y: 100 },
      style: {
        //default styles
        borderRadius: ".5rem",
        background: "#d9d9d9",
        borderColor: "#BEBEBE",
        borderWidth: "1px",
      },
    };
    setNodes([newNode, ...currNodes]);
    setId(id + 1);
  };

  const addTextAreaNode = () => {
    const currNodes = nodes;
    const newNode = {
      id: `${id}`,
      type: "text",
      data: [],
      position: { x: 100, y: 100 },
      style: { fontSize: "30" },
    };
    setNodes([newNode, ...currNodes]);
    setId(id + 1);
  };

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      setSelectedNodes(nodes);
    },
  });

  return (
    <div className="flex flex-row items-center">
      <div className="bg-gray-500 h-6 w-[1px] mx-1" />
      <Button variant="panel" onClick={addRoundedBox}>
        <RoundedBox />
      </Button>
      <Button variant="panel" onClick={addSquare}>
        <SquareIcon className="w-[16px] h-[16px]" />
      </Button>
      <Button variant="panel" onClick={addCircle}>
        <CircleIcon className="w-[16px] h-[16px]" />
      </Button>
      <Button variant="panel" onClick={addTextAreaNode}>
        <TextIcon className="w-[16px] h-[16px]" />
      </Button>
      <div className="bg-gray-500 h-6 w-[1px] mx-1" />
      <NodeBackgroundColor
        selectedNode={selectedNode ?? []}
        setNodes={setNodes}
      />
      <NodeBorderColor selectedNode={selectedNode ?? []} setNodes={setNodes} />
      <BorderWidth
        setIsEnterPressed={setIsEnterPressed}
        selectedNode={selectedNode ?? []}
        setNodes={setNodes}
        isEnterPressed={isEnterPressed}
      />
      <BorderRadius
        setIsEnterPressed={setIsEnterPressed}
        selectedNode={selectedNode ?? []}
        setNodes={setNodes}
        isEnterPressed={isEnterPressed}
      />
      <div className="bg-gray-500 h-6 w-[1px] mx-1" />
      <TextColor selectedNode={selectedNode ?? []} setNodes={setNodes} />
      <TextSize
        setIsEnterPressed={setIsEnterPressed}
        selectedNode={selectedNode ?? []}
        setNodes={setNodes}
        isEnterPressed={isEnterPressed}
      />
    </div>
  );
}
