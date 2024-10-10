"use client";
import { ColumnDef, Row } from "./type";
import { TableRow } from "./TableRow";
import { TableHeader } from "./TableHeader";
import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { TableFooter } from "./TableFooter";

const StyledTable = styled.table<{ columns: ColumnDef[] }>`
  border-collapse: collapse;

  border-radius: 12px;
  overflow: hidden;
  width: 100%;

  grid-template-columns: ${({ columns }) =>
    columns.map((column) => `minmax(${column.width}fr, 1000px)`).join(" ")};

  //   thead,
  //   tbody,
  //   tr {
  //     display: contents;
  //   }

  th {
    position: sticky;
    user-select: none;
    top: 0;
    background: grey;
    text-align: left;
    font-weight: normal;
    color: white;
  }

  th:last-child {
    border: 0;
  }

  td {
    padding-top: 10px;
    padding-bottom: 10px;
    color: #808080;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  tr:nth-child(even) td {
    background: #;
  }
`;

type Props = {
  rows: Row[];
  columns: ColumnDef[];
  pagination?: {
    pageSize: number;
  };
};

export const Table = ({ rows, columns, pagination }: Props) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );

  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [rows, pagination, sortKey, sortDirection]);

  const sortedRows = useMemo(() => {
    const sortedRows = rows.sort((a, b) => {
      if (sortKey) {
        if (sortDirection === "asc") {
          if (
            typeof a[sortKey] === "number" &&
            typeof b[sortKey] === "number"
          ) {
            return a[sortKey] - b[sortKey];
          }
          return String(a[sortKey]).localeCompare(String(b[sortKey]));
        } else {
          if (
            typeof a[sortKey] === "number" &&
            typeof b[sortKey] === "number"
          ) {
            return b[sortKey] - a[sortKey];
          }
          return String(b[sortKey]).localeCompare(String(a[sortKey]));
        }
      }
      return 0;
    });

    if (pagination) {
      return sortedRows.slice(
        page * pagination.pageSize,
        (page + 1) * pagination.pageSize
      );
    }

    return sortedRows;
  }, [rows, sortKey, sortDirection, page, pagination]);

  return (
    <StyledTable columns={columns}>
      <TableHeader
        columns={columns}
        sortKey={sortKey}
        sortDirection={sortDirection}
        setSortKey={setSortKey}
        setSortDirection={setSortDirection}
      />
      <tbody>
        {sortedRows.map((row, index) => (
          <TableRow key={index} columns={columns} row={row} />
        ))}
      </tbody>
      {pagination && (
        <TableFooter
          page={page}
          rows={rows}
          pageSize={pagination?.pageSize ?? 10}
          setPage={setPage}
        />
      )}
    </StyledTable>
  );
};
