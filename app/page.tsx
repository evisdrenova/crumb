"use client";
import { Button } from "@/components/ui/button";
import { ReactElement, useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  addEdge,
  FitViewOptions,
  applyNodeChanges,
  applyEdgeChanges,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  MiniMap,
  DefaultEdgeOptions,
  NodeTypes,
  BackgroundVariant,
  Position,
  ConnectionMode,
  useOnSelectionChange,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import RoundedBox from "../components/nodes/RoundedBox";
import Circle from "../components/nodes/Circle";
import Square from "../components/nodes/Square";
import {
  SquareIcon,
  CircleIcon,
  BoxIcon,
  DotFilledIcon,
  PlusIcon,
  GridIcon,
  DragHandleDots2Icon,
} from "@radix-ui/react-icons";
import { ChromePicker, SketchPicker } from "react-color";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const nodeTypes: NodeTypes = {
  roundedBox: RoundedBox,
  circle: Circle,
  square: Square,
};

interface BgIcon {
  icon: JSX.Element;
  type: BackgroundVariant;
}

export default function Home() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [id, setId] = useState<number>(1);
  const [bgIcon, setBgIcon] = useState<BackgroundVariant>(
    BackgroundVariant.Dots
  );
  const [bgColor, setBgColor] = useState<string>("#F6F6F6");
  const [bgIconColor, setBgIconColor] = useState<string>("#8D8D8D");
  const [bgIconSize, setBgIconSize] = useState<number>(2);

  const AddCircle = () => {
    const currNodes = nodes;
    const newNode = {
      id: `${id}`,
      type: "circle",
      data: { label: "Input Node" },
      position: { x: 250, y: 100 },
    };
    setNodes([newNode, ...currNodes]);
    setId(id + 1);
  };
  const AddSquare = () => {
    const currNodes = nodes;
    const newNode = {
      id: `${id}`,
      type: "square",
      data: { label: "Input Node" },
      position: { x: 250, y: 100 },
    };
    setNodes([newNode, ...currNodes]);
    setId(id + 1);
  };
  const AddRoundedBox = () => {
    const currNodes = nodes;
    const newNode = {
      id: `${id}`,
      type: "roundedBox",
      data: { label: "Input Node" },
      position: { x: 100, y: 100 },
    };
    setNodes([newNode, ...currNodes]);
    setId(id + 1);
  };

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const handleBgIconColorChange = (color: any) => {
    setBgIconColor(color.hex);
  };

  const handleBgColorChange = (color: any) => {
    setBgColor(color.hex);
  };

  const customBgIcons: BgIcon[] = [
    { icon: <GridIcon />, type: BackgroundVariant.Lines },
    {
      icon: <DragHandleDots2Icon />,
      type: BackgroundVariant.Dots,
    },
    { icon: <PlusIcon />, type: BackgroundVariant.Cross },
  ];

  function stringToBackgroundVariant(
    value: string
  ): BackgroundVariant | undefined {
    switch (value) {
      case "lines":
        return BackgroundVariant.Lines;
      case "dots":
        return BackgroundVariant.Dots;
      case "cross":
        return BackgroundVariant.Cross;
      default:
        return undefined; // Return undefined for invalid values
    }
  }

  function SelectionChangeLogger() {
    useOnSelectionChange({
      onChange: ({ nodes, edges }) => console.log("changed selection", nodes),
    });

    return null;
  }

  return (
    <div className="flex flex-row w-full">
      <div
        className="flex flex-col space-y-3 pt-20 border-r-2 border-r-gray-300 p-10"
        id="tools-bar"
      >
        <Button variant="outline" onClick={AddRoundedBox}>
          <BoxIcon />
        </Button>
        <Button variant="outline" onClick={AddSquare}>
          <SquareIcon />
        </Button>
        <Button variant="outline" onClick={AddCircle}>
          <CircleIcon />
        </Button>
        <div className="flex flex-col pt-5">
          <div className="text-gray-600 text-sm">Background</div>
          <div className="text-xs">Icon</div>
          <div className="flex flex-row space-x-1">
            <div
              className="flex flex-row space-x-2 items-center"
              id="bg-icon-color-setter"
            >
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className={`w-[38px] h-[38px]`}
                    style={{ backgroundColor: `${bgIconColor}` }}
                    variant="outline"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <ChromePicker
                    color={bgIconColor}
                    onChange={handleBgIconColorChange}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{bgIcon}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-30">
                <DropdownMenuLabel>Icon Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={bgIcon}
                  onValueChange={(value) => {
                    const bgIcon = stringToBackgroundVariant(value);
                    if (bgIcon !== undefined) {
                      setBgIcon(bgIcon);
                    }
                  }}
                >
                  {customBgIcons.map((node) => (
                    <DropdownMenuRadioItem value={node.type} key={node.type}>
                      <div className="flex flex-row items-center space-x-3">
                        {node.icon}
                        <div className="text-sm text-gray-600">{node.type}</div>
                      </div>
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Input
              type="size"
              className="w-10"
              value={bgIconSize}
              onChange={(val) => setBgIconSize(+val.target.value)}
            />
          </div>
          <div className="text-xs pt-5">Fill</div>
          <div
            className="flex flex-row space-x-2 items-center"
            id="bg-color-setter"
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className={`w-[38px] h-[38px] border border-gray-400`}
                  style={{ backgroundColor: `${bgColor}` }}
                  variant="outline"
                />
              </PopoverTrigger>
              <PopoverContent>
                <ChromePicker color={bgColor} onChange={handleBgColorChange} />
              </PopoverContent>
            </Popover>
            <div id="color-name" className=" text-gray-800 text-sm">
              {bgColor}
            </div>
          </div>
        </div>
      </div>
      <ReactFlowProvider>
        <ReactFlowCanvas
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          bgVariant={bgIcon}
          bgColor={bgColor}
          bgIconColor={bgIconColor}
          bgIconSize={bgIconSize}
        />
      </ReactFlowProvider>
    </div>
  );
}

interface FlowProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  nodeTypes: NodeTypes;
  bgVariant: BackgroundVariant;
  bgColor: string;
  bgIconColor: string;
  bgIconSize: number;
}

function ReactFlowCanvas(props: FlowProps): ReactElement {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    nodeTypes,
    bgVariant,
    bgColor,
    bgIconColor,
    bgIconSize,
  } = props;
  const fitViewOptions: FitViewOptions = {
    padding: 10,
  };
  const defaultEdgeOptions: DefaultEdgeOptions = {
    animated: true,
  };
  return (
    <div className="w-full h-[720px]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        fitViewOptions={fitViewOptions}
        connectionMode={ConnectionMode.Loose}
      >
        <Background
          style={{ backgroundColor: `${bgColor}` }}
          color={bgIconColor}
          variant={bgVariant}
          size={bgIconSize}
        />
        <Controls />
      </ReactFlow>
    </div>
  );
}
