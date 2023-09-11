import { ReactElement, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { HexColorPicker } from "react-colorful";

interface Props {
  setBgIconColor: (val: string) => void;
  bgIconColor: string;
}

export default function CanvasIconColor(props: Props): ReactElement {
  const { setBgIconColor, bgIconColor } = props;
  return (
    <div className="flex flex-row">
      <div id="bg-icon-color-setter">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="panel">
              <Pencil1Icon className="w-[16px] h-[16px]" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-transparent">
            <HexColorPicker
              color={bgIconColor}
              onChange={(color) => setBgIconColor(color)}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
