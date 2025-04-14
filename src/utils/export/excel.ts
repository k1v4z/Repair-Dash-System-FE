import * as XLSX from 'xlsx';
export interface ExcelColumn<T = unknown, K extends keyof T = keyof T> {
  header: string;
  key: K;
  width?: number;
  formatter?: (value: T[K]) => string | number;
}

interface ExcelSheet<T = unknown> {
  name: string;
  columns: ExcelColumn<T>[];
  data: T[];
}

/**
 * Xuất dữ liệu ra file Excel
 * @param fileName Tên file Excel (không cần đuôi .xlsx)
 * @param sheets Danh sách các sheet cần xuất
 */
export const exportToExcel = <T>(fileName: string, sheets: ExcelSheet<T>[]) => {
  try {
    const workbook = XLSX.utils.book_new();

    sheets.forEach((sheet) => {
      // Format data according to column specifications
      const formattedData = sheet.data.map((row) => {
        const newRow: Record<string, string | number> = {};
        sheet.columns.forEach((col) => {
          const value = row[col.key];
          const formattedValue = col.formatter ? col.formatter(value) : value;
          newRow[col.header] = formattedValue != null ? String(formattedValue) : '';
        });
        return newRow;
      });

      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(formattedData, {
        header: sheet.columns.map((col) => col.header),
      });

      // Set column widths
      const columnWidths = sheet.columns.reduce((acc: { [key: string]: number }, col, index) => {
        if (col.width) {
          const cellRef = XLSX.utils.encode_col(index);
          acc[cellRef] = col.width;
        }
        return acc;
      }, {});

      worksheet['!cols'] = Object.keys(columnWidths).map((key) => ({
        wch: columnWidths[key],
      }));

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, sheet.name);
    });

    // Generate Excel file with current timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    XLSX.writeFile(workbook, `${fileName}_${timestamp}.xlsx`);
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    throw new Error('Có lỗi xảy ra khi xuất file Excel');
  }
};
