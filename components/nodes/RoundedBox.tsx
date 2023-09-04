import { useEffect, useRef, useState } from "react";
import {
  Handle,
  Position,
  NodeResizer,
  useUpdateNodeInternals,
} from "reactflow";
import { drag } from "d3-drag";
import { select } from "d3-selection";

export default function RoundedBox() {
  return (
    <>
      <NodeResizer
        color="#ff0071"
        isVisible={true}
        minWidth={100}
        minHeight={30}
      />
      <div className="w-full h-full bg-white rounded-xl border border-gray-400">
        <Handle type="target" position={Position.Left} />
        <div style={{ padding: 10 }}>hello</div>
        <Handle type="source" position={Position.Right} />{" "}
      </div>
    </>
  );
}
