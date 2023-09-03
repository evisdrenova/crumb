"use client";
import { useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

export default function Home() {
  return (
    <div className="w-full h-full">
      <ReactFlow>
        <Background className="bg-gray-100" size={2} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
