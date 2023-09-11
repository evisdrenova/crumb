import { ReactElement, useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { BorderWidthIcon } from "@radix-ui/react-icons";
import { Node, useNodes } from "reactflow";
import { Input } from "../../ui/input";

interface Props {
  selectedNode: Node[];
  setNodes: (nodes: Node[]) => void;
}

export default function BorderWidth(props: Props): ReactElement {
  const [openBorderWidth, setOpenBorderWidth] = useState<boolean>(false);
  const [nodeBorderWidth, setNodeBorderWidth] = useState<string>("");
  const { selectedNode, setNodes } = props;
  const [isEnterPressed, setIsEnterPressed] = useState<boolean>(false);
  const nodes = useNodes();

  useEffect(() => {
    if (isEnterPressed) {
      //required bc is user goes from 3 digit to 2 digit, the border won't jump
      const updatedNodes = nodes.map((node) => {
        if (selectedNode) {
          if (node.id == selectedNode[0]?.id) {
            node.style = {
              ...node.style,
              borderWidth: nodeBorderWidth + "px",
            };
          }
        }
        return node;
      });
      setNodes(updatedNodes);
    }
  }, [nodeBorderWidth, setNodes, isEnterPressed]);

  return (
    <div className="flex flex-row items-center">
      <Button
        variant="panel"
        disabled={selectedNode?.length == 0}
        onClick={() => {
          if (!openBorderWidth) {
            setOpenBorderWidth(true);
          } else {
            setOpenBorderWidth(false);
          }
        }}
      >
        <BorderWidthIcon />
      </Button>
      {openBorderWidth && (
        <Input
          type="text"
          className="w-[50px] h-[40px]"
          placeholder="4px"
          maxLength={3}
          value={nodeBorderWidth}
          onChange={(val) => {
            //makes the scaling up and down smooth so that the border with doesn't always
            //go back to zero when the user is updating the value
            setIsEnterPressed(false);
            setNodeBorderWidth(val.target.value);
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
