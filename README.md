# GFG T-Shirt Registration Website

A clean, dark-themed registration form for collecting GFG t-shirt preferences. Data is stored in Google Sheets and duplicate roll numbers are rejected automatically.

---

## Setup (Do this first — takes ~5 minutes)

### Step 1 — Create your Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a **new spreadsheet**
2. Rename it e.g. `GFG T-Shirt Registrations`
3. Leave it open

### Step 2 — Add the Apps Script backend

1. In your Google Sheet, click **Extensions → Apps Script**
2. Delete all default code in the editor
3. Copy the contents of [`Code.gs`](./Code.gs) from this repo and paste it in
4. Click **Save** (💾)

### Step 3 — Deploy as a Web App

1. Click **Deploy → New deployment**
2. Click the ⚙️ gear icon next to "Type" → select **Web app**
3. Set:
   - **Description**: `GFG T-Shirt Registration API`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
4. Click **Deploy** → Authorize if prompted
5. **Copy the Web App URL** (looks like `https://script.google.com/macros/s/XXXX/exec`)

### Step 4 — Add the URL to the website

1. Open `index.html` in a text editor
2. Find this line (around line 210):
   ```js
   const APPS_SCRIPT_URL = "YOUR_APPS_SCRIPT_URL_HERE";
   ```
3. Replace `YOUR_APPS_SCRIPT_URL_HERE` with the URL you copied
4. Save the file

---

## Deployment (GitHub Pages)

```bash
# From the project folder:
git init
git add .
git commit -m "Initial commit: GFG T-shirt registration site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/registrations.git
git push -u origin main
```

Then in GitHub → your repo → **Settings → Pages** → Source: `main` / `/ (root)` → **Save**

Your site will be live at:
```
https://YOUR_USERNAME.github.io/registrations/
```

---

## How it works

| Feature | How |
|---|---|
| Form submission | `fetch()` POST → Apps Script Web App |
| Duplicate check | Script scans column A for matching roll numbers |
| Data storage | Appended as new row in Google Sheet |
| Timestamp | Auto-generated in IST timezone |
| Hosting | GitHub Pages (free, static) |

---

## Project Structure

```
registrations/
├── index.html   ← Frontend (form + styling + JS)
├── Code.gs      ← Google Apps Script (paste into your Sheet)
└── README.md    ← This file
```
