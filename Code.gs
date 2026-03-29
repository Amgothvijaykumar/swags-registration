// Google Apps Script - GFG T-Shirt Registration
// Deploy as Web App: Execute as "Me", Access "Anyone"

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Parse incoming JSON data
  var data = JSON.parse(e.postData.contents);
  var rollNumber = data.rollNumber ? data.rollNumber.toString().trim().toUpperCase() : "";
  var name = data.name ? data.name.toString().trim() : "";
  var year = data.year ? data.year.toString().trim() : "";
  var size = data.size ? data.size.toString().trim() : "";

  // Validate inputs
  if (!rollNumber || !name || !year || !size) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: "All fields are required." }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Check for duplicate roll number
  var lastRow = sheet.getLastRow();
  if (lastRow >= 2) {
    var rollNumbers = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (var i = 0; i < rollNumbers.length; i++) {
      if (rollNumbers[i][0].toString().trim().toUpperCase() === rollNumber) {
        return ContentService
          .createTextOutput(JSON.stringify({ status: "duplicate", message: "This roll number has already been registered!" }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
  }

  // Setup header row if sheet is empty
  if (lastRow === 0 || (lastRow === 1 && sheet.getRange(1, 1).getValue() === "")) {
    sheet.getRange(1, 1, 1, 5).setValues([["Roll Number", "Name", "Year", "T-Shirt Size", "Timestamp"]]);
    sheet.getRange(1, 1, 1, 5).setFontWeight("bold");
    sheet.getRange(1, 1, 1, 5).setBackground("#1e7e34");
    sheet.getRange(1, 1, 1, 5).setFontColor("#ffffff");
  }

  // Append the new registration
  var timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  sheet.appendRow([rollNumber, name, year, size, timestamp]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: "success", message: "Registration successful! 🎉" }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: handle GET for health check / browser testing
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "GFG T-Shirt Registration API is running." }))
    .setMimeType(ContentService.MimeType.JSON);
}
