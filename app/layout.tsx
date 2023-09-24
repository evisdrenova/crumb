import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crumb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex w-full h-full bg-[#f6f6f6]">{children}</div>
      </body>
    </html>
  );
}
