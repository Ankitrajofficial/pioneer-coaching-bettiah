/**
 * Pioneer Coaching — Enquiry backend (Google Apps Script)
 * --------------------------------------------------------
 * What it does when a student submits the website form:
 *   1. Saves the enquiry as a new row in the bound Google Sheet.
 *   2. Emails YOU (the coaching) a notification.
 *   3. Sends the student an auto-reply confirmation (if they gave an email).
 *
 * SETUP (see SETUP-ENQUIRY.md for screenshots/steps):
 *   1. Create a Google Sheet → Extensions → Apps Script.
 *   2. Paste this whole file in, replacing the default Code.gs.
 *   3. Edit the CONFIG block below (your email + coaching details).
 *   4. Deploy → New deployment → type "Web app" →
 *        Execute as: Me      Who has access: Anyone
 *   5. Copy the Web App URL (ends in /exec) and paste it into
 *      js/main.js  ->  PIONEER.enquiryEndpoint
 */

// ===== CONFIG — edit these =====
const CONFIG = {
  adminEmail: 'rahl43k@gmail.com',          // where new enquiries are sent
  coachingName: 'Pioneer Coaching',
  coachingPhone: '062021 49922',
  whatsapp: '916202149922',
  sheetName: 'Enquiries',                    // tab name inside the spreadsheet
  sendAutoReply: true                        // email the student a confirmation
};

const HEADERS = ['Timestamp', 'Name', 'Phone', 'Email', 'Course', 'Message', 'Source Page'];

// ===== Main entry point (website POSTs here) =====
function doPost(e) {
  try {
    const p = (e && e.parameter) ? e.parameter : {};
    const data = {
      name:    (p.name    || '').toString().trim(),
      phone:   (p.phone   || '').toString().trim(),
      email:   (p.email   || '').toString().trim(),
      course:  (p.course  || '').toString().trim(),
      message: (p.message || '').toString().trim(),
      page:    (p.page    || '').toString().trim()
    };

    if (!data.name || !data.phone) {
      return json({ ok: false, error: 'Name and phone are required.' });
    }

    saveRow_(data);
    notifyAdmin_(data);
    if (CONFIG.sendAutoReply && isEmail_(data.email)) autoReply_(data);

    return json({ ok: true, message: 'Enquiry received. We will contact you soon.' });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// Simple GET so you can confirm the deployment is live in a browser.
function doGet() {
  return json({ ok: true, service: 'Pioneer Coaching enquiry endpoint is running.' });
}

// ===== Helpers =====
function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(CONFIG.sheetName);
  if (!sh) sh = ss.insertSheet(CONFIG.sheetName);
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}

function saveRow_(d) {
  getSheet_().appendRow([new Date(), d.name, d.phone, d.email, d.course, d.message, d.page]);
}

function notifyAdmin_(d) {
  const subject = '📩 New Enquiry — ' + d.name + ' (' + (d.course || 'General') + ')';
  const body =
    'New enquiry from the ' + CONFIG.coachingName + ' website:\n\n' +
    'Name:    ' + d.name + '\n' +
    'Phone:   ' + d.phone + '\n' +
    'Email:   ' + (d.email || '—') + '\n' +
    'Course:  ' + (d.course || '—') + '\n' +
    'Message: ' + (d.message || '—') + '\n' +
    'Page:    ' + (d.page || '—') + '\n\n' +
    'Call back: ' + d.phone + '\n' +
    'WhatsApp: https://wa.me/91' + d.phone.replace(/\D/g, '').replace(/^91/, '');
  MailApp.sendEmail({
    to: CONFIG.adminEmail,
    subject: subject,
    body: body,
    replyTo: isEmail_(d.email) ? d.email : CONFIG.adminEmail
  });
}

function autoReply_(d) {
  const subject = 'Thank you for contacting ' + CONFIG.coachingName;
  const body =
    'Dear ' + d.name + ',\n\n' +
    'Thank you for your interest in ' + CONFIG.coachingName + '. ' +
    'We have received your enquiry' + (d.course ? ' for ' + d.course : '') + ' and our team will contact you shortly.\n\n' +
    'If it is urgent, call or WhatsApp us at ' + CONFIG.coachingPhone + '.\n\n' +
    'Warm regards,\n' + CONFIG.coachingName + '\nBettiah, Bihar';
  MailApp.sendEmail({ to: d.email, subject: subject, body: body, name: CONFIG.coachingName });
}

function isEmail_(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s || '');
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
