import { useEffect, useState } from "react";
import {
  Handle,
  NodeResizer,
  NodeToolbar,
  Position,
  useKeyPress,
  useNodes,
  useReactFlow,
} from "reactflow";

interface Props {
  id: string;
}

export default function Circle(props: Props) {
  const isShiftPressed = useKeyPress("Shift");
  const { id } = props;
  const nodes = useNodes();
  const flow = useReactFlow();
  const [width, setWidth] = useState(
    nodes.find((node) => node.id == id)?.width
  );
  const [height, setHeight] = useState(
    nodes.find((node) => node.id == id)?.height
  );

  const updateWidthAndHeight = () => {
    if (!isShiftPressed) {
      return;
    }

    flow.setNodes(
      nodes.map((node) => {
        if (node.id === id) {
          if ((node.height ?? 0) > (node.width ?? 0)) {
            node.height = node.width;
            node.width = node.width;
            setWidth(node.width);
            setHeight(node.height);
          } else {
            node.height = node.height;
            node.width = node.height;
            setWidth(node.width);
            setHeight(node.height);
          }
        }
        return node;
      })
    );
  };

  useEffect(() => {
    updateWidthAndHeight();
    updateSizeCoordinates();
  }, [nodes]);

  const updateSizeCoordinates = () => {
    setWidth(nodes.find((node) => node.id == id)?.width);
    setHeight(nodes.find((node) => node.id == id)?.height);
  };

  return (
    <>
      <NodeResizer
        color="#6486FF"
        isVisible={true}
        minWidth={30}
        minHeight={30}
        onResize={() => {
          updateWidthAndHeight();
          updateSizeCoordinates();
        }}
        keepAspectRatio={isShiftPressed ? true : false}
      />
      <div
        // onMouseEnter={() => setVisible(true)}
        // onMouseLeave={() => setVisible(false)}
        className="min-w-[30px] min-h-[30px] w-full h-full bg-white rounded-full border border-gray-300"
      >
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
