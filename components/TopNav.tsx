"use client";
import Link from "next/link";
import { ReactElement } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import crumblogo from "../public/crumb_2.png";

export default function TopNav(): ReactElement {
  return (
    <div className="flex flex-row justify-between sticky top-0 justify-end py-3 border-b-2 border-b-gray-300 bg-[#f6f6f6]">
      <div>
        <Link href="/" className="flex items-center">
          <Image
            src={crumblogo}
            alt="crumb"
            className="w-5 object-scale-down"
            width="64"
            height="64"
          />
          <span className="text-gray-800 text-md lg:text-lg font-normal ml-4 font-satoshi">
            Crumb
          </span>
        </Link>
      </div>
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
