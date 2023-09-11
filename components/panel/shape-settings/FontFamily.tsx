import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ReactElement, useEffect, useState } from "react";
import { useNodes, Node } from "reactflow";

interface Props {
  selectedNode: Node[];
  setNodes: (nodes: Node[]) => void;
}

interface FontFamily {
  name: string;
  display: JSX.Element;
}

const fontFamilies: FontFamily[] = [
  { name: "sans", display: <div className="font-sans">sans</div> },
  { name: "serif", display: <div className="font-serif">serif</div> },
  { name: "mono", display: <div className="font-mono">mono</div> },
];

export default function FontFamily(props: Props): ReactElement {
  const { selectedNode, setNodes } = props;
  const [fontFamily, setFontFamily] = useState<string>("sans");
  const nodes = useNodes();

  useEffect(() => {
    const updatedNodes = nodes.map((node) => {
      if (selectedNode) {
        if (node.id == selectedNode[0]?.id) {
          node.style = {
            ...node.style,
            fontFamily: fontFamily,
          };
        }
      }
      return node;
    });
    setNodes(updatedNodes);
  }, [fontFamily, setNodes]);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="panel"
            disabled={selectedNode?.length == 0}
            className="focus:ring-0"
          >
            {fontFamily}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-30 bg-gray-700 text-white rounded-lg mt-2 py-3 px-2 cursor-pointer">
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={fontFamily}
            onValueChange={(value) => {
              setFontFamily(value);
            }}
          >
            {fontFamilies.map((ff) => (
              <DropdownMenuRadioItem value={ff.name} key={ff.name}>
                <div className="text-sm text-gray-100 pt-3 hover:bg-gray-600 rounded-lg p-2">
                  {ff.display}
                </div>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
