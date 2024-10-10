import styled from "styled-components";
import { Row } from "./type";
import { Icon } from "../Icon";

const StyledTableFooter = styled.tfoot`
  background-color: #ffffff44;

  padding: 10px;
`;

type Props = {
  page: number;
  setPage: (page: number) => void;
  rows: Row[];
  pageSize: number;
};

export const TableFooter = ({ page, setPage, rows, pageSize }: Props) => {
  const totalPages = Math.ceil(rows.length / pageSize);

  return (
    <StyledTableFooter>
      <td
        colSpan={10}
        style={{
          padding: "10px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              color: "white",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: 14 }}>
              Page: {page + 1} of {totalPages}
            </p>
            <Icon
              style={{
                cursor: "pointer",
              }}
              icon="chevron_left"
              onClick={() => {
                if (page > 0) {
                  setPage(page - 1);
                }
              }}
            />
            <Icon
              onClick={() => {
                if (page < totalPages - 1) {
                  setPage(page + 1);
                }
              }}
              style={{
                cursor: "pointer",
              }}
              icon="chevron_right"
            />
          </div>
        </div>
      </td>
    </StyledTableFooter>
  );
};
