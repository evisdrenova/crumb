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
} from "reactflow";
import "reactflow/dist/style.css";
import RoundedBox from "../components/nodes/RoundedBox";

const nodeTypes: NodeTypes = { roundedBox: RoundedBox };

export default function Home() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [id, setId] = useState<number>(1);

  const handleAddNode = () => {
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

  return (
    <div className="flex flex-row w-full">
      <div
        className="flex flex-col space-y-3 pt-20 border-r-2 border-r-gray-300 p-10"
        id="tools-bar"
      >
        <Button variant="outline" onClick={handleAddNode}>
          + Node
        </Button>
        <Button variant="outline">Delete</Button>
        <Button variant="outline">+ button 1 </Button>
        <Button variant="outline">+ button 2</Button>
      </div>
      <ReactFlowCanvas
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
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
}

function ReactFlowCanvas(props: FlowProps): ReactElement {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, nodeTypes } =
    props;
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
        <Background className="bg-gray-100" size={2} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
