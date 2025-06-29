import * as XLSX from "xlsx";
import { ILogDto } from "../types/log.types";

export const exportLogsToExcel = (logs: ILogDto[], filename = "logs.xlsx") => {
  if (logs.length === 0) {
    alert("No logs to export.");
    return;
  }

  const data = logs.map((log, index) => ({
    No: index + 1,
    Date: new Date(log.createdAt).toLocaleString(),
    Username: log.userName,
    Description: log.description,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Logs");

  XLSX.writeFile(workbook, filename);
};
