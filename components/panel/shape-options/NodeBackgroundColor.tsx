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
import { PaintBucketIcon } from "lucide-react";

interface Props {
  selectedNode: Node[];
  setNodes: (nodes: Node[]) => void;
}

export default function NodeBackgroundColor(props: Props): ReactElement {
  const [nodeBgColor, setNodeBgColor] = useState<string>("");
  const nodes = useNodes();
  const { selectedNode, setNodes } = props;

  const HandleBgUpdate = () => {
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
  };

  useEffect(() => {
    HandleBgUpdate();
  }, [nodeBgColor, setNodes]);

  return (
    <div className="flex flex-row">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
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
                      HandleBgUpdate;
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={5}>
            <p>Node Background</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
