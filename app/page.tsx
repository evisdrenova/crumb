"use client";
import SideBar from "@/components/SideBar";
import { ReactElement, useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

export default function Home() {
  return (
    <div className="flex flex-row w-full">
      <SideBar />
      <ReactFlowCanvas />
    </div>
  );
}

function ReactFlowCanvas(): ReactElement {
  return (
    <div className="w-full h-full">
      <ReactFlow>
        <Background className="bg-gray-100" size={2} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
