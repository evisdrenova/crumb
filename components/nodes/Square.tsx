import {
  Handle,
  Position,
  NodeResizer,
  useNodes,
  NodeToolbar,
} from "reactflow";
import { useState, useEffect } from "react";

interface Props {
  id: string;
}

export default function Square(props: Props) {
  const { id } = props;
  const nodes = useNodes();
  const [width, setWidth] = useState(
    nodes.find((node) => node.id == id)?.width
  );
  const [height, setHeight] = useState(
    nodes.find((node) => node.id == id)?.height
  );

  const updateSizeCoordinates = () => {
    setWidth(nodes.find((node) => node.id == id)?.width);
    setHeight(nodes.find((node) => node.id == id)?.height);
  };

  useEffect(() => {
    updateSizeCoordinates();
  }, [nodes]);
  return (
    <>
      <NodeResizer
        color="#6486FF"
        isVisible={true}
        minWidth={100}
        minHeight={30}
      />
      <div className="min-w-[100px] min-h-[30px] w-full h-full bg-white border border-gray-300">
        <NodeToolbar position={Position.Bottom}>
          <div className="bg-blue-600 text-white text-sm rounded-sm px-1">
            {width}x{height}
          </div>
        </NodeToolbar>
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
      </div>
    </>
  );
}
