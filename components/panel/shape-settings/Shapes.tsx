import { Node } from "reactflow";

export const addCircle = (
  nodes: Node[],
  id: number,
  setNodes: (nodes: Node[]) => void,
  setId: (id: number) => void
) => {
  const currNodes = nodes;
  const newNode = {
    id: `${id}`,
    type: "circle",
    data: [],
    position: { x: 250, y: 100 },
    style: {
      //default styles
      borderRadius: "50%",
      background: "#d9d9d9",
      borderColor: "#BEBEBE",
      borderWidth: "1px",
    },
  };
  setNodes([...currNodes, newNode]);
  setId(id + 1);
};

export const addSquare = (
  nodes: Node[],
  id: number,
  setNodes: (nodes: Node[]) => void,
  setId: (id: number) => void
) => {
  const currNodes = nodes;
  const newNode = {
    id: `${id}`,
    type: "square",
    data: [],
    position: { x: 250, y: 100 },
    style: {
      //default styles
      borderRadius: "0%",
      background: "#d9d9d9",
      borderColor: "#BEBEBE",
      borderWidth: "1px",
    },
  };
  setNodes([newNode, ...currNodes]);
  setId(id + 1);
};

export const addRoundedBox = (
  nodes: Node[],
  id: number,
  setNodes: (nodes: Node[]) => void,
  setId: (id: number) => void
) => {
  const currNodes = nodes;
  const newNode = {
    id: `${id}`,
    type: "roundedBox",
    data: [],
    position: { x: 100, y: 100 },
    style: {
      //default styles
      borderRadius: ".5rem",
      background: "#d9d9d9",
      borderColor: "#BEBEBE",
      borderWidth: "1px",
    },
  };
  setNodes([newNode, ...currNodes]);
  setId(id + 1);
};

export const addTextAreaNode = (
  nodes: Node[],
  id: number,
  setNodes: (nodes: Node[]) => void,
  setId: (id: number) => void
) => {
  const currNodes = nodes;
  const newNode = {
    id: `${id}`,
    type: "text",
    data: [],
    position: { x: 100, y: 100 },
    style: { fontSize: "30" },
  };
  setNodes([newNode, ...currNodes]);
  setId(id + 1);
};
