import { saveMood } from './firebase.js';

const ctx = document.getElementById('moodChart').getContext('2d');
const moodChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Happy', 'Sad', 'Anxious', 'Calm', 'Angry'],
    datasets: [{
      label: 'Mood Frequency',
      data: [5, 2, 3, 4, 1],
      backgroundColor: [
        '#82B74B',
        '#6B5B95',
        '#88B0D3',
        '#F7F7F7',
        '#333333'
      ]
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// Example: Save a mood when user selects one
function trackMood(mood) {
  saveMood(mood); // Send to Firebase
  alert(`Mood "${mood}" saved!`);
}
