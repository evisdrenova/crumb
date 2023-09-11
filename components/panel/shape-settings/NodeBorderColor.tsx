import { ReactElement, useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { BorderAllIcon } from "@radix-ui/react-icons";
import { Node, useNodes } from "reactflow";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { HexColorPicker } from "react-colorful";

interface Props {
  selectedNode: Node[];
  setNodes: (nodes: Node[]) => void;
}

export default function NodeBorderColor(props: Props): ReactElement {
  const [nodeBorderColor, setNodeBorderColor] = useState<string>("");
  const nodes = useNodes();
  const { selectedNode, setNodes } = props;

  useEffect(() => {
    const updatedNodes = nodes.map((node) => {
      if (selectedNode) {
        if (node.id == selectedNode[0]?.id) {
          node.style = {
            ...node.style,
            borderColor: nodeBorderColor,
          };
        }
      }
      return node;
    });
    setNodes(updatedNodes);
  }, [nodeBorderColor, setNodes]);

  return (
    <div className="flex flex-row">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="panel" disabled={selectedNode?.length == 0}>
            <BorderAllIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-transparent">
          <HexColorPicker
            color={nodeBorderColor}
            onChange={(color) => {
              setNodeBorderColor(color);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
