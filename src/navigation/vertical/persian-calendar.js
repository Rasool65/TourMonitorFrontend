// ** Icons Import
import { PERSIAN_CALENDAR1, PERSIAN_CALENDAR_MODERN } from '@src/configs/urls';
import { Calendar, Circle } from 'react-feather';

export default [
  {
    header: 'Charts',
  },
  {
    id: 'persianCalendar',
    title: 'persianCalendar',
    badge: 'light-danger',
    badgeText: '0',
    icon: <Calendar size={20} />,
    children: [
      {
        id: 'calender1',
        title: 'Calender1',
        icon: <Circle size={12} />,
        navLink: PERSIAN_CALENDAR1,
      },
      {
        id: 'calendar-modern',
        title: 'CalendarModern',
        icon: <Circle size={12} />,
        navLink: PERSIAN_CALENDAR_MODERN,
      },
      {
        id: 'recharts',
        title: 'Recharts',
        icon: <Circle size={12} />,
        navLink: '/charts/recharts',
      },
    ],
  },
];
