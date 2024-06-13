import React from "react";

const Table = ({ data }: any) => {
  return (
    <table>
      <thead>
        <tr>
          {data.headers.map((header: any) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row: any) => (
          <tr key={row.id}>
            {row.cells.map((cell: any) => (
              <td key={cell}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
