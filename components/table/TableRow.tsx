import styled from "styled-components";
import { ColumnDef, Row } from "./type";
import { Icon } from "../Icon";

const StyledTableRow = styled.tr`
  border-bottom: 1px solid #ffffff44;
  padding: 10px;

  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--hover);
  }
`;

const HoverIcon = styled.div`
  position: absolute;
  display: flex;
  border-radius: 8px;
  padding: 8px;
  top: 3px;
  border-radius: 10;
  right: 0;
  background: var(--hover);
  opacity: 0;

  transition: opacity 0.3s;
  td:hover & {
    opacity: 1;
  }
`;

type Props = {
  row: Row;
  columns: ColumnDef[];
};

export const TableRow = ({ row, columns }: Props) => {
  return (
    <StyledTableRow>
      {columns.map((column) => (
        <td
          style={{
            cursor: column.action ? "pointer" : "default",
            position: "relative",
            padding: "10px",
            maxWidth: column.maxWidth ? `${column.maxWidth}px` : undefined,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          key={column.key}
          onClick={() => {
            column.action?.(row);
          }}
        >
          {row[column.key]}
          {column.rightIcon && (
            <HoverIcon>
              <Icon
                icon={column.rightIcon}
                style={{
                  color: "#FFFFFFBB",
                  cursor: "pointer",
                }}
              />
            </HoverIcon>
          )}
        </td>
      ))}
    </StyledTableRow>
  );
};
