// Firebase web config for shared notes.
//
// Paste the config object from your Firebase project here:
//   Firebase console -> Project settings (gear) -> "Your apps" -> Web app -> Config.
//
// NOTE: this is NOT a secret. Firebase web config is meant to be public and shipped
// in the browser. Access is controlled by Firestore security rules, not by hiding this.
//
// Until the apiKey below is replaced with your real one, the app automatically falls
// back to on-device notes (localStorage) so it still works locally.
window.FIREBASE_CONFIG = {
  apiKey: "REPLACE_ME",
  authDomain: "REPLACE_ME.firebaseapp.com",
  projectId: "REPLACE_ME",
  storageBucket: "REPLACE_ME.appspot.com",
  messagingSenderId: "REPLACE_ME",
  appId: "REPLACE_ME",
};
