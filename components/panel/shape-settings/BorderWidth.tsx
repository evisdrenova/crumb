import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ReactElement, useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { BorderWidthIcon, FontSizeIcon } from "@radix-ui/react-icons";
import { Node, useNodes } from "reactflow";
import { Input } from "../../ui/input";

interface Props {
  setIsEnterPressed: (val: boolean) => void;
  selectedNode: Node[];
  setNodes: (nodes: Node[]) => void;
  isEnterPressed: boolean;
}

export default function BorderWidth(props: Props): ReactElement {
  const [openBorderWidth, setOpenBorderWidth] = useState<boolean>(false);
  const [nodeBorderWidth, setNodeBorderWidth] = useState<string>("");
  const { setIsEnterPressed, selectedNode, setNodes, isEnterPressed } = props;
  const nodes = useNodes();

  const HandleNodeBorderWidthUpdate = () => {
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
  };

  useEffect(() => {
    HandleNodeBorderWidthUpdate();
  }, [nodeBorderWidth, setNodes, isEnterPressed]);

  return (
    <div className="flex flex-row">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div id="bg-icon-color-setter">
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
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={5}>
            <p>Node Border Width</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
              HandleNodeBorderWidthUpdate;
            }
          }}
        />
      )}
    </div>
  );
}
