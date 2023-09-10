import {
  BorderWidthIcon,
  DragHandleDots2Icon,
  GridIcon,
  HamburgerMenuIcon,
  Pencil1Icon,
  PlusIcon,
} from "@radix-ui/react-icons";
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
import { Button } from "../../ui/button";
import { ReactElement, useState } from "react";
import { BackgroundVariant } from "reactflow";
import { HexColorPicker } from "react-colorful";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Input } from "../../ui/input";

interface Props {
  bgColor: string;
  bgIcon: string;
  bgIconColor: string;
  bgIconSize: number;
  setBgIcon: (val: BackgroundVariant) => void;
  setBgColor: (val: string) => void;
  setBgIconColor: (val: string) => void;
  setBgIconSize: (val: number) => void;
}

interface BgIcon {
  icon: JSX.Element;
  type: BackgroundVariant;
  name: string;
}

export default function CanvasSettings(props: Props): ReactElement {
  const {
    bgIcon,
    bgIconSize,
    setBgColor,
    setBgIcon,
    bgColor,
    bgIconColor,
    setBgIconColor,
    setBgIconSize,
  } = props;

  const [openCanvasIconWidth, setCanvasIconWidth] = useState<boolean>(false);

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

  const customBgIcons: BgIcon[] = [
    { icon: <GridIcon />, type: BackgroundVariant.Lines, name: "grid" },
    {
      icon: <DragHandleDots2Icon />,
      type: BackgroundVariant.Dots,
      name: "dots",
    },
    { icon: <PlusIcon />, type: BackgroundVariant.Cross, name: "cross" },
  ];

  const handleBgIcon = (): JSX.Element => {
    const icon = customBgIcons.find((icon) => icon.name == bgIcon);
    return (
      <div className="flex flex-row items-center gap-2 hover:bg-gray-600 rounded-lg text-md font-light">
        {icon?.icon}
      </div>
    );
  };

  return (
    <div className="flex flex-row items-center space-x-1 ">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="panel">
              <HamburgerMenuIcon className="w-[16px] h-[16px]" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={5}>
            <p>Menu</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
      <DropdownMenu>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant="panel">{handleBgIcon()}</Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={5}>
              <p>Canvas Icon Type</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenuContent className="w-30 bg-gray-700 text-white rounded-lg mt-2 py-3 px-2 cursor-pointer">
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
                <div className="flex flex-row items-center space-x-3 pt-3 hover:bg-gray-600 rounded-lg p-2">
                  {node.icon}
                  <div className="text-sm text-gray-100">{node.type}</div>
                </div>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="panel"
              onClick={() => {
                if (!openCanvasIconWidth) {
                  setCanvasIconWidth(true);
                } else {
                  setCanvasIconWidth(false);
                }
              }}
            >
              <BorderWidthIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={5}>
            <p>Canvas Icon Width</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {openCanvasIconWidth && (
        <Input
          type="text"
          className="w-[50px] h-[40px]"
          value={bgIconSize}
          onChange={(val) => {
            setBgIconSize(+val.target.value);
          }}
          placeholder="1px"
          maxLength={3}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              setCanvasIconWidth(false);
            }
          }}
        />
      )}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
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
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={5}>
            <p>Canvas Icon Color</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
