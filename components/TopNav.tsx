"use client";
import Link from "next/link";
import { ReactElement } from "react";
import { Button } from "./ui/button";

export default function TopNav(): ReactElement {
  return (
    <div className="flex sticky top-0 justify-end py-3 border-b-2 border-b-gray-300 bg-[#f6f6f6]">
      <div className="flex flex-row space-x-3">
        <Button variant="navLink" id="1">
          About
        </Button>
        <Button variant="navLink" id="1">
          Item 1
        </Button>
        <Button variant="navLink" id="2">
          Item 2
        </Button>
        <Button variant="navLink" id="2">
          Item 3
        </Button>
      </div>
    </div>
  );
}
