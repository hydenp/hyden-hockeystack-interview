import { Icon } from "../Icon";
import { ColumnDef } from "./type";
import styled from "styled-components";

const StyledTableHeader = styled.thead`
  background-color: var(--table-header);
  border-bottom: 1px solid #ffffff44;
`;

const StyledTableHeaderCell = styled.th`
  padding: 10px;

  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--hover-bg);
  }
`;

type Props = {
  columns: ColumnDef[];
  sortKey: string | null;
  sortDirection: "asc" | "desc" | null;
  setSortKey: (key: string) => void;
  setSortDirection: (direction: "asc" | "desc") => void;
};

export const TableHeader = ({
  columns,
  sortKey,
  sortDirection,
  setSortKey,
  setSortDirection,
}: Props) => {
  const onSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  return (
    <StyledTableHeader>
      <tr>
        {columns.map((column: ColumnDef) => (
          <StyledTableHeaderCell
            key={column.key}
            style={{
              padding: 10,
              maxWidth: column.maxWidth
                ? `${column.maxWidth}px`
                : undefined,
            }}
            onClick={() => {
              onSort(column.key);
            }}
          >
            <div
              style={{
                display: "flex",
                cursor: "pointer",
                flex: 1,
                height: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              {column.title}
              {sortKey === column.key ? (
                <Icon
                  icon={
                    sortDirection === "asc" ? "arrow_upward" : "arrow_downward"
                  }
                />
              ) : (
                <div
                  style={{
                    width: 18,
                  }}
                />
              )}
            </div>
          </StyledTableHeaderCell>
        ))}
      </tr>
    </StyledTableHeader>
  );
};
