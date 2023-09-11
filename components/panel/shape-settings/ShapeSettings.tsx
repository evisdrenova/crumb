"use client";
import { useState } from "react";
import { Button } from "../../ui/button";
import { CircleIcon } from "lucide-react";
import { SquareIcon, TextIcon } from "@radix-ui/react-icons";
import { Node, useNodes, useOnSelectionChange } from "reactflow";
import { RoundedBox } from "@/public/icons/RoundedSquare";
import TextSize from "./TextSize";
import TextColor from "./TextColor";
import BorderRadius from "./BorderRadius";
import BorderWidth from "./BorderWidth";
import NodeBorderColor from "./NodeBorderColor";
import NodeBackgroundColor from "./NodeBackgroundColor";
import { addCircle, addRoundedBox, addSquare, addTextAreaNode } from "./Shapes";
import FontFamily from "./FontFamily";

interface Props {
  setNodes: (nodes: Node[]) => void;
}

export default function ShapeSettings(props: Props) {
  const { setNodes } = props;
  const [selectedNode, setSelectedNodes] = useState<Node[]>();
  const [id, setId] = useState<number>(1);
  const nodes = useNodes();

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      setSelectedNodes(nodes);
    },
  });

  return (
    <div className="flex flex-row items-center">
      <div className="bg-gray-500 h-6 w-[1px] mx-1" />
      <Button
        variant="panel"
        onClick={() => addRoundedBox(nodes, id, setNodes, setId)}
      >
        <RoundedBox />
      </Button>
      <Button
        variant="panel"
        onClick={() => addSquare(nodes, id, setNodes, setId)}
      >
        <SquareIcon className="w-[16px] h-[16px]" />
      </Button>
      <Button
        variant="panel"
        onClick={() => addCircle(nodes, id, setNodes, setId)}
      >
        <CircleIcon className="w-[16px] h-[16px]" />
      </Button>
      <Button
        variant="panel"
        onClick={() => addTextAreaNode(nodes, id, setNodes, setId)}
      >
        <TextIcon className="w-[16px] h-[16px]" />
      </Button>
      <div className="bg-gray-500 h-6 w-[1px] mx-1" />
      <NodeBackgroundColor
        selectedNode={selectedNode ?? []}
        setNodes={setNodes}
      />
      <NodeBorderColor selectedNode={selectedNode ?? []} setNodes={setNodes} />
      <BorderWidth selectedNode={selectedNode ?? []} setNodes={setNodes} />
      <BorderRadius selectedNode={selectedNode ?? []} setNodes={setNodes} />
      <div className="bg-gray-500 h-6 w-[1px] mx-1" />
      <TextColor selectedNode={selectedNode ?? []} setNodes={setNodes} />
      <TextSize selectedNode={selectedNode ?? []} setNodes={setNodes} />
      <FontFamily selectedNode={selectedNode ?? []} setNodes={setNodes} />
    </div>
  );
}
