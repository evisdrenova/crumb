import {
  BorderAllIcon,
  BorderWidthIcon,
  CornersIcon,
} from "@radix-ui/react-icons";
import { ChromePicker, ColorResult } from "react-color";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PaintBucketIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import { ReactElement, useEffect, useState } from "react";
import { Node, useNodes, useOnSelectionChange, useStore } from "reactflow";

interface Props {
  setNodes: (nodes: Node[]) => void;
}

export default function PanelToolbar(props: Props): ReactElement {
  const [selectedNode, setSelectedNode] = useState<Node[]>();
  const nodes = useNodes();
  const [bgColor, setBgColor] = useState<string>("");
  const { setNodes } = props;

  useOnSelectionChange({
    onChange: ({ nodes, edges }) => setSelectedNode(nodes),
  });

  const HandleBgUpdate = () => {
    const updatedNodes = nodes.map((node) => {
      if (selectedNode) {
        if (node.id == selectedNode[0]?.id) {
          node.style = { ...node.style, backgroundColor: bgColor };
        }
      }
      return node;
    });
    setNodes(updatedNodes);
  };

  useEffect(() => {
    HandleBgUpdate();
  }, [bgColor, setNodes]);

  return (
    <div className="flex flex-row items-center space-x-2 bg-gray-700 border border-gray-800 p-1 rounded-lg">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div id="bg-icon-color-setter">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="tooltip">
                    <PaintBucketIcon className="w-[16px] h-[16px]" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="bg-transparent">
                  <ChromePicker
                    color={bgColor}
                    onChange={(color) => {
                      setBgColor(color.hex);
                      HandleBgUpdate;
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Background</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div id="bg-icon-color-setter">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="tooltip">
                    <BorderAllIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="bg-transparent">
                  <ChromePicker
                  // color={bgIconColor}
                  // onChange={setNodeBgColors}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Border Color</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div id="bg-icon-color-setter">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="tooltip">
                    <BorderWidthIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="bg-transparent">
                  <ChromePicker
                  // color={bgIconColor}
                  // onChange={setNodeBgColors}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Border Width</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div id="bg-icon-color-setter">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="tooltip">
                    <CornersIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="bg-transparent">
                  <ChromePicker
                  // color={bgIconColor}
                  // onChange={setNodeBgColors}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Border Radius</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
