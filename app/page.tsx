"use client";

import { Table } from "@/components/table/Table";
import styles from "./page.module.css";
import { DATA } from "@/data";
import { ColumnDef } from "@/components/table/type";
import { useState } from "react";

const COLUMNS: ColumnDef[] = [
  {
    key: "url",
    title: "URL",
    width: 100,
    maxWidth: 500,
    rightIcon: "open_in_new",
    action: (row) => {
      window.open(
        `https://${row.url}` as string,
        "_blank",
        "noopener,noreferrer"
      );
    },
  },
  {
    key: "totalCount",
    title: "Total Count",
    width: 1,
  },
  { key: "totalVisitorCount", title: "Total Visitor Count", width: 1 },
  { key: "bounceCount", title: "Bounce Count", width: 1 },
  { key: "startsWithCount", title: "Starts With Count", width: 1 },
  { key: "endsWithCount", title: "Ends With Count", width: 1 },
  { key: "avgScrollPercentage", title: "Average Scroll Percentage", width: 1 },
  { key: "totalPageviewCount", title: "Total Pageview Count", width: 1 },
  { key: "score", title: "Score", width: 1 },
];

export default function Home() {
  const data = DATA.map((row) => ({
    ...row,
    score: (row.totalVisitorCount - row.bounceCount).toFixed(2),
  }));

  const [withPagination, setWithPagination] = useState(false);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Dashboard</h1>
        <button
          style={{
            cursor: "pointer",
            width: 150,
            padding: "4px 8px",
          }}
          onClick={() => setWithPagination(!withPagination)}
        >
          {withPagination ? "Without pagination" : "With pagination"}
        </button>
        <Table
          rows={data}
          columns={COLUMNS}
          pagination={withPagination ? { pageSize: 10 } : undefined}
        />
      </main>
    </div>
  );
}
