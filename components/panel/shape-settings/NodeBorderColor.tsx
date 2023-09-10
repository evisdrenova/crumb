import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ReactElement, useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { BorderAllIcon } from "@radix-ui/react-icons";
import { Node, useNodes } from "reactflow";
import { Input } from "../../ui/input";
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

  const HandleNodeBorderColorUpdate = () => {
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
  };

  useEffect(() => {
    HandleNodeBorderColorUpdate();
  }, [nodeBorderColor, setNodes]);

  return (
    <div className="flex flex-row">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
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
                      HandleNodeBorderColorUpdate;
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={5}>
            <p>Node Border Color</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
