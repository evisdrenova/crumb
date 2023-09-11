import { ReactElement, useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { CornersIcon } from "@radix-ui/react-icons";
import { Node, useNodes } from "reactflow";
import { Input } from "../../ui/input";

interface Props {
  selectedNode: Node[];
  setNodes: (nodes: Node[]) => void;
}

export default function BorderRadius(props: Props): ReactElement {
  const { selectedNode, setNodes } = props;
  const [nodeBorderRadius, setNodeBorderRadius] = useState<string>("");
  const [openBorderRadius, setOpenBorderRadius] = useState<boolean>(false);
  const [isEnterPressed, setIsEnterPressed] = useState<boolean>(false);
  const nodes = useNodes();

  useEffect(() => {
    if (isEnterPressed) {
      // isEnterPressed check here is required bc is user goes from 3 digit to 2 digit, the border won't jump
      const updatedNodes = nodes.map((node) => {
        if (selectedNode) {
          if (node.id == selectedNode[0]?.id) {
            node.style = {
              ...node.style,
              borderRadius: nodeBorderRadius + "px",
            };
          }
        }
        return node;
      });
      setNodes(updatedNodes);
    }
  }, [nodeBorderRadius, setNodes, isEnterPressed]);

  return (
    <div className="flex flex-row items-center">
      <Button
        variant="panel"
        disabled={
          (selectedNode && selectedNode[0]?.type == "circle") ||
          selectedNode?.length == 0
        }
        onClick={() => {
          if (!openBorderRadius) {
            setOpenBorderRadius(true);
          } else {
            setOpenBorderRadius(false);
          }
        }}
      >
        <CornersIcon />
      </Button>
      {openBorderRadius && (
        <Input
          type="text"
          className="w-[50px] h-[40px]"
          placeholder="4px"
          maxLength={3}
          value={nodeBorderRadius}
          onChange={(val) => {
            //makes the scaling up and down smooth so that the border with doesn't always
            //go back to zero when the user is updating the value
            setIsEnterPressed(false);
            setNodeBorderRadius(val.target.value);
          }}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              setIsEnterPressed(true);
            }
          }}
        />
      )}
    </div>
  );
}
