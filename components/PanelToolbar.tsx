import {
  BorderAllIcon,
  BorderWidthIcon,
  CornersIcon,
} from "@radix-ui/react-icons";
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
import { HexColorPicker } from "react-colorful";
import { Input } from "./ui/input";

interface Props {
  setNodes: (nodes: Node[]) => void;
}

export default function PanelToolbar(props: Props): ReactElement {
  const [selectedNode, setSelectedNode] = useState<Node[]>();
  const nodes = useNodes();
  const [nodeBgColor, setNodeBgColor] = useState<string>("");
  const [nodeBorderColor, setNodeBorderColor] = useState<string>("");
  const [nodeBorderWidth, setNodeBorderWidth] = useState<string>("");
  const [isEnterPressed, setIsEnterPressed] = useState<boolean>(false);
  const [openBorderWidth, setOpenBorderWidth] = useState<boolean>(false);
  const [openBorderRadius, setOpenBorderRadius] = useState<boolean>(false);
  const [nodeBorderRadius, setNodeBorderRadius] = useState<string>("");
  const { setNodes } = props;

  useOnSelectionChange({
    onChange: ({ nodes, edges }) => setSelectedNode(nodes),
  });

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

  const HandleNodeBorderWidthUpdate = () => {
    if (isEnterPressed) {
      //required bc is user goes from 3 digit to 2 digit, the border won't jump
      const updatedNodes = nodes.map((node) => {
        if (selectedNode) {
          if (node.id == selectedNode[0]?.id) {
            node.style = {
              ...node.style,
              borderWidth: nodeBorderWidth + "px",
            };
          }
        }
        return node;
      });
      setNodes(updatedNodes);
    }
  };

  useEffect(() => {
    HandleNodeBorderWidthUpdate();
  }, [nodeBorderWidth, setNodes, isEnterPressed]);

  const HandleNodeBorderRadiusUpdate = () => {
    if (isEnterPressed) {
      //required bc is user goes from 3 digit to 2 digit, the border won't jump
      const updatedNodes = nodes.map((node) => {
        if (selectedNode) {
          if (node.id == selectedNode[0]?.id) {
            node.style = {
              ...node.style,
              borderRadius: nodeBorderRadius + "px",
            };
          }
        }
        return node;
      });
      setNodes(updatedNodes);
    }
  };

  useEffect(() => {
    HandleNodeBorderRadiusUpdate();
  }, [nodeBorderRadius, setNodes, isEnterPressed]);

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
          <TooltipContent side="bottom">
            <p>Border Color</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div id="bg-icon-color-setter">
              <Button
                variant="tooltip"
                onClick={() => {
                  if (!openBorderWidth) {
                    setOpenBorderWidth(true);
                  } else {
                    setOpenBorderWidth(false);
                  }
                }}
              >
                <BorderWidthIcon />
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={20}>
            <p>Border Width</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {openBorderWidth && (
        <Input
          type="text"
          className="w-[50px] h-[40px]"
          placeholder="4px"
          maxLength={3}
          value={nodeBorderWidth}
          onChange={(val) => {
            //makes the scaling up and down smooth so that the border with doesn't always
            //go back to zero when the user is updating the value
            setIsEnterPressed(false);
            setNodeBorderWidth(val.target.value);
          }}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              setIsEnterPressed(true);
              HandleNodeBorderWidthUpdate;
            }
          }}
        />
      )}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="tooltip"
              disabled={
                selectedNode &&
                selectedNode.length == 0 &&
                selectedNode[0]?.type == "circle"
              }
              onClick={() => {
                if (!openBorderRadius) {
                  setOpenBorderRadius(true);
                } else {
                  setOpenBorderRadius(false);
                }
              }}
            >
              <CornersIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Border Radius</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {openBorderRadius && (
        <Input
          type="text"
          className="w-[50px] h-[40px]"
          placeholder="4px"
          maxLength={3}
          value={nodeBorderRadius}
          onChange={(val) => {
            //makes the scaling up and down smooth so that the border with doesn't always
            //go back to zero when the user is updating the value
            setIsEnterPressed(false);
            setNodeBorderRadius(val.target.value);
          }}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              setIsEnterPressed(true);
              HandleNodeBorderRadiusUpdate;
            }
          }}
        />
      )}
    </div>
  );
}
