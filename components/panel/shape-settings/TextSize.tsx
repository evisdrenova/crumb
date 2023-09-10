import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ReactElement, useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { FontSizeIcon } from "@radix-ui/react-icons";
import { Node, useNodes } from "reactflow";
import { Input } from "../../ui/input";

interface Props {
  setIsEnterPressed: (val: boolean) => void;
  selectedNode: Node[];
  setNodes: (nodes: Node[]) => void;
  isEnterPressed: boolean;
}

export default function TextSize(props: Props): ReactElement {
  const [textSize, setTextSize] = useState<string>("8");
  const [openTextSize, setOpenTextSize] = useState<boolean>(false);
  const { setIsEnterPressed, selectedNode, setNodes, isEnterPressed } = props;
  const nodes = useNodes();

  const handleTextSizeChange = () => {
    console.log("is enter pressed", isEnterPressed);
    if (isEnterPressed) {
      //required bc is user goes from 3 digit to 2 digit, the border won't jump
      const updatedNodes = nodes.map((node) => {
        if (selectedNode) {
          if (node.id == selectedNode[0]?.id) {
            node.style = {
              ...node.style,
              fontSize: textSize,
            };
          }
        }
        return node;
      });
      console.log("textsize", textSize);
      setNodes(updatedNodes);
    }
  };

  useEffect(() => {
    handleTextSizeChange();
  }, [textSize, setNodes, setIsEnterPressed]);

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
                  if (!openTextSize) {
                    setOpenTextSize(true);
                  } else {
                    setOpenTextSize(false);
                  }
                }}
              >
                <FontSizeIcon />
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={5}>
            <p>Font size</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {openTextSize && (
        <Input
          type="number"
          className="w-[70px] h-[40px]"
          placeholder="8"
          maxLength={3}
          value={textSize}
          onChange={(val) => {
            //makes the scaling up and down smooth so that the border with doesn't always
            //go back to zero when the user is updating the value
            setIsEnterPressed(false);
            setTextSize(val.target.value);
          }}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              setIsEnterPressed(true);
              handleTextSizeChange;
            }
          }}
        />
      )}
    </div>
  );
}
