# Deploy guide - Orchard House floor plan demo

Goal: a shareable URL (GitHub Pages) where everyone who opens it sees the **same**
notes (Firebase Firestore).

There are two one-time setups: **Firebase** (shared notes) and **GitHub Pages**
(hosting). Do Firebase first so the live site has working notes immediately.

---

## Part A - Firebase (shared notes), ~10-15 min

1. Go to https://console.firebase.google.com and **Add project** (any name, e.g.
   `orchard-house-demo`). Google Analytics is not needed - turn it off.
2. In the project, left sidebar -> **Build -> Firestore Database** -> **Create database**.
   - Start in **production mode** (we set rules below).
   - Pick a location near you (e.g. `us-west`).
3. Set security rules: Firestore -> **Rules** tab -> paste the contents of
   `firestore.rules` (in this folder) -> **Publish**.
   - This lets anyone with the link read/write notes (no login). Fine for a family
     demo; tighten later if you want.
4. Get your web config: gear icon -> **Project settings** -> scroll to **Your apps** ->
   click the **web** icon `</>` -> register an app (nickname `floorplan`, do NOT enable
   Hosting) -> copy the `firebaseConfig` object it shows.
5. Open `firebase-config.js` in this folder and paste your real values over the
   `REPLACE_ME` placeholders. Save.

   (This config is **not** secret - it ships in the browser. Access is controlled by the
   rules in step 3.)

6. Test locally: from this folder run `python3 -m http.server 8000`, open
   http://localhost:8000, click a room, add a note. Open the same URL in a second
   browser/incognito window - the note should appear in both. If it does, notes are
   shared.

---

## Part B - GitHub repo + Pages (hosting), ~5 min

This folder is already a git repo with an initial commit. You just need to create an
**empty** GitHub repo and push to it.

1. On https://github.com -> **New repository**. Name it (e.g. `orchard-house-floorplan`).
   - **Public** (required for free GitHub Pages), OR Private if you have GitHub Pro.
   - Do **not** add a README, .gitignore, or license (keep it empty).
2. Connect and push (replace `<you>` and `<repo>`):

   ```sh
   cd floorplan-demo
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```

   (If prompted to log in, use your GitHub account / a personal access token.)
3. Enable Pages: repo **Settings -> Pages** -> Source: **Deploy from a branch** ->
   Branch: **main**, folder: **/ (root)** -> **Save**.
4. Wait ~1 minute. Your URL appears at the top of the Pages settings:

   ```
   https://<you>.github.io/<repo>/
   ```

   That is the link to share. Anyone who opens it sees the plan, the images, and the
   shared notes.

---

## Updating the site later

Edit files here, then:

```sh
git add -A
git commit -m "update plan"
git push
```

GitHub Pages redeploys automatically in ~1 minute.

---

## Heads up

- **Public site:** a public repo + Pages means the floor plan and renders are visible to
  anyone with the link (and potentially search engines). For a family home demo that's
  usually fine - just know it's not private.
- **Open notes:** with the rules above, anyone with the link can add/delete notes. Good
  enough for trusted family sharing.
- **No Firebase config = on-device notes:** if you deploy before finishing Part A, the
  site still works but notes are per-device (not shared) until you fill `firebase-config.js`.
