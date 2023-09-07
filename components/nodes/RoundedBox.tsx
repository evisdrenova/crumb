import {
  Handle,
  Position,
  NodeResizer,
  useNodes,
  NodeToolbar,
  useStore,
  useKeyPress,
} from "reactflow";
import { useState, useEffect } from "react";

interface Props {
  id: string;
  selected: boolean;
}

export default function RoundedBox(props: Props) {
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
        minWidth={100}
        minHeight={30}
        onResize={() => {
          updateSizeCoordinates();
        }}
        keepAspectRatio={isShiftPressed ? true : false}
      />
      <div className="min-w-[100px] min-h-[30px] w-full h-full bg-white rounded-xl border border-gray-300">
        <NodeToolbar position={Position.Bottom}>
          <div className="bg-blue-600 text-white text-sm rounded-sm px-1">
            {width}x{height}
          </div>
        </NodeToolbar>
        {selected && (
          <>
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
          </>
        )}
      </div>
    </>
  );
}
