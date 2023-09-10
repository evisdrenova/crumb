import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ReactElement } from "react";

export default function MainMenu(): ReactElement {
  return (
    <div>
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
    </div>
  );
}
