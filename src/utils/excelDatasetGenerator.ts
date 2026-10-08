import * as XLSX from 'xlsx';

export interface DatasetFile {
  filename: string;
  displayName: string;
  description: string;
  sizeEstimate: string;
  rowsCount: number;
  dataGenerator: () => any[];
}

export const sampleDatasets: Record<string, DatasetFile> = {
  'raw_store_orders.xlsx': {
    filename: 'raw_store_orders.xlsx',
    displayName: 'Raw Store Orders Register (Messy Input)',
    description: '124 uncleaned daily retail transactions with extra whitespace, phone number anomalies, and unformatted GSTIN numbers for data sanitation pipelines.',
    sizeEstimate: '18.2 KB',
    rowsCount: 124,
    dataGenerator: () => {
      const stores = ['STORE_CHENNAI_01', 'STORE_BANGALORE_02', 'STORE_HYDERABAD_03', 'STORE_COIMBATORE_04', 'STORE_MUMBAI_05', 'STORE_DELHI_06'];
      const items = ['MacBook Air M3', 'Dell UltraSharp 27"', 'Logitech MX Master 3S', 'Keychron K2 Mechanical Keyboard', 'Anker 100W GaN Charger', 'Sony WH-1000XM5'];
      const rawNames = [
        '  Ramesh Kumar  ', 'Priya Sharma', '   Anand Subramanian', 'Kavitha Rajan  ', 'Siddharth Rao',
        'Deepa Krishnan   ', 'Vikramaditya Verma  ', 'Swathi Sundaram', 'Gautam Menon  ', 'Aishwarya Nair'
      ];
      const rawPhones = [
        '  98401 23456 ', '+91-9444011223', '98840-99881', '  97890 55441', '+91 98402 33445',
        '9444123456', ' 9841098765 ', '+919876543210', '9884112233', '9790112233'
      ];
      const rawGst = [
        '33AABCT1332L1Z5', '29ABCDE1234F1Z5', '36AAAAA0000A1Z5', '33ABCDE9999K1Z2', '27AABCS1429B1ZB',
        '33XYZAB5678C1Z9', '29PQRST1122D1Z0', '33LMNOP3344E1Z1', '36QWERT5566G1Z8', '33POIUY7788H1Z3'
      ];

      const rows: any[] = [];
      for (let i = 1; i <= 124; i++) {
        const store = stores[i % stores.length];
        const item = items[i % items.length];
        const customer = rawNames[i % rawNames.length];
        const phone = rawPhones[i % rawPhones.length];
        const gstin = rawGst[i % rawGst.length];
        const qty = (i % 6) + 1;
        const price = 450 + (i % 15) * 120;
        const date = `2026-09-${String((i % 28) + 1).padStart(2, '0')}`;

        rows.push({
          'Order_ID': `ORD-2026-${1000 + i}`,
          'Store_Code': `  ${store}  `,
          'Customer_Name': customer,
          'Phone_Number': phone,
          'GSTIN_Raw': gstin,
          'Product_Item': item,
          'Quantity': qty,
          'Unit_Price_INR': price,
          'Total_Amount_INR': qty * price,
          'Order_Date': date,
          'Status': i % 11 === 0 ? 'CANCELLED' : i % 7 === 0 ? 'PENDING' : 'DELIVERED'
        });
      }
      return rows;
    }
  }
};

/**
 * Finds the best matching dataset filename from a text string
 */
export function findDatasetForText(text: string): DatasetFile | null {
  if (!text) return null;
  const lower = text.toLowerCase();
  
  for (const [key, dataset] of Object.entries(sampleDatasets)) {
    if (lower.includes(key.toLowerCase()) || lower.includes(key.replace('.xlsx', '').toLowerCase())) {
      return dataset;
    }
  }
  return sampleDatasets['raw_store_orders.xlsx'];
}

/**
 * Downloads a structured .xlsx file dynamically in the browser
 */
export function downloadExcelDataset(filename: string): boolean {
  try {
    const dataset = sampleDatasets[filename] || sampleDatasets['raw_store_orders.xlsx'];
    const rowData = dataset.dataGenerator();

    const worksheet = XLSX.utils.json_to_sheet(rowData);

    // Auto calculate column widths
    if (rowData.length > 0) {
      const keys = Object.keys(rowData[0]);
      worksheet['!cols'] = keys.map(k => {
        const maxLen = Math.max(
          k.length,
          ...rowData.slice(0, 30).map(r => String(r[k] || '').length)
        );
        return { wch: Math.min(Math.max(maxLen + 3, 12), 40) };
      });
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Master_Data');

    // Trigger download
    XLSX.writeFile(workbook, dataset.filename);
    return true;
  } catch (error) {
    console.error('Failed to generate and download Excel dataset:', error);
    return false;
  }
}
