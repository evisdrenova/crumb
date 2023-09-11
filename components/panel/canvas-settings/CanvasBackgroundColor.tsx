import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
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
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="panel">
              <PaintBucketIcon className="w-[16px] h-[16px]" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-transparent pt-3">
            <HexColorPicker
              color={bgColor}
              onChange={(color) => setBgColor(color)}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
