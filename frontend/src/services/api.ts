import axios from 'axios';
import { ScheduleData } from '../types/schedule';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const fetchMeetings = async (): Promise<ScheduleData> => {
  const response = await axios.get<ScheduleData>(`${API_URL}/api/meetings`);
  return response.data;
};
