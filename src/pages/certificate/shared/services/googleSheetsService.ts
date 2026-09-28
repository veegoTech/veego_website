/**
 * Google Sheets Service to fetch, parse, and map tabular data directly from a public Google Sheet link.
 */

export interface ParsedSheetData {
  headers: string[];
  rows: Record<string, string>[];
  rawCsv: string;
}

export interface ColumnMapping {
  studentName?: string;
  courseName?: string;
  duration?: string;
  issueDate?: string;
  studentContact?: string;
  dob?: string;
  bloodGroup?: string;
  address?: string;
  photoUrl?: string;
  emergencyPhone?: string;
  role?: string;
  periodDescription?: string;
  prefix?: string;
}

/**
 * Extracts the unique Sheet ID from various Google Sheet URL formats.
 */
export function extractGoogleSheetId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    return match[1];
  }
  // Also check if raw ID was provided
  if (/^[a-zA-Z0-9-_]{20,}$/.test(url.trim())) {
    return url.trim();
  }
  return null;
}

/**
 * Fetches Google Sheet data as CSV using the Google Visualization CSV export endpoint.
 */
export async function fetchGoogleSheetData(sheetUrlOrId: string, sheetName?: string): Promise<ParsedSheetData> {
  const sheetId = extractGoogleSheetId(sheetUrlOrId);
  if (!sheetId) {
    throw new Error('Invalid Google Sheet URL. Please provide a valid Google Sheet link.');
  }

  const endpoint = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv${
    sheetName ? `&sheet=${encodeURIComponent(sheetName)}` : ''
  }`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch Google Sheet (Status: ${response.status}). Please make sure the sheet is shared as "Anyone with the link can view".`
      );
    }

    const csvText = await response.text();
    if (!csvText || csvText.trim().length === 0) {
      throw new Error('The Google Sheet is empty or could not be read.');
    }

    return parseCsvToSheetData(csvText);
  } catch (error: any) {
    console.error('Google Sheets fetch error:', error);
    if (error.message?.includes('Failed to fetch')) {
      throw new Error(
        'Network error accessing Google Sheet. Ensure the sheet permission is set to "Anyone with the link can view" and try again.'
      );
    }
    throw error;
  }
}

/**
 * Robust CSV parser that handles commas inside quotes, line breaks, and whitespace.
 */
export function parseCsvToSheetData(csvText: string): ParsedSheetData {
  const lines: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentCell += '"';
        i++; // skip escaped quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentCell.trim());
      if (currentRow.some((c) => c.length > 0)) {
        lines.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    if (currentRow.some((c) => c.length > 0)) {
      lines.push(currentRow);
    }
  }

  if (lines.length === 0) {
    return { headers: [], rows: [], rawCsv: csvText };
  }

  // First non-empty row as headers
  const rawHeaders = lines[0];
  const headers = rawHeaders.map((h, idx) => (h.trim() ? h.trim() : `Column_${idx + 1}`));

  const rows: Record<string, string>[] = [];
  for (let r = 1; r < lines.length; r++) {
    const rowObj: Record<string, string> = {};
    const line = lines[r];
    let hasData = false;
    headers.forEach((header, idx) => {
      const val = line[idx] !== undefined ? line[idx] : '';
      rowObj[header] = val;
      if (val.trim()) hasData = true;
    });
    if (hasData) {
      rows.push(rowObj);
    }
  }

  return { headers, rows, rawCsv: csvText };
}

/**
 * Intelligent helper to auto-detect and map columns based on fuzzy keyword matching.
 */
export function autoDetectColumnMapping(headers: string[]): ColumnMapping {
  const mapping: ColumnMapping = {};

  const findHeader = (...keywords: string[]): string | undefined => {
    for (const kw of keywords) {
      const exact = headers.find((h) => h.toLowerCase() === kw.toLowerCase());
      if (exact) return exact;
    }
    for (const kw of keywords) {
      const partial = headers.find((h) => h.toLowerCase().includes(kw.toLowerCase()));
      if (partial) return partial;
    }
    return undefined;
  };

  mapping.studentName = findHeader('student name', 'candidate name', 'name', 'full name', 'student');
  mapping.courseName = findHeader('course name', 'course', 'program', 'subject', 'domain');
  mapping.duration = findHeader('course duration', 'duration', 'period', 'tenure');
  mapping.issueDate = findHeader('issue date', 'date', 'certificate date');
  mapping.studentContact = findHeader('contact', 'phone', 'mobile', 'student phone', 'student mobile', 'number');
  mapping.dob = findHeader('dob', 'date of birth', 'birth date', 'birth');
  mapping.bloodGroup = findHeader('blood group', 'blood', 'bg', 'bloodgroup');
  mapping.address = findHeader('address', 'location', 'city', 'native', 'residence');
  mapping.photoUrl = findHeader('photo url', 'photo', 'image', 'picture', 'avatar');
  mapping.emergencyPhone = findHeader('emergency phone', 'emergency contact', 'parent phone', 'emergency');
  mapping.role = findHeader('role', 'designation', 'position', 'intern role', 'internship role');
  mapping.prefix = findHeader('prefix', 'title', 'salutation', 'gender prefix');

  return mapping;
}
