import { useCallback, useEffect, useState } from "react";
import {
  Edge,
  Handle,
  Node,
  NodeResizer,
  NodeToolbar,
  Position,
  useKeyPress,
  useNodes,
  useStore,
} from "reactflow";
import { Textarea } from "../ui/textarea";

interface Props {
  id: string;
  selected: boolean;
}

export default function TextBox(props: Props) {
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
      <div className="min-w-[30px] min-h-[30px] w-full h-full">
        <Textarea
          placeholder="Type your message here."
          className="focus-visible:ring-0 bg-transparent border-0"
        />

        <NodeToolbar position={Position.Bottom}>
          <div className="bg-blue-600 text-white text-sm rounded-sm px-1">
            {width} x {height}
          </div>
        </NodeToolbar>
        <NodeToolbar position={Position.Top}></NodeToolbar>
        <>
          <Handle type="target" position={Position.Left} />
          <Handle type="source" position={Position.Right} />
        </>
      </div>
    </>
  );
}
