import { ReactElement, useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Node, useNodes } from "reactflow";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { HexColorPicker } from "react-colorful";
import { PaintBucketIcon } from "lucide-react";

interface Props {
  selectedNode: Node[];
  setNodes: (nodes: Node[]) => void;
}

export default function NodeBackgroundColor(props: Props): ReactElement {
  const [nodeBgColor, setNodeBgColor] = useState<string>("");
  const nodes = useNodes();
  const { selectedNode, setNodes } = props;

  useEffect(() => {
    const updatedNodes = nodes.map((node) => {
      if (selectedNode) {
        if (node.id == selectedNode[0]?.id) {
          node.style = {
            ...node.style,
            background: nodeBgColor,
          };
        }
      }
      return node;
    });
    setNodes(updatedNodes);
  }, [nodeBgColor, setNodes]);

  return (
    <div className="flex flex-row">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="panel" disabled={selectedNode?.length == 0}>
            <PaintBucketIcon className="w-[16px] h-[16px]" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-transparent">
          <HexColorPicker
            color={nodeBgColor}
            onChange={(color) => {
              setNodeBgColor(color);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
