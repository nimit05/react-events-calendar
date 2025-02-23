/* eslint-disable no-plusplus */
import { format, getISOWeek } from 'date-fns';
import dayjs from 'dayjs';
import { generateRandomId, getTotalDaysInMonth } from '../../utils/commonFunctions';
import {
  AddBookmarkFields,
  AddEventFields,
  AppointmentInfo,
  BookMarks,
  CalendarDataProps, CalendarDayInterface, CalendarEventInterface, CalendarWeekDayDetails,
} from './types';
import styles from '../index.module.scss';
import { gridClassname } from './constant';
import { Entries, SetValue } from '../../utils/types';

const todayDate = format(new Date(), 'dd-MM-yyyy');

function createArrayWithNumbers(n:number) {
  return Array.from({ length: n }, (_, index) => index + 1);
}

export function getCalendarsData(props:CalendarDataProps) {
  const {
    selectedYear, selectedMonth, eventList, analystList, publicHolidays, weekDays, weekWiseData,
  } = props;
  const totalDays = getTotalDaysInMonth(Number(selectedYear), Number(selectedMonth));

  const constructDaysArray = () => {
    const days:CalendarDayInterface[] = [];
    let dayArray:number[];
    if (weekDays && weekDays.length > 0) {
      dayArray = weekDays;
    } else {
      dayArray = createArrayWithNumbers(totalDays);
    }

    for (let i = 0; i < dayArray.length; i++) {
      const currDate = new Date(Number(selectedYear), Number(selectedMonth) - 1, dayArray[i]);
      const formattedDate = format(currDate, 'dd-MM-yyyy');
      let className = '';
      if (publicHolidays.findIndex((holiday) => Number(holiday.Date.split('-')?.[0]) === dayArray[i]) > -1) {
        className = styles.calendarRedBGColor;
      } else if (formattedDate === todayDate) {
        className = styles.calendarGreenBGColor;
      }
      const obj = {
        eventId: -1,
        showIcon: false,
        day: dayArray[i],
        className,
        unitList: [],
        eventInfoList: [],
        uniqueId: generateRandomId(),
        date: formattedDate,
      };

      days.push(obj);
    }

    return days;
  };

  const getWeekDayIndex = (val:number) => weekDays?.findIndex((day) => day === val) ?? 0;

  const eventsData = eventList?.map((event) => {
    const entry:CalendarEventInterface = {
      analystName: event?.AnalystName,
      days: [],
      analystId: event?.AnalystId,
    };

    const days = constructDaysArray();

    event.Events?.forEach((ele) => {
      const startDate = Number(ele.StartDate.split('-')?.[0]) - 1;
      const endDate = Number(ele.EndDate.split('-')?.[0]) - 1;

      const appDetails = {
        analystName: event.AnalystName,
        startDate: ele.StartDate,
        endDate: ele.EndDate,
        contact: ele.Contact,
        notes: ele.Note,
        eventId: ele.EventId,
        id: ele.Id,
      };

      const jobDetails = {
        startDate: ele.StartDate,
        endDate: ele.EndDate,
        id: ele.Id,
      };

      days[(weekWiseData ? getWeekDayIndex(startDate + 1) : startDate)].showIcon = true;

      for (let j = (weekWiseData ? getWeekDayIndex(startDate + 1) : startDate); j <= (weekWiseData ? getWeekDayIndex(endDate + 1) : endDate); j++) {
        const name = gridClassname.find((classData) => ele.EventId === classData.eventId)?.className || '';
        days[j].eventId = ele.EventId;
        days[j].className = name;

        if (ele.EventId === 4) {
          days[j].unitList.push(jobDetails);
        } else {
          days[j].eventInfoList.push(appDetails);
        }
      }
    });

    entry.days = days;
    return entry;
  });

  return analystList?.map((analyst:Entries) => {
    const ana = eventsData?.find((ele) => ele.analystId === analyst.Value);
    let days:CalendarDayInterface[] = [];

    if (ana) {
      days = ana.days;
    } else {
      days = constructDaysArray();
    }

    return {
      analystName: String(analyst.Text),
      analystId: String(analyst.Value),
      days,
    };
  });
}

function getWeekNumber(date: number, selectedYear:string, selectedMonth: string): number {
  const currDate = new Date(Number(selectedYear), Number(selectedMonth) - 1, date);
  return getISOWeek(currDate);
}

export function getWeeksData(selectedYear: string, selectedMonth: string, bookmarks:BookMarks[]) {
  let date = 1;
  const totalDays = getTotalDaysInMonth(Number(selectedYear), Number(selectedMonth));
  const data = [];
  let currentDays:CalendarWeekDayDetails[] = [];
  let lastWeek = getWeekNumber(1, selectedYear, selectedMonth);

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  while (date <= totalDays) {
    const currentWeek = getWeekNumber(date, selectedYear, selectedMonth);
    const currDate = new Date(Number(selectedYear), Number(selectedMonth) - 1, date);
    const formattedDate = format(currDate, 'dd-MM-yyyy');

    const targetedDate = date;

    let className = '';
    let bookmarkId = -1;

    const bookMark = bookmarks.find((mark) => Number(mark.Date.split('-')?.[0]) === targetedDate);

    if (bookMark) {
      className = styles.bookmarkBg;
      bookmarkId = bookMark.Id;
    } else if (todayDate === formattedDate) {
      className = styles.calendarGreenTextColor;
    } else if (currDate.getDay() === 0) {
      className = styles.calendarRedTextColor;
    } else {
      className = styles.calendarBlackTextColor;
    }

    if (currentWeek === lastWeek) {
      currentDays.push({
        date,
        day: weekDays[currDate.getDay()],
        className,
        bookmarkId,
      });
    } else {
      data.push({
        weekNumber: currentDays.length > 3 ? `Week ${lastWeek}` : '',
        days: currentDays,
      });
      currentDays = [{
        date,
        day: weekDays[currDate.getDay()],
        className,
        bookmarkId,
      }];
      lastWeek = currentWeek;
    }

    date += 1;
  }

  data.push({
    weekNumber: currentDays.length > 3 ? `Week ${lastWeek}` : '',
    days: currentDays,
  });

  return data;
}

export function assignEventvalues(setValue:SetValue, selectedEvent:AppointmentInfo) {
  const sArr = selectedEvent?.startDate?.split('-');
  const eArr = selectedEvent?.endDate?.split('-');
  const sDate = new Date(Number(sArr[2]), Number(sArr[1]) - 1, Number(sArr[0]));
  const eDate = new Date(Number(eArr[2]), Number(eArr[1]) - 1, Number(eArr[0]));

  [
    { name: AddEventFields.analystName, value: selectedEvent.analystName },
    { name: AddEventFields.event, value: selectedEvent.eventId },
    { name: AddEventFields.startDate, value: dayjs(sDate) },
    { name: AddEventFields.endDate, value: dayjs(eDate) },
    { name: AddEventFields.contact, value: selectedEvent.contact },
    { name: AddEventFields.note, value: selectedEvent.notes },

  ].forEach(({ name, value }) => setValue(name, value));
}

export function assignBookmarkValues(setValue: SetValue, selectedBookmark: BookMarks) {
  const arr = selectedBookmark?.Date?.split('-');
  const markDate = new Date(Number(arr[2]), Number(arr[1]) - 1, Number(arr[0]));

  [
    { name: AddBookmarkFields.description, value: selectedBookmark.Description },
    { name: AddBookmarkFields.bookmarkDate, value: dayjs(markDate) },
    { name: AddBookmarkFields.customer, value: selectedBookmark.CustomerId },

  ].forEach(({ name, value }) => setValue(name, value));
}

export function getDatesOfWeek(year:number, weekNumber:number) {
  const startDate = new Date(year, 0, 1);
  const firstDay = startDate.getDay();
  const daysToAdd = (weekNumber - 1) * 7 - firstDay + 1;
  const startDateOfWeek = new Date(startDate.setDate(startDate.getDate() + daysToAdd));

  const datesOfWeek = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDateOfWeek);
    currentDate.setDate(startDateOfWeek.getDate() + i);
    const date = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const day = date.split('/')?.[1];
    datesOfWeek.push(Number(day));
  }
  return datesOfWeek;
}

export function getWeekCalendarDays(selectedYear: string, selectedMonth: string, selectedWeek: number, bookmarks: BookMarks[]) {
  const dates = getDatesOfWeek(Number(selectedYear), selectedWeek);

  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return dates.map((curr) => {
    const currDate = new Date(Number(selectedYear), Number(selectedMonth) - 1, curr);

    let className = '';
    let bookmarkId = -1;

    const bookMark = bookmarks.find((mark) => Number(mark.Date.split('-')?.[0]) === curr);

    const formattedDate = format(currDate, 'dd-MM-yyyy');

    if (bookMark) {
      className = styles.bookmarkBg;
      bookmarkId = bookMark.Id;
    } else if (todayDate === formattedDate) {
      className = styles.calendarGreenTextColor;
    } else if (currDate.getDay() === 0) {
      className = styles.calendarRedTextColor;
    } else {
      className = styles.calendarBlackTextColor;
    }

    return {
      day: weekDays[currDate.getDay()], date: curr, bookmarkId, className,
    };
  });
}
