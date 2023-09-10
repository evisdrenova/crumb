import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ReactElement, useEffect, useState } from "react";
import { useNodes, Node } from "reactflow";

interface Props {
  selectedNode: Node[];
  setNodes: (nodes: Node[]) => void;
}

const fontFamilies: string[] = ["sans-serif", "inter", "mono"];

export default function FontFamily(props: Props): ReactElement {
  const { selectedNode, setNodes } = props;
  const [fontFamily, setFontFamily] = useState<string>(""); //update with types
  const nodes = useNodes();

  const handleFontFamilyChange = () => {
    // isEnterPressed check here is required bc is user goes from 3 digit to 2 digit, the border won't jump
    const updatedNodes = nodes.map((node) => {
      if (selectedNode) {
        if (node.id == selectedNode[0]?.id) {
          node.style = {
            ...node.style,
            fontFamily: fontFamily + "px",
          };
        }
      }
      return node;
    });
    setNodes(updatedNodes);
  };

  useEffect(() => {
    handleFontFamilyChange();
  }, [fontFamily, setNodes]);

  return (
    <div>
      <DropdownMenu>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant="panel">{fontFamily}</Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={5}>
              <p>Font family</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenuContent className="w-30 bg-gray-700 text-white rounded-lg mt-2 py-3 px-2 cursor-pointer">
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={fontFamily}
            onValueChange={(value) => {
              if (value !== undefined) {
                setFontFamily(value);
              }
            }}
          >
            {fontFamilies.map((ff) => (
              <DropdownMenuRadioItem value={ff} key={ff}>
                <div className="flex flex-row items-center space-x-3 pt-3 hover:bg-gray-600 rounded-lg p-2">
                  <div className="text-sm text-gray-100">{ff}</div>
                </div>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
