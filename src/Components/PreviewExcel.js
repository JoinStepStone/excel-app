import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { useTable } from 'react-table';

const ExcelPreview = ({ file }) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

    useEffect(() => {
        handleFileUpload(file)
    }, [file])

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Extracting columns
      const cols = jsonData[0].map((col, index) => ({
        Header: col,
        accessor: index.toString(),
      }));

      // Removing the header row from data
      const rows = jsonData.slice(1).map((row, rowIndex) => {
        let rowObj = {};
        row.forEach((cell, cellIndex) => {
          rowObj[cellIndex.toString()] = cell;
        });
        return rowObj;
      });

      setColumns(cols);
      setData(rows);
    };

    reader.readAsBinaryString(file);
  };

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div>
      {data.length > 0 && (
        <table {...getTableProps()} style={{ border: '1px solid black', marginTop: '5px' }}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()} style={{ border: '1px solid black', padding: '5px' }}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} style={{ border: '1px solid black', padding: '5px' }}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExcelPreview;
