import { ReactElement, useState } from "react";
import { Button } from "@/components/ui/button";
import { BorderWidthIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";

interface Props {
  setBgIconSize: (val: number) => void;
  bgIconSize: number;
}

export default function CanvasIconWidth(props: Props): ReactElement {
  const [openCanvasIconWidth, setCanvasIconWidth] = useState<boolean>(false);
  const { bgIconSize, setBgIconSize } = props;
  return (
    <div className="flex flex-row">
      <Button
        variant="panel"
        onClick={() => {
          if (!openCanvasIconWidth) {
            setCanvasIconWidth(true);
          } else {
            setCanvasIconWidth(false);
          }
        }}
      >
        <BorderWidthIcon />
      </Button>
      {openCanvasIconWidth && (
        <Input
          type="text"
          className="w-[50px] h-[40px]"
          value={bgIconSize}
          onChange={(val) => {
            setBgIconSize(+val.target.value);
          }}
          placeholder="1px"
          maxLength={3}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              setCanvasIconWidth(false);
            }
          }}
        />
      )}
    </div>
  );
}
