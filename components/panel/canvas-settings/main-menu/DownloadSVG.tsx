import { ReactElement } from "react";
import React from "react";
import { useReactFlow, getRectOfNodes, getTransformForBounds } from "reactflow";
import { toJpeg, toPng, toSvg } from "html-to-image";
import { documentToSVG, elementToSVG, inlineResources } from "dom-to-svg";
import { saveAs } from "file-saver";

//https://github.com/bubkoo/html-to-image

//TODO: update this so that the svg can be download correctly to open in figma

function downloadImage(dataUrl: string) {
  const a = document.createElement("a");

  a.setAttribute("download", "reactflow.svg");
  a.setAttribute("href", dataUrl);
  a.click();
}

const imageWidth = 1024;
const imageHeight = 768;
export default function DownloadSVG(): ReactElement {
  const { getNodes } = useReactFlow();
  const onClick = async () => {
    // we calculate a transform for the nodes so that all nodes are visible
    // we then overwrite the transform of the `.react-flow__viewport` element
    // with the style option of the html-to-image library
    const nodesBounds = getRectOfNodes(getNodes());
    const transform = getTransformForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2
    );

    // const qs = document.querySelector(".react-flow__viewport");

    // const svgDocument = documentToSVG(document, {
    //   keepLinks: true,
    // });

    // const a = "body > div.flex.w-full.h-full.bg-[#f6f6f6] > div > div > div";

    // const svgDocument = null;

    // const element = document.querySelector(a);

    // if (element) {
    //   svgDocument = elementToSVG(element);
    // }

    // // Inline external resources (fonts, images, etc) as data: URIs
    // await inlineResources(svgDocument.documentElement);

    // // Get SVG string
    // const svgString = new XMLSerializer().serializeToString(svgDocument);

    const a = "";

    const element = document.querySelector(".react-flow__viewport");

    let svgDocument: any = {};

    if (element) {
      svgDocument = elementToSVG(element);
    } else {
      console.log("element is not valid");
    }

    // Inline external resources (fonts, images, etc) as data: URIs
    await inlineResources(svgDocument.documentElement);

    // Get SVG string
    const svgString = new XMLSerializer().serializeToString(svgDocument);

    const blob = new Blob([svgString], { type: "image/svg+xml" });
    saveAs(blob, `canvas1.svg`);

    // if (qs) {
    //   toSvg(qs as HTMLElement, {
    //     backgroundColor: "#1a365d",
    //     width: imageWidth,
    //     height: imageHeight,
    //     style: {
    //       width: `${imageWidth}`,
    //       height: `${imageHeight}`,
    //       transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
    //     },
    //   }).then(downloadImage);
    // }
  };

  return (
    <button className="download-btn" onClick={onClick}>
      SVG
    </button>
  );
}
