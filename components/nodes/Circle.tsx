import { useEffect, useState } from "react";
import {
  Handle,
  NodeResizer,
  NodeToolbar,
  Position,
  useKeyPress,
  useNodes,
  useReactFlow,
  useStore,
} from "reactflow";

interface Props {
  id: string;
  selected: boolean;
}

export default function Circle(props: Props) {
  const isShiftPressed = useKeyPress("Shift");
  const { id, selected } = props;
  const size = useStore((s) => {
    return s.nodeInternals.get(id);
  });
  const nodes = useNodes();
  const [width, setWidth] = useState(size?.width);
  const [height, setHeight] = useState(size?.height);

  useEffect(() => {
    updateSizeCoordinates();
  }, [nodes]);

  const updateSizeCoordinates = () => {
    setWidth(size?.width);
    setHeight(size?.height);
  };

  return (
    <>
      <NodeResizer
        color="#6486FF"
        isVisible={selected}
        minWidth={30}
        minHeight={30}
        onResize={() => {
          updateSizeCoordinates();
        }}
        keepAspectRatio={isShiftPressed ? true : false}
      />
      <div className="min-w-[30px] min-h-[30px] w-full h-full bg-white rounded-full border border-gray-300">
        <NodeToolbar position={Position.Bottom}>
          <div className="bg-blue-600 text-white text-sm rounded-sm px-1">
            {width} x {height}
          </div>
        </NodeToolbar>
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
      </div>
    </>
  );
}
