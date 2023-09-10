import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DragHandleDots2Icon, PlusIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { GridIcon } from "lucide-react";
import { ReactElement } from "react";
import { BackgroundVariant } from "reactflow";

interface Props {
  bgIcon: string;
  setBgIcon: (val: BackgroundVariant) => void;
}

interface BgIcon {
  icon: JSX.Element;
  type: BackgroundVariant;
  name: string;
}

export default function CanvasIconType(props: Props): ReactElement {
  const { bgIcon, setBgIcon } = props;

  const handleBgIcon = (): JSX.Element => {
    const icon = customBgIcons.find((icon) => icon.name == bgIcon);
    return (
      <div className="flex flex-row items-center gap-2 hover:bg-gray-600 rounded-lg text-md font-light">
        {icon?.icon}
      </div>
    );
  };

  const customBgIcons: BgIcon[] = [
    { icon: <GridIcon />, type: BackgroundVariant.Lines, name: "grid" },
    {
      icon: <DragHandleDots2Icon />,
      type: BackgroundVariant.Dots,
      name: "dots",
    },
    { icon: <PlusIcon />, type: BackgroundVariant.Cross, name: "cross" },
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
    <div>
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
    </div>
  );
}
