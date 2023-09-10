import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ReactElement, useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { CornersIcon } from "@radix-ui/react-icons";
import { Node, useNodes } from "reactflow";
import { Input } from "../../ui/input";

interface Props {
  setIsEnterPressed: (val: boolean) => void;
  selectedNode: Node[];
  setNodes: (nodes: Node[]) => void;
  isEnterPressed: boolean;
}

export default function BorderRadius(props: Props): ReactElement {
  const { setIsEnterPressed, selectedNode, setNodes, isEnterPressed } = props;
  const [nodeBorderRadius, setNodeBorderRadius] = useState<string>("");
  const [openBorderRadius, setOpenBorderRadius] = useState<boolean>(false);
  const nodes = useNodes();

  const HandleNodeBorderRadiusUpdate = () => {
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
  };

  useEffect(() => {
    HandleNodeBorderRadiusUpdate();
  }, [nodeBorderRadius, setNodes, isEnterPressed]);

  return (
    <div className="flex flex-row">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
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
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={5}>
            <p>Node Border Radius</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
              HandleNodeBorderRadiusUpdate;
            }
          }}
        />
      )}
    </div>
  );
}
