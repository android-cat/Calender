import React from 'react';
import './Calendar.css';
import { Meeting } from '../types/schedule';

interface CalendarProps {
  dates: string[];
  meetings: { [date: string]: Meeting[] };
  workingHours: { start: string; end: string };
}

const Calendar: React.FC<CalendarProps> = ({ dates, meetings, workingHours }) => {
  const slotHeight = 108;

  const generateTimeSlots = (): string[] => {
    const slots: string[] = [];
    const startHour = parseInt(workingHours.start.split(':')[0], 10);
    const endHour = parseInt(workingHours.end.split(':')[0], 10);

    for (let hour = startHour; hour <= endHour; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();
  const columnHeight = timeSlots.length * slotHeight;
  const columnStyle = {
    gridTemplateColumns: `120px repeat(${dates.length}, 301px)`
  };

  const formatDateHeader = (dateStr: string): string => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    const weekday = weekdays[date.getDay()];
    return `${month}/${day} (${weekday})`;
  };

  const getMeetingStyle = (meeting: Meeting): React.CSSProperties => {
    const startHour = parseInt(workingHours.start.split(':')[0], 10);
    const [meetingStartHour, meetingStartMinute] = meeting.start.split(':').map(Number);
    const [meetingEndHour, meetingEndMinute] = meeting.end.split(':').map(Number);

    const startOffset = (meetingStartHour - startHour) + (meetingStartMinute / 60);
    const duration = (meetingEndHour - meetingStartHour) + ((meetingEndMinute - meetingStartMinute) / 60);

    return {
      top: `${startOffset * slotHeight}px`,
      height: `${duration * slotHeight}px`,
    };
  };

  return (
    <div className="calendar-container">
      <h1 className="calendar-title">カレンダーUI</h1>
      <div className="calendar">
        <div className="calendar-header" style={columnStyle}>
          <div className="time-header" />
          {dates.map((date) => (
            <div key={date} className="date-header">
              {formatDateHeader(date)}
            </div>
          ))}
        </div>

        <div className="calendar-body">
          <div className="time-column" style={{ height: `${columnHeight}px` }}>
            {timeSlots.map((time) => (
              <div key={time} className="time-label">
                {time}
              </div>
            ))}
          </div>

          <div className="days-wrapper">
            {dates.map((date) => (
              <div
                key={date}
                className="day-column"
                style={{ height: `${columnHeight}px` }}
              >
                {timeSlots.map((time) => (
                  <div key={`${date}-${time}`} className="time-slot" />
                ))}

                {meetings[date]?.map((meeting, index) => (
                  <div
                    key={`${meeting.summary}-${index}`}
                    className="meeting"
                    style={getMeetingStyle(meeting)}
                  >
                    {meeting.summary}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
