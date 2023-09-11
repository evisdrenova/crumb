import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DownloadButton from "./DownloadPNG";
import DownloadPNG from "./DownloadPNG";
import DownloadJPEG from "./DownloadJPEG";

export default function MainMenu(): ReactElement {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="panel">
            <HamburgerMenuIcon className="w-[16px] h-[16px]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-gray-700 text-white rounded-lg mt-2 py-3 px-2 cursor-pointer">
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Download</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="w-56 w-30 bg-gray-700 text-white rounded-lg mt-2 py-3 px-2 cursor-pointer">
                  <DropdownMenuItem className="hover:bg-gray-600">
                    SVG
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <DownloadPNG />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-600">
                    <DownloadJPEG />
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
