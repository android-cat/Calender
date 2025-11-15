export interface Meeting {
  summary: string;
  start: string;
  end: string;
  timezone: string;
}

export interface WorkingHours {
  start: string;
  end: string;
}

export interface ScheduleData {
  working_hours: WorkingHours;
  meetings: {
    [date: string]: Meeting[];
  };
}
