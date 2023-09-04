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
} from "@radix-ui/react-icons";
import { ChromePicker, SketchPicker } from "react-color";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

const nodeTypes: NodeTypes = {
  roundedBox: RoundedBox,
  circle: Circle,
  square: Square,
};

export default function Home() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [id, setId] = useState<number>(1);
  const [bgVariant, setBgVariant] = useState<BackgroundVariant>(
    BackgroundVariant.Dots
  );
  const [bgColor, setBgColor] = useState<string>("#F6F6F6");
  const [bgIconColor, setBgIconColor] = useState<string>("#DADADA");

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
      position: { x: 250, y: 100 },
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
        <div
          className="flex flex-row space-x-2 items-center"
          id="bg-color-setter"
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className={`w-[40px] h-[40px] border-2 border-gray-400 bg-[${bgColor}]`}
                variant="ghost"
              />
            </PopoverTrigger>
            <PopoverContent>
              <ChromePicker color={bgColor} onChange={handleBgColorChange} />
            </PopoverContent>
          </Popover>
          <div id="color-name text-gray-800">{bgColor}</div>
        </div>
        <div className="flex flex-col pt-5">
          <div className="text-gray-600 text-sm">Background</div>
          <div className="flex flex-row space-x-1 pt-2">
            <Button
              variant="outline"
              onClick={() => setBgVariant(BackgroundVariant.Dots)}
            >
              <DotFilledIcon />
            </Button>
            <Button
              variant="outline"
              onClick={() => setBgVariant(BackgroundVariant.Cross)}
            >
              <PlusIcon />
            </Button>
            <Button
              variant="outline"
              onClick={() => setBgVariant(BackgroundVariant.Lines)}
            >
              <GridIcon />
            </Button>
            <Input type="size" className="w-[24px]" />
          </div>
          <div
            className="flex flex-row space-x-2 items-center"
            id="bg-icon-color-setter"
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className={`w-[40px] h-[40px] border-2 border-gray-400`}
                  style={{ backgroundColor: `${bgIconColor}` }}
                  variant="ghost"
                />
              </PopoverTrigger>
              <PopoverContent>
                <ChromePicker
                  color={bgIconColor}
                  onChange={handleBgIconColorChange}
                />
              </PopoverContent>
            </Popover>
            <div id="color-name text-gray-800">{bgIconColor}</div>
          </div>
        </div>
      </div>
      <ReactFlowCanvas
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        bgVariant={bgVariant}
        bgColor={bgColor}
        bgIconColor={bgIconColor}
      />
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
      >
        <Background
          style={{ backgroundColor: `${bgColor}` }}
          color={bgIconColor}
          variant={bgVariant}
          size={2}
        />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
