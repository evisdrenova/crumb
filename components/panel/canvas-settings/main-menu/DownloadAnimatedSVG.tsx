import { ReactElement, useState } from "react";
import React from "react";

//https://github.com/bubkoo/html-to-image

export default function DownloadAnimatedSVG(): ReactElement {
  const exportToSVG = async () => {
    // Obtain the SVG element

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "387");
    svg.setAttribute("height", "391");
    svg.setAttribute("viewBox", `0 0 387 391`);
    svg.setAttribute("fill", "none");
    svg.setAttribute("class", "node-element");

    const styleElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "style"
    );
    styleElement.textContent = `
      path {
        stroke-dasharray: 12 12;
        animation: dashdraw 0.5s linear infinite;
      }
      @keyframes dashdraw {
        to {
          stroke-dashoffset: 100;
        }
      }
    `;
    svg.appendChild(styleElement);

    const pathElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathElement.setAttribute("d", "M1 1C7.33333 110 93.3 340.5 386.5 390.5");
    pathElement.setAttribute("stroke", "black");
    pathElement.setAttribute("stroke-dasharray", "12 12");
    pathElement.removeAttribute("xmlns");
    svg.appendChild(pathElement);

    // Serialize the SVG to string
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);

    // Create a Blob object from the SVG string
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });

    // Create an Object URL from the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element and set the Object URL and other attributes
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "finalDiv.svg";

    // Append the link to the document and trigger a click to start the download
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Remove the link from the document and revoke the Object URL
    // document.body.removeChild(downloadLink);
    // URL.revokeObjectURL(url);
  };

  return (
    <button className="download-btn" onClick={exportToSVG}>
      AnimatedSVG
    </button>
  );
}
