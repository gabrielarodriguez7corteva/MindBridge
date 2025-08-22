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


app.get('/test-firebase', (req, res) => {
  res.send('Firebase test route is working!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
// Export the app for testing purposes
module.exports = app;
// Export the database for use in other modules
module.exports.db = db;
// Export the admin instance for use in other modules
module.exports.admin = admin; 



