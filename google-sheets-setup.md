# Google Sheets Integration Guide

To save form submissions directly to a free Google Sheet without any backend server or Firebase, follow these steps:

## 1. Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet.
2. Name it something like "MECOGEN VBS Donations".
3. In the first row, add the following headers EXACTLY as written (case-sensitive):
   - Cell A1: `Timestamp`
   - Cell B1: `Name`
   - Cell C1: `Mobile`
   - Cell D1: `Place`
   - Cell E1: `Amount`

## 2. Add Google Apps Script
1. In your Google Sheet, click on **Extensions > Apps Script** in the top menu.
2. Delete any existing code and paste the following script:

```javascript
const SHEET_NAME = "Sheet1"; // Change if your sheet name is different

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    const timestamp = new Date();
    const name = e.parameter.Name || "";
    const mobile = e.parameter.Mobile || "";
    const place = e.parameter.Place || "";
    const amount = e.parameter.Amount || "";

    sheet.appendRow([timestamp, name, mobile, place, amount]);

    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 3. Deploy as a Web App
1. Click the **Deploy** button at the top right of the Apps Script editor, then select **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set the following options:
   - **Description**: Form Handler
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click **Deploy**.
5. You will be prompted to authorize access. Click "Review permissions" and authorize it with your Google account. (You may see a warning saying "Google hasn't verified this app." Click "Advanced" -> "Go to... (unsafe)").
6. After authorization, you will be given a **Web app URL**. Copy this URL.

## 4. Connect to Your Website
1. Open `/src/App.tsx` in your code editor.
2. Search for `const GOOGLE_SCRIPT_URL = ""` and paste your copied URL between the quotes.
3. The form will now automatically send submissions to your Google Sheet!
