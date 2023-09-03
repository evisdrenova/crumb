import { useCallback } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };

export default function Square() {
  return (
    <div className="h-[40px] w-[100px] border-2 border-gray-400 bg-white">
      <Handle type="target" position={Position.Top} />

      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
    </div>
  );
}
