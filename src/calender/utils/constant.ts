import * as Yup from 'yup';
import dayjs from 'dayjs';
import styles from '../index.module.scss';

export const months = [
  { Text: 'January', Value: '1' },
  { Text: 'February', Value: '2' },
  { Text: 'March', Value: '3' },
  { Text: 'April', Value: '4' },
  { Text: 'May', Value: '5' },
  { Text: 'June', Value: '6' },
  { Text: 'July', Value: '7' },
  { Text: 'August', Value: '8' },
  { Text: 'September', Value: '9' },
  { Text: 'October', Value: '10' },
  { Text: 'November', Value: '11' },
  { Text: 'December', Value: '12' },
];

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1100,
  height: 'auto',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: '6px',
  boxShadow: 24,
  p: '6px 24px 24px 24px',
  '@media (max-width: 1200px)': {
    width: '95%',
    height: 'auto',
    p: 2,
  },
};

export const smallModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 'auto',
  bgcolor: 'background.paper',
  borderRadius: '6px',
  boxShadow: 24,
  p: 5,
  '@media (max-width: 768px)': {
    width: '90%',
    height: 'auto',
    p: 2,
  },
};

export const gridClassname = [
  {
    className: styles.vacationColor,
    eventId: 1,
    eventName: 'Vaction',
  },
  {
    className: styles.sickLeaveColor,
    eventId: 2,
    eventName: 'Sick Leave',
  },
  {
    className: styles.appointmentColor,
    eventId: 3,
    eventName: 'Appointment',
  },
  {
    className: styles.jobScheduleColor,
    eventId: 4,
    eventName: 'Job Scheduled',
  },
];

const dayjsObject = Yup.mixed().test({
  name: 'isDayjs',
  message: 'Invalid date',
  test: (value) => dayjs.isDayjs(value),
});

export const addEventSchema = Yup.object({
  analystName: Yup.string(),
  event: Yup.string().required('Event is required'),
  startDate: dayjsObject.required('Start Date is required'),
  endDate: dayjsObject.required('End Date is required'),
  contact: Yup.string(),
  note: Yup.string(),
});

export const addBookmarkSchema = Yup.object({
  bookmarkDate: dayjsObject.required('Date is required'),
  customer: Yup.string().required('Customer is required'),
  description: Yup.string().required('Description is required'),
});

export const addPublicHolidaySchema = Yup.object({
  holidayDate: dayjsObject.required('Date is required'),
  note: Yup.string().required('Note is required'),
});
