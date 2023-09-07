import {
  BorderAllIcon,
  BorderWidthIcon,
  CornersIcon,
} from "@radix-ui/react-icons";
import { ChromePicker } from "react-color";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PaintBucketIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import { ReactElement } from "react";

export default function PanelToolbar(): ReactElement {
  return (
    <div className="flex flex-row items-center space-x-2 bg-gray-700 border border-gray-800 p-1 rounded-lg">
      <TooltipButton
        content={<PaintBucketIcon className="w-[16px] h-[16px]" />}
        tip="Background"
      />
      <TooltipButton content={<BorderAllIcon />} tip="Border Color" />
      <TooltipButton content={<BorderWidthIcon />} tip="Border Width" />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div id="bg-icon-color-setter">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="tooltip">
                    <CornersIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="bg-transparent">
                  <ChromePicker
                  // color={bgIconColor}
                  // onChange={setNodeBgColors}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Border Radius</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

interface ButtonProps {
  content: JSX.Element;
  tip: string;
}

function TooltipButton(props: ButtonProps): ReactElement {
  const { content, tip } = props;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="tooltip">{content}</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{tip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
