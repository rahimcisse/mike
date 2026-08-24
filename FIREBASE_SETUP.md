# Firebase Setup Guide for StakeVisionBet

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `stakevisionbet`
4. Continue through the setup (disable Google Analytics if you want)
5. Click **"Create project"**

## Step 2: Get Your Firebase Configuration

1. In your Firebase project, click the gear icon ⚙️ → **Project Settings**
2. Scroll to **"Your apps"** section
3. Click **Web** icon (or `</>` symbol) if you haven't created a web app yet
4. Register app with nickname: `StakeVisionBet Web`
5. Copy the Firebase config object that looks like:
```javascript
{
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
}
```

## Step 3: Update firebase-config.js

Open [firebase-config.js](firebase-config.js) and replace the placeholder values:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",                    // Copy from Firebase
  apiKey: "AIzaSyD9R-VHVuAvTs8g3ybobSczdeLYf7q8HEg",
  authDomain: "stakevisionbet-12345.firebaseapp.com",
  projectId: "stakevisionbet-12345",
  storageBucket: "stakevisionbet-12345.firebasestorage.app",
  messagingSenderId: "545975308421",
  appId: "1:545975308421:web:aae58522940c3311a5d9ec",
  measurementId: "G-8YR04C6EXX"
};
```

## Step 4: Enable Firestore Database

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click **"Create Database"**
3. Choose location (closest to you) and click **"Enable"**
4. **Important**: Set Security Rules to allow public write/read for development:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ Security Note**: This allows anyone to modify your data. For production, add authentication!

## Step 5: Deploy to Netlify

1. Create a `netlify.toml` file in your project root:
```toml
[build]
  publish = "."
  command = "# No build needed - static files"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. Push your project to GitHub
3. In Netlify:
   - Click **"Add new site"** → **"Import an existing project"**
   - Select your GitHub repo
   - Deploy!

## Step 6: Test Locally (Optional)

Run a simple HTTP server:
```bash
python -m http.server 8000
# or
npx http-server
```

Then visit `http://localhost:8000/dashboard.html`

## Files Modified

- ✅ **firebase-config.js** - Firebase configuration (YOU NEED TO UPDATE THIS!)
- ✅ **program-data-firebase.js** - Uses Firebase instead of file system
- ✅ **dashboard.html** - Updated to use Firebase
- ✅ **acca.html, draw.html, correct.html, elite.html, golden.html, nba.html** - All updated

## How It Works

1. **Saving Data**: When you edit cards in dashboard and click save, data goes to Firestore
2. **Loading Data**: When you visit any page, it fetches data from Firestore
3. **Export/Import**: Still works with local JSON files for backup/restore
4. **Offline**: Falls back to local defaults if Firebase is unavailable

## Troubleshooting

### "Firebase not initialized" error
- Make sure `firebaseConfig` values are correct
- Check browser console for Firebase initialization errors

### Data not saving
- Check Firestore Security Rules (should allow read/write)
- Verify your `projectId` is correct

### 404 on Netlify
- Make sure `netlify.toml` is in project root
- Redirection rule should route all to index.html

Need help? Check the [Firebase documentation](https://firebase.google.com/docs/)
