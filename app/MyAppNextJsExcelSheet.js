"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function MyNextJsExcelSheet() {
  const [items, setItems] = useState([]);
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, {
          type: "buffer",
        });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      fetch("https://172.16.1.120/Users",{ mode: 'no-cors' }, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserType: "BeyondInsight",
          UserName: "string",
          FirstName: "string",
          LastName: "string",
          EmailAddress: "string",
          Password: "string",
        }),
      });
    });
  };
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
    </div>
  );
}
