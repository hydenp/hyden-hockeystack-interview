import { ReactNode } from "react";
import { IconType } from "../Icon";

export type Row = Record<string, string | number | boolean | ReactNode>;

export type ColumnDef = {
  key: string;
  title: string;
  width?: number;
  maxWidth?: number;
  rightIcon?: IconType;
  action?: (row: Row) => void;
};
