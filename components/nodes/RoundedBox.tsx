import { Handle, Position, NodeResizer } from "reactflow";

export default function RoundedBox() {
  return (
    <>
      <NodeResizer
        color="#6486FF"
        isVisible={true}
        minWidth={100}
        minHeight={30}
      />
      <div className="min-w-[100px] min-h-[30px] w-full h-full bg-white rounded-xl border border-gray-300">
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
      </div>
    </>
  );
}
