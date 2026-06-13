# 📩 Enquiry Form Setup (Google Apps Script)

This makes your website's enquiry forms **save every lead to a Google Sheet** and
**email you + auto-reply to the student** — with no server and no cost.

You only do this once (~10 minutes).

---

## Step 1 — Create the Google Sheet
1. Go to <https://sheets.google.com> and create a **blank spreadsheet**.
2. Name it e.g. **"Pioneer Coaching — Enquiries"**.

## Step 2 — Add the script
1. In that sheet: menu **Extensions → Apps Script**.
2. Delete whatever is in the editor.
3. Open `apps-script/Code.gs` from this project, copy **everything**, and paste it in.
4. In the `CONFIG` block at the top, set:
   - `adminEmail` → the email where you want to receive enquiries.
   - (Phone / name are already filled for Pioneer Coaching.)
5. Click **Save** 💾.

## Step 3 — Deploy as a Web App
1. Top-right: **Deploy → New deployment**.
2. Click the gear ⚙️ next to "Select type" → choose **Web app**.
3. Set:
   - **Description:** Enquiry endpoint
   - **Execute as:** **Me**
   - **Who has access:** **Anyone**
4. Click **Deploy**.
5. Google will ask you to **authorize** — allow it (it's your own script).
6. Copy the **Web app URL** (it ends with `/exec`).

> Tip: paste that URL into a browser — you should see
> `{"ok":true,"service":"Pioneer Coaching enquiry endpoint is running."}`

## Step 4 — Connect the website
1. Open `js/main.js`.
2. Find `enquiryEndpoint: ''` near the top.
3. Paste your URL inside the quotes:
   ```js
   enquiryEndpoint: 'https://script.google.com/macros/s/AKfy.../exec'
   ```
4. Save. Done! 🎉

---

## How it behaves
- **Endpoint set:** form submits silently → row added to Sheet → you get an email →
  student gets a "thank you" auto-reply (if they entered an email).
- **Endpoint blank:** form falls back to opening **WhatsApp** pre-filled (so the site
  always works, even before setup).
- If the online send ever fails, it automatically offers WhatsApp instead.

## Updating the script later
If you edit `Code.gs`, redeploy: **Deploy → Manage deployments → ✏️ Edit →
Version: New version → Deploy**. The URL stays the same.

## Where leads land
Every enquiry is a row in the **Enquiries** tab of your sheet:
`Timestamp · Name · Phone · Email · Course · Message · Source Page`
