"use client";
import { Button } from "@/components/ui/button";
import { ReactElement } from "react";
import { BackgroundVariant } from "reactflow";
import "reactflow/dist/style.css";
import {
  SquareIcon,
  CircleIcon,
  BoxIcon,
  PlusIcon,
  GridIcon,
  DragHandleDots2Icon,
} from "@radix-ui/react-icons";
import { ChromePicker, ColorResult, SketchPicker } from "react-color";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SideNavProps {
  addRoundedBox: () => void;
  addCircle: () => void;
  addSquare: () => void;
  bgColor: string;
  bgIcon: string;
  bgIconColor: string;
  handleBgColorChange: (color: ColorResult) => void;
  setBgIcon: (val: BackgroundVariant) => void;
  setBgIconSize: (val: number) => void;
  bgIconSize: number;
  handleBgIconColorChange: (color: ColorResult) => void;
}

interface BgIcon {
  icon: JSX.Element;
  type: BackgroundVariant;
}

export default function SideNav(props: SideNavProps): ReactElement {
  const {
    addRoundedBox,
    addCircle,
    addSquare,
    bgIcon,
    bgIconColor,
    handleBgColorChange,
    bgIconSize,
    setBgIcon,
    bgColor,
    setBgIconSize,
    handleBgIconColorChange,
  } = props;

  const customBgIcons: BgIcon[] = [
    { icon: <GridIcon />, type: BackgroundVariant.Lines },
    {
      icon: <DragHandleDots2Icon />,
      type: BackgroundVariant.Dots,
    },
    { icon: <PlusIcon />, type: BackgroundVariant.Cross },
  ];

  function stringToBackgroundVariant(
    value: string
  ): BackgroundVariant | undefined {
    switch (value) {
      case "lines":
        return BackgroundVariant.Lines;
      case "dots":
        return BackgroundVariant.Dots;
      case "cross":
        return BackgroundVariant.Cross;
      default:
        return undefined; // Return undefined for invalid values
    }
  }
  return (
    <div
      className="flex flex-col space-y-3 pt-20 border-r-2 border-r-gray-300 p-10"
      id="tools-bar"
    >
      <Button variant="outline" onClick={addRoundedBox}>
        <BoxIcon />
      </Button>
      <Button variant="outline" onClick={addSquare}>
        <SquareIcon />
      </Button>
      <Button variant="outline" onClick={addCircle}>
        <CircleIcon />
      </Button>
      <div className="flex flex-col pt-5">
        <div className="text-gray-600 text-sm">Background</div>
        <div className="text-xs">Icon</div>
        <div className="flex flex-row space-x-1">
          <div
            className="flex flex-row space-x-2 items-center"
            id="bg-icon-color-setter"
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className={`w-[38px] h-[38px]`}
                  style={{ backgroundColor: `${bgIconColor}` }}
                  variant="outline"
                />
              </PopoverTrigger>
              <PopoverContent>
                <ChromePicker
                  color={bgIconColor}
                  onChange={handleBgIconColorChange}
                />
              </PopoverContent>
            </Popover>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{bgIcon}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-30">
              <DropdownMenuLabel>Icon Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={bgIcon}
                onValueChange={(value) => {
                  const bgIcon = stringToBackgroundVariant(value);
                  if (bgIcon !== undefined) {
                    setBgIcon(bgIcon);
                  }
                }}
              >
                {customBgIcons.map((node) => (
                  <DropdownMenuRadioItem value={node.type} key={node.type}>
                    <div className="flex flex-row items-center space-x-3">
                      {node.icon}
                      <div className="text-sm text-gray-600">{node.type}</div>
                    </div>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Input
            type="size"
            className="w-10"
            value={bgIconSize}
            onChange={(val) => setBgIconSize(+val.target.value)}
          />
        </div>
        <div className="text-xs pt-5">Fill</div>
        <div
          className="flex flex-row space-x-2 items-center"
          id="bg-color-setter"
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className={`w-[38px] h-[38px] border border-gray-400`}
                style={{ backgroundColor: `${bgColor}` }}
                variant="outline"
              />
            </PopoverTrigger>
            <PopoverContent>
              <ChromePicker color={bgColor} onChange={handleBgColorChange} />
            </PopoverContent>
          </Popover>
          <div id="color-name" className=" text-gray-800 text-sm">
            {bgColor}
          </div>
        </div>
      </div>
    </div>
  );
}
