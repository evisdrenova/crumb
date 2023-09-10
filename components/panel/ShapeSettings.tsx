"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CircleIcon, PaintBucketIcon } from "lucide-react";
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
  SquareIcon,
  CornersIcon,
  TextIcon,
} from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { Node, useNodes, useOnSelectionChange } from "reactflow";
import { RoundedBox } from "@/public/icons/RoundedSquare";
import TextSize from "./shape-options/TextSize";
import TextColor from "./shape-options/TextColor";
import BorderRadius from "./shape-options/BorderRadius";
import BorderWidth from "./shape-options/BorderWidth";

interface Props {
  setNodes: (nodes: Node[]) => void;
}

export default function ShapeSettings(props: Props) {
  const { setNodes } = props;
  const [selectedNode, setSelectedNodes] = useState<Node[]>();
  const [isEnterPressed, setIsEnterPressed] = useState<boolean>(false);
  const [id, setId] = useState<number>(1);
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
