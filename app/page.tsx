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
  DefaultEdgeOptions,
  NodeTypes,
  BackgroundVariant,
  ConnectionMode,
  ReactFlowProvider,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import RoundedBox from "../components/nodes/RoundedBox";
import Circle from "../components/nodes/Circle";
import Square from "../components/nodes/Square";
import {
  BorderAllIcon,
  BorderWidthIcon,
  CornersIcon,
} from "@radix-ui/react-icons";
import { ChromePicker, ColorResult, SketchPicker } from "react-color";
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
import SideNav from "@/components/SideNav";

const nodeTypes: NodeTypes = {
  roundedBox: RoundedBox,
  circle: Circle,
  square: Square,
};

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
  const [nodeBgColor, setNodeBgColor] = useState<string>("");

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

  const handleBgIconColorChange = (color: ColorResult) => {
    setBgIconColor(color.hex);
  };

  const handleBgColorChange = (color: ColorResult) => {
    setBgColor(color.hex);
  };

  return (
    <div className="flex flex-row w-full">
      <SideNav
        addRoundedBox={AddRoundedBox}
        addCircle={AddCircle}
        addSquare={AddSquare}
        bgColor={bgColor}
        bgIcon={bgIcon}
        bgIconSize={bgIconSize}
        bgIconColor={bgIconColor}
        handleBgColorChange={handleBgColorChange}
        setBgIcon={setBgIcon}
        setBgIconSize={setBgIconSize}
        handleBgIconColorChange={handleBgIconColorChange}
      />
      <ReactFlowProvider>
        <ReactFlowCanvas
          nodes={nodes}
          edges={edges}
          setNodeBgColor={setNodeBgColor}
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
  setNodeBgColor: (val: string) => void;
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
    setNodeBgColor,
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
        <Panel position="top-center">
          <PanelToolbar nodes={nodes} setNodeBgColor={setNodeBgColor} />
        </Panel>
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

interface PanelProps {
  nodes: Node[];
  setNodeBgColor: (val: string) => void;
}

function PanelToolbar(props: PanelProps): ReactElement {
  const { nodes, setNodeBgColor } = props;

  const setNodeBgColors = (color: ColorResult) => {
    const selectedNode = nodes.find((node) => node.selected);
    console.log("nodes", nodes);
    console.log("selected node", selectedNode);

    const currNodes = nodes;
    const updatedNode = {};
    setNodeBgColor("green");

    // setNodes([updatedNode, ...currNodes]);
  };
  return (
    <div className="flex flex-row items-center space-x-2 bg-gray-700 border border-gray-800 p-1 rounded-lg">
      <TooltipButton
        content={<PaintBucketIcon className="w-[16px] h-[16px]" />}
        tip="Background"
      />
      <TooltipButton content={<BorderAllIcon />} tip="Border Color" />
      <TooltipButton content={<BorderWidthIcon />} tip="Border Width" />
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
                    onChange={setNodeBgColors}
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

interface ButtonProps {
  content: JSX.Element;
  tip: string;
}

function TooltipButton(props: ButtonProps): ReactElement {
  const { content, tip } = props;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="tooltip">{content}</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{tip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
