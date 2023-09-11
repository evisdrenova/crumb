import { ReactElement } from "react";
import React from "react";
import {
  Panel,
  useReactFlow,
  getRectOfNodes,
  getTransformForBounds,
} from "reactflow";
import { toJpeg, toPng } from "html-to-image";

//https://github.com/bubkoo/html-to-image

function downloadImage(dataUrl: string) {
  const a = document.createElement("a");

  a.setAttribute("download", "reactflow.jpg");
  a.setAttribute("href", dataUrl);
  a.click();
}

const imageWidth = 1024;
const imageHeight = 768;
export default function DownloadJPEG(): ReactElement {
  const { getNodes } = useReactFlow();
  const onClick = () => {
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

    const qs = document.querySelector(".react-flow__viewport");

    //   htmlToImage.toJpeg(document.getElementById('my-node'), { quality: 0.95 })
    // .then(function (dataUrl) {
    //   var link = document.createElement('a');
    //   link.download = 'my-image-name.jpeg';
    //   link.href = dataUrl;
    //   link.click();
    // });

    if (qs) {
      toJpeg(qs as HTMLElement, {
        backgroundColor: "#1a365d",
        width: imageWidth,
        height: imageHeight,
        style: {
          width: `${imageWidth}`,
          height: `${imageHeight}`,
          transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
        },
      }).then(downloadImage);
    }
  };

  return (
    <button className="download-btn" onClick={onClick}>
      JPEG
    </button>
  );
}
