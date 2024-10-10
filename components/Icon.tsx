import { MaterialSymbol } from "material-symbols";
import "material-symbols/rounded.css";

export type IconType =
  | MaterialSymbol
  | "people"
  | "tips_and_updates"
  | "assessment"
  | "class";

type Props = {
  icon: IconType;
  fontSize?: number;
  color?: string;
  fill?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export const Icon = ({
  icon,
  fontSize = 18,
  color = "inherit",
  fill = true,
  style,
  onClick,
}: Props) => {
  return (
    <span
      onClick={onClick}
      className="material-symbols-rounded"
      style={{
        fontSize: fontSize,
        color: color,
        fontVariationSettings: `'FILL' ${
          fill ? 1 : 0
        }, 'wght' 500, 'GRAD' 200, 'opsz' 48`,
        cursor: onClick ? "pointer" : "inherit",
        ...style,
      }}
    >
      {icon}
    </span>
  );
};
