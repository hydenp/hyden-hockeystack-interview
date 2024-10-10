import styled from "styled-components";
import { ColumnDef, Row } from "./type";
import { Icon } from "../Icon";

const StyledTableRow = styled.tr`
  border-bottom: 1px solid var(--table-border);
  padding: 10px;

  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--hover-bg);
  }
`;

const HoverIcon = styled.div`
  position: absolute;
  display: flex;
  border-radius: 8px;
  padding: 8px;
  top: 4px;
  border-radius: 10px;
  right: 5px;
  background: var(--hover-bg);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
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
            width: "100%",
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
                  color: "var(--text-primary)",
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
