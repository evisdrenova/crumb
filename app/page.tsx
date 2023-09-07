"use client";
import { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  NodeTypes,
  BackgroundVariant,
  ConnectionMode,
  ReactFlowProvider,
  Panel,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import RoundedBox from "../components/nodes/RoundedBox";
import Circle from "../components/nodes/Circle";
import Square from "../components/nodes/Square";
import SideNav from "@/components/SideNav";
import PanelToolbar from "@/components/PanelToolbar";
import { ColorResult } from "react-color";

const nodeTypes: NodeTypes = {
  roundedBox: RoundedBox,
  circle: Circle,
  square: Square,
};

export default function Home() {
  const [nodes, setNodes] = useNodesState<Node[]>([]);
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
      data: [],
      position: { x: 250, y: 100 },
      style: { background: "red" },
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
        <div className="w-full h-[720px]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            defaultEdgeOptions={{ animated: true }}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            fitViewOptions={{ padding: 10 }}
            connectionMode={ConnectionMode.Loose}
          >
            <Panel position="top-center">
              <PanelToolbar setNodes={setNodes} />
            </Panel>
            <Background
              style={{ backgroundColor: `${bgColor}` }}
              color={bgIconColor}
              variant={bgIcon}
              size={bgIconSize}
            />
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
}
