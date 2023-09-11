import { ReactElement, useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Node, useNodes } from "reactflow";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { HexColorPicker } from "react-colorful";
import { TextColorButton } from "@/public/icons/TextColor";

interface Props {
  selectedNode: Node[];
  setNodes: (nodes: Node[]) => void;
}

export default function TextColor(props: Props): ReactElement {
  const [textColor, setTextColor] = useState<string>("");
  const { selectedNode, setNodes } = props;
  const nodes = useNodes();

  useEffect(() => {
    const updatedNodes = nodes.map((node) => {
      if (selectedNode) {
        if (node.id == selectedNode[0]?.id) {
          node.style = {
            ...node.style,
            color: textColor,
          };
        }
      }
      return node;
    });
    setNodes(updatedNodes);
  }, [textColor, setNodes]);

  const checkIfText = () => {
    return selectedNode?.some((node) => node.type == "text");
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="panel" disabled={!checkIfText()}>
            <TextColorButton />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-transparent">
          <HexColorPicker
            color={textColor}
            onChange={(color) => {
              setTextColor(color);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
