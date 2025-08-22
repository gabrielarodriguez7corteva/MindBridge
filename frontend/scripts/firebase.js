
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD3ooVnj6WUJ2iG78kIpv_qnxssNPBtmx8",
  authDomain: "mindbridge-546bc.firebaseapp.com",
  databaseURL: "https://mindbridge-546bc-default-rtdb.firebaseio.com/",
  projectId: "mindbridge-546bc",
  storageBucket: "mindbridge-546bc.appspot.com",
  messagingSenderId: "60036070803",
  appId: "1:60036070803:web:e494de9cae5ba6ebb53c66"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export function saveMood(mood) {
  const moodRef = ref(db, 'moods');
  push(moodRef, {
    mood: mood,
    timestamp: Date.now()
  });
}
