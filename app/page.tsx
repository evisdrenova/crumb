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
import TextBox from "@/components/nodes/TextBox";
import PanelToolbar from "@/components/PanelToolbar";

const nodeTypes: NodeTypes = {
  roundedBox: RoundedBox,
  circle: Circle,
  square: Square,
  text: TextBox,
};

export default function Home() {
  const [nodes, setNodes] = useNodesState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [bgIcon, setBgIcon] = useState<BackgroundVariant>(
    BackgroundVariant.Dots
  );
  const [bgColor, setBgColor] = useState<string>("#F6F6F6");
  const [bgIconColor, setBgIconColor] = useState<string>("#8D8D8D");
  const [bgIconSize, setBgIconSize] = useState<number>(2);

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

  return (
    <div className="flex flex-row w-full">
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
              <PanelToolbar
                setNodes={setNodes}
                bgColor={bgColor}
                bgIcon={bgIcon}
                bgIconSize={bgIconSize}
                bgIconColor={bgIconColor}
                setBgIcon={setBgIcon}
                setBgIconSize={setBgIconSize}
                setBgColor={setBgColor}
                setBgIconColor={setBgIconColor}
              />
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
