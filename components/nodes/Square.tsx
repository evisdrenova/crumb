import { useCallback } from "react";
import { Handle, NodeResizer, Position } from "reactflow";

const handleStyle = { left: 10 };

export default function Square() {
  return (
    <>
      <NodeResizer
        color="#6486FF"
        isVisible={true}
        minWidth={100}
        minHeight={30}
      />
      <div className="min-w-[100px] min-h-[30px] w-full h-full bg-white border border-gray-300">
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
      </div>
    </>
  );
}
