const express = require('express');
const admin = require('firebase-admin');
const app = express();
app.use(express.json());

const serviceAccount = require('./mindbridge-546bc-firebase-adminsdk-fbsvc-deaab58c95.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mindbridge-546bc-default-rtdb.firebaseio.com"
});

const db = admin.database();

// Test route

app.post('/test-firebase', (req, res) => {
  const testRef = db.ref('test');
  testRef.push({
    message: 'Hello from Render!',
    timestamp: Date.now()
  });
  res.send('Firebase connection successful!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
