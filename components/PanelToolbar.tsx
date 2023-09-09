import {
  BorderAllIcon,
  BorderWidthIcon,
  BoxIcon,
  CircleIcon,
  CornersIcon,
  DragHandleDots2Icon,
  GridIcon,
  HamburgerMenuIcon,
  PlusIcon,
  SquareIcon,
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
import { BackgroundVariant, Node, useNodes } from "reactflow";
import { HexColorPicker } from "react-colorful";
import { Input } from "./ui/input";
import BackgroundSettings from "./panel/BackgroundSettings";

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

interface BgIcon {
  icon: JSX.Element;
  type: BackgroundVariant;
  name: string;
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
  const [openCanvasIconWidth, setCanvasIconWidth] = useState<boolean>(false);
  const [id, setId] = useState<number>(1);

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

  useEffect(() => {
    HandleNodeBorderRadiusUpdate();
  }, [nodeBorderRadius, setNodes, isEnterPressed]);

  return (
    <div className="flex flex-row items-center space-x-1 bg-gray-700 border border-gray-800 p-1 rounded-lg">
      <BackgroundSettings
        bgColor={bgColor}
        setBgColor={setBgColor}
        bgIcon={bgIcon}
        setBgIcon={setBgIcon}
      />
      <Button
        variant="panel"
        onClick={() => {
          if (!openCanvasIconWidth) {
            setCanvasIconWidth(true);
          } else {
            setCanvasIconWidth(false);
          }
        }}
      >
        <BorderWidthIcon />
      </Button>
      {openCanvasIconWidth && (
        <Input
          type="text"
          className="w-[50px] h-[40px]"
          value={bgIconSize}
          onChange={(val) => {
            setIsEnterPressed(false);
            setBgIconSize(+val.target.value);
          }}
          placeholder="1px"
          maxLength={3}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              setIsEnterPressed(true);
              setCanvasIconWidth(false);
            }
          }}
        />
      )}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div id="bg-icon-color-setter">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="panel">
                    <PaintBucketIcon className="w-[16px] h-[16px]" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="bg-transparent">
                  <HexColorPicker
                    color={bgIconColor}
                    onChange={(color) => setBgIconColor(color)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Background Icon Color</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="bg-gray-500 h-6 w-[1px]" />
      <Button variant="panel" onClick={AddRoundedBox}>
        <BoxIcon />
      </Button>
      <Button variant="panel" onClick={AddSquare}>
        <SquareIcon />
      </Button>
      <Button variant="panel" onClick={addCircle}>
        <CircleIcon />
      </Button>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div id="bg-icon-color-setter">
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
          <TooltipContent side="bottom">
            <p>Node Background</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div id="bg-icon-color-setter">
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
          <TooltipContent side="bottom">
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
          <TooltipContent side="bottom">
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
          <TooltipContent side="bottom">
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
