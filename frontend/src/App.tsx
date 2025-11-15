import React, { useEffect, useState } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import { fetchMeetings } from './services/api';
import { ScheduleData } from './types/schedule';

// Calendar display configuration
const CALENDAR_START_DATE = '2021-03-22';
const CALENDAR_DAYS_TO_SHOW = 3;

/**
 * Generate array of consecutive dates starting from a given date
 */
const generateDateRange = (startDate: string, days: number): string[] => {
  const dates: string[] = [];
  const start = new Date(startDate);
  
  for (let i = 0; i < days; i++) {
    const current = new Date(start);
    current.setDate(start.getDate() + i);
    dates.push(current.toISOString().split('T')[0]);
  }
  
  return dates;
};

function App() {
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMeetings = async () => {
      try {
        const data = await fetchMeetings();
        setScheduleData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load meetings');
        setLoading(false);
        console.error('Error fetching meetings:', err);
      }
    };

    loadMeetings();
  }, []);

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p>読み込み中...</p>
      </div>
    );
  }

  if (error || !scheduleData) {
    return (
      <div className="app-error">
        <p>{error || 'データの読み込みに失敗しました'}</p>
      </div>
    );
  }

  // Generate date range from constant configuration
  const dates = generateDateRange(CALENDAR_START_DATE, CALENDAR_DAYS_TO_SHOW);

  return (
    <div className="App">
      <Calendar
        dates={dates}
        meetings={scheduleData.meetings}
        workingHours={scheduleData.working_hours}
      />
    </div>
  );
}

export default App;
