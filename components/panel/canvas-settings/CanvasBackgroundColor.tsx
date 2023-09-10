import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { PaintBucketIcon } from "lucide-react";
import { ReactElement } from "react";
import { HexColorPicker } from "react-colorful";

interface Props {
  bgColor: string;
  setBgColor: (val: string) => void;
}

export default function CanvasBackgroundColor(props: Props): ReactElement {
  const { bgColor, setBgColor } = props;
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="panel">
                    <PaintBucketIcon className="w-[16px] h-[16px]" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="bg-transparent">
                  <HexColorPicker
                    color={bgColor}
                    onChange={(color) => setBgColor(color)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={5}>
            <p>Canvas Color</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
