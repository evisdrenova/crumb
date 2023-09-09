"use client";
import { ReactElement, forwardRef, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { BoxIcon, CircleIcon, PaintBucketIcon, SquareIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  BorderAllIcon,
  BorderWidthIcon,
  CornersIcon,
} from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { Node, useNodes } from "reactflow";

interface Props {
  setNodes: (nodes: Node[]) => void;
}

export default function ShapeSettings(props: Props) {
  const { setNodes } = props;
  const [selectedNode, _] = useState<Node[]>();
  const [isEnterPressed, setIsEnterPressed] = useState<boolean>(false);
  const [id, setId] = useState<number>(1);
  const [openBorderWidth, setOpenBorderWidth] = useState<boolean>(false);
  const [openBorderRadius, setOpenBorderRadius] = useState<boolean>(false);
  const [nodeBorderWidth, setNodeBorderWidth] = useState<string>("");
  const [nodeBorderRadius, setNodeBorderRadius] = useState<string>("");
  const [nodeBgColor, setNodeBgColor] = useState<string>("");
  const [nodeBorderColor, setNodeBorderColor] = useState<string>("");
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

  const AddSquare = () => {
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

  const AddRoundedBox = () => {
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
      // isEnterPressed check here is required bc is user goes from 3 digit to 2 digit, the border won't jump
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

  return (
    <div className="flex flex-row items-center">
      <div className="bg-gray-500 h-6 w-[1px]" />
      <Button variant="panel" onClick={AddRoundedBox}>
        <BoxIcon className="w-[16px] h-[16px]" />
      </Button>
      <Button variant="panel" onClick={AddSquare}>
        <SquareIcon className="w-[16px] h-[16px]" />
      </Button>
      <Button variant="panel" onClick={addCircle}>
        <CircleIcon className="w-[16px] h-[16px]" />
      </Button>
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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div id="bg-icon-color-setter">
              <Button
                variant="panel"
                disabled={selectedNode?.length == 0}
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
          <TooltipContent side="bottom" sideOffset={5}>
            <p>Node Border Width</p>
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
              variant="panel"
              disabled={
                (selectedNode && selectedNode[0]?.type == "circle") ||
                selectedNode?.length == 0
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
          <TooltipContent side="bottom" sideOffset={5}>
            <p>Node Border Radius</p>
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
