"use client";
import "reactflow/dist/style.css";
import ReactFlow, { Background, Controls } from "reactflow";

export default function Home() {
  return (
    <div>
      <ReactFlow>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
