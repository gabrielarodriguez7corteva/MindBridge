// frontend/src/components/MoodTracker.js
import { Line } from 'react-chartjs-2';

const MoodTracker = () => {
  const [moodData, setMoodData] = useState([]);
  
  const trackMood = (mood, notes) => {
    const entry = {
      timestamp: new Date(),
      mood: mood, // 1-5 scale
      notes: notes,
      factors: detectFactors(notes) // AI to identify triggers
    };
    
    // Save to Firebase
    saveMoodEntry(entry);
    
    // Update visualization
    setMoodData([...moodData, entry]);
  };
  
  return (
    <div className="mood-tracker">
      <MoodSelector onSelect={trackMood} />
      <Line data={formatChartData(moodData)} />
      <InsightsSummary data={moodData} />
    </div>
  );
};