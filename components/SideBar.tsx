"use client";
import Link from "next/link";
import { ReactElement } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "./ui/button";
import crumblogo from "../public/crumb_2.png";

export default function SideBar(): ReactElement {
  return (
    <div
      className="flex flex-col border-r-2 border-r-gray-300 h-screen w-2/12 bg-[#f6f6f6] p-4"
      id="side-bar"
    >
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
      <div className="flex flex-col space-y-3 pt-20" id="tools-bar">
        <Button variant="outline">+ Node</Button>
        <Button variant="outline">Delete</Button>
        <Button variant="outline">+ button 1 </Button>
        <Button variant="outline">+ button 2</Button>
      </div>
    </div>
  );
}
