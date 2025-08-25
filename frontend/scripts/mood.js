
import { saveMood } from './firebase.js';

const moodCounts = {
  Happy: 0,
  Sad: 0,
  Anxious: 0,
  Calm: 0,
  Angry: 0
};

const ctx = document.getElementById('moodChart').getContext('2d');
const moodChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: Object.keys(moodCounts),
    datasets: [{
      label: 'Mood Frequency',
      data: Object.values(moodCounts),
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

// Example: simulate mood selection and update chart
function trackMood(mood) {
  if (moodCounts.hasOwnProperty(mood)) {
    moodCounts[mood]++;
    moodChart.data.datasets[0].data = Object.values(moodCounts);
    moodChart.update();
    saveMood(mood);
    //alert(`Mood "${mood}" saved and chart updated.`);
  }
}

// For testing: call trackMood with a sample mood
window.trackMood = trackMood;
