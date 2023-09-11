import { ReactElement } from "react";
import { BackgroundVariant } from "reactflow";
import MainMenu from "./main-menu/MainMenu";
import CanvasBackgroundColor from "./CanvasBackgroundColor";
import CanvasIconType from "./CanvasIconType";
import CanvasIconWidth from "./CanvasIconWidth";
import CanvasIconColor from "./CanvasIconColor";

interface Props {
  bgColor: string;
  bgIcon: string;
  bgIconColor: string;
  bgIconSize: number;
  setBgIcon: (val: BackgroundVariant) => void;
  setBgColor: (val: string) => void;
  setBgIconColor: (val: string) => void;
  setBgIconSize: (val: number) => void;
}

export default function CanvasSettings(props: Props): ReactElement {
  const {
    bgIcon,
    bgIconSize,
    setBgColor,
    setBgIcon,
    bgColor,
    bgIconColor,
    setBgIconColor,
    setBgIconSize,
  } = props;

  return (
    <div className="flex flex-row items-center space-x-1 ">
      <MainMenu />
      <CanvasBackgroundColor setBgColor={setBgColor} bgColor={bgColor} />
      <CanvasIconType setBgIcon={setBgIcon} bgIcon={bgIcon} />
      <CanvasIconWidth setBgIconSize={setBgIconSize} bgIconSize={bgIconSize} />
      <CanvasIconColor
        bgIconColor={bgIconColor}
        setBgIconColor={setBgIconColor}
      />
    </div>
  );
}
