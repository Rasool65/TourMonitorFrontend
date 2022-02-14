import '@styles/react/libs/modern-date-picker/modern-date-picker.scss';

import { FunctionComponent, useState } from 'react';
import { Calendar, Day, DayRange, DayValue } from 'react-modern-calendar-datepicker';

const CalendarSg: FunctionComponent = () => {
  const [day, setDay] = useState<DayValue>(null);
  const [dayRange, setDayRange] = useState<DayRange>({
    from: null,
    to: null,
  });
  const [days, setDays] = useState<Day[]>([]);

  return (
    <>
      <Calendar value={day} onChange={setDay} locale="fa" />
      <br />
      <Calendar value={dayRange} onChange={setDayRange} locale="fa" />
    </>
  );
};

export default CalendarSg;
