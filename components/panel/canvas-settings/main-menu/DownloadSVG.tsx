import { ReactElement, useState } from "react";
import React from "react";
import {
  Panel,
  useReactFlow,
  getRectOfNodes,
  getTransformForBounds,
  Node,
} from "reactflow";
import { toPng, toSvg } from "html-to-image";
import html2canvas from "html2canvas";
import { documentToSVG, elementToSVG, inlineResources } from "dom-to-svg";

//https://github.com/bubkoo/html-to-image

const imageWidth = 1024;
const imageHeight = 768;
export default function DownloadSVG(): ReactElement {
  const { getNodes, getEdges } = useReactFlow(); //returns back all of the nodes on the canvas

  const exportToSVG = async () => {
    const targetElement = document.querySelector(".react-flow__viewport");

    console.log("core target element", targetElement);

    if (!targetElement) return;

    const nodes = document.querySelectorAll(".react-flow__node");
    const edges = document.querySelectorAll(".react-flow__edge");

    const output = traverseDOM(targetElement, edges, nodes); // nodes, edges);

    console.log("output", output);

    // downloadImage(output);
  };

  return (
    <button className="download-btn" onClick={exportToSVG}>
      SVG
    </button>
  );
}

function traverseDOM(
  target: Element,
  edges: NodeListOf<Element>,
  nodes: NodeListOf<Element>
): Element {
  // Base case: If node is null, do nothing.
  if (!target) throw new Error("the target element is undefined");

  const finalDiv = document.createElement(target.tagName.toLowerCase());

  switch (target.tagName.toLowerCase()) {
    case "div":
      const div = convertDivNode(target);
      finalDiv.appendChild(div);
    // case "svg":
    //   if (isEdge(element, edges)) {
    //     convertSVGEdge(element, finalDiv);
    //   } else {
    //     convertSVGNode(element, finalDiv);
    //   }
    // case "g":
    //   convertSVGNode(element);
    default:
      console.log("not found in switch", target.tagName.toLowerCase());
    //   finalDiv.appendChild(target);
  }

  // Copy attributes
  //   for (const attr of Array.from(element.attributes)) {
  //     element.setAttribute(attr.name, attr.value);
  //   }

  // Get the children of the current element
  const children = target.children;

  // Loop through and recursively clone each child
  for (let i = 0; i < children.length; i++) {
    const childClone = traverseDOM(children[i] as HTMLElement, edges, nodes);
    finalDiv.appendChild(childClone);
  }

  return finalDiv;
}

function convertDivNode(element: Element): Element {
  const clonedElement = element.cloneNode(true) as Element;
  clonedElement.className = element.className;
  clonedElement.setAttribute("style", element.getAttribute("style") ?? "");
  return clonedElement;
}

//convert an SVG node to an svg element that is outputted
function convertSVGNode(element: Element, finalDiv: HTMLElement) {
  console.log("converting svg");
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "1024");
  svg.setAttribute("height", "768");
  svg.setAttribute("viewBox", `0 0 ${imageWidth} ${imageHeight}`);
  svg.setAttribute("class", element.className);
  svg.setAttribute("class", "node-element");

  finalDiv.appendChild(svg);
}

//convert an SVG edge to an svg element that is outputted
//this is where we have to set the styles so that it is animated
function convertSVGEdge(element: Element, finalDiv: HTMLElement) {
  console.log("converting svg");
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

  finalDiv.appendChild(svg);
}

function isEdge(element: Element, edges: NodeListOf<Element>): boolean {
  //checks to see if the element being iterated through is an edge
  return Array.from(edges).some((edge) => edge.id === element.id);
}

export const textAttributes = new Set([
  "color",
  "dominant-baseline",
  "font-family",
  "font-size",
  "font-size-adjust",
  "font-stretch",
  "font-style",
  "font-variant",
  "font-weight",
  "direction",
  "letter-spacing",
  "text-decoration",
  "text-anchor",
  "text-decoration",
  "text-rendering",
  "unicode-bidi",
  "word-spacing",
  "writing-mode",
  "user-select",
] as const);

export function copyTextStyles(
  styles: CSSStyleDeclaration,
  svgElement: SVGElement
): void {
  textAttributes.forEach((textProperty) => {
    const value = styles.getPropertyValue(textProperty);
    if (value) {
      svgElement.setAttribute(textProperty, value);
    }
  });

  // tspan uses fill, CSS uses color
  svgElement.setAttribute("fill", styles.color);
}

function downloadImage(element: Element): void {
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(element);
  const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "finalDiv.svg";
  document.body.appendChild(downloadLink);
  downloadLink.click();
}

// Capture the whole document
// const doc = documentToSVG(document);

// Capture specific element
// const doc = elementToSVG(
//   document.querySelector(".react-flow__nodes") as HTMLElement
// );

// // Get SVG string
// const svgString = new XMLSerializer().serializeToString(doc);

//traverseDOM(targetElement, edges); //, finalDiv, nodes, edges);

//     if (qs) {
//       toSvg(qs as HTMLElement, {
//         backgroundColor: "",
//         width: imageWidth,
//         height: imageHeight,
//         style: {
//           width: `${imageWidth}`,
//           height: `${imageHeight}`,
//           transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
//         },
//       }).then(downloadImage);
//     }
//   };

// // const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
// const nodes = document.querySelectorAll(".react-flow__node");
// const edges = document.querySelectorAll(".react-flow__edge");
// // svg.setAttribute("width", "1024");
// // svg.setAttribute("height", "768");
// // svg.setAttribute("viewBox", `0 0 ${imageWidth} ${imageHeight}`);

// const nodesBounds = getRectOfNodes(getNodes()); //this provides the bounds of the rectangle that fits all of the nodes
// const transform = getTransformForBounds(
//   //this transforms that rectable to fit the canvas
//   nodesBounds,
//   imageWidth,
//   imageHeight,
//   0.5,
//   2
// );

// nodes.forEach((node) => {
//   const rect = document.createElementNS(
//     "http://www.w3.org/2000/svg",
//     "rect"
//   );
//   const { x, y } = node.getBoundingClientRect(); // Assumes node is positioned in a way that this makes sense

//   rect.setAttribute("x", x.toString());
//   rect.setAttribute("y", y.toString());
// rect.setAttribute("width", "1024");
// rect.setAttribute("height", "768");
//   rect.setAttribute("fill", getComputedStyle(node).backgroundColor); // Assumes background color is the style you want

//   svg.appendChild(rect);

//   svg.setAttribute("width", "500");
//   svg.setAttribute("height", "500");
// });

// const serializer = new XMLSerializer();
// const svgString = serializer.serializeToString(svg);
// const blob = new Blob([svgString], { type: "image/svg+xml" });
// const url = URL.createObjectURL(blob);

// const a = document.createElement("a");
// a.href = url;
// a.download = "exported_image-2.svg";
// a.click();

//this was working earlier but only slighty
//   const { getNodes } = useReactFlow();
//   const onClick = () => {
//     // we calculate a transform for the nodes so that all nodes are visible
//     // we then overwrite the transform of the `.react-flow__viewport` element
//     // with the style option of the html-to-image library
//     const nodesBounds = getRectOfNodes(getNodes());
//     const transform = getTransformForBounds(
//       nodesBounds,
//       imageWidth,
//       imageHeight,
//       0.5,
//       2
//     );

//     const qs = document.querySelector(".react-flow__viewport");

//     console.log("qs", qs);

//     if (qs) {
//       toSvg(qs as HTMLElement, {
//         backgroundColor: "",
//         width: imageWidth,
//         height: imageHeight,
//         style: {
//           width: `${imageWidth}`,
//           height: `${imageHeight}`,
//           transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
//         },
//       }).then(downloadImage);
//     }
//   };
