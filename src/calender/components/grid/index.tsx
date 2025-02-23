import {
  Card, Grid,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useMemo, useState } from 'react';
import styles from '../../index.module.scss';
import { Entries } from '../../../../Common/ComponentSelectInput/types';
import {
  getAllBookmarksStart,
  getAllEventsStart, getAllPublicHolidayStart, setSelectedAnalyst, setSelectedBookmark, setSelectedWeek, setShowEventModal,
} from '../../redux/calenderSlice';
import {
  CalendarDataProps,
  CalendarDayInterface,
  CalendarEventInterface, CalendarWeekDayDetails, CalenderGridProps, GetAllEventsQuery,
} from '../../utils/types';
import { getAnalystMasterStart } from '../../../Job/ScreenBidWorkSheetJob/redux/bidWorksheetSlice';
import CalendarFilters from '../filters';
import CustomTooltip from './customTooltip';
import CustomPopper from './customPopper';
import {
  getCalendarIcon, getCalendarsData, getDatesOfWeek, getWeekCalendarDays, getWeeksData,
} from '../../utils/helper';
import { gridClassname } from '../../utils/constant';
// import WeekCalendar from './weekCalendar';

function CalenderGrid({
  setSelectedDate,
}:CalenderGridProps) {
  const [popperVisibility, setPopperVisibility] = useState<boolean>(false);
  const [selectedEventInfo, setSelectedEventInfo] = useState<CalendarDayInterface>();
  const [showWeekCalendar, setShowWeekCalendar] = useState(false);

  const [distanceFromBottom, setDistanceFromBottom] = useState<number | null>(null);
  const [boxPosition, setBoxPosition] = useState('');
  const calculateDistance = useMemo(() => (boxId:string) => {
    setBoxPosition(boxId);
    const viewportHeight = window.innerHeight;
    const myElement = document.getElementById(boxId);
    if (myElement) {
      const distance = viewportHeight - myElement.getBoundingClientRect().bottom;
      setDistanceFromBottom(distance);
    }
  }, [boxPosition]);

  const {
    selectedMonth, selectedYear, eventList, bookmarks, publicHolidays, selectedWeek,
  } = useSelector((state:RootState) => state.CalenderReducer);
  const { analystList } = useSelector((state:RootState) => state.bidsReducer);
  const dispatch = useDispatch();

  const weeks = useMemo(() => {
    try {
      return getWeeksData(selectedYear, selectedMonth, bookmarks);
    } catch (error) {
      return [];
    }
  }, [selectedMonth, selectedYear, bookmarks]);

  const weekDays = useMemo(() => {
    try {
      if (selectedWeek) {
        return getWeekCalendarDays(selectedYear, selectedMonth, Number(selectedWeek), bookmarks);
      }
      return [];
    } catch (error) {
      return [];
    }
  }, [selectedYear, selectedWeek, bookmarks]);

  const calendarData:CalendarEventInterface[] = useMemo(() => {
    try {
      const props:CalendarDataProps = {
        selectedMonth,
        selectedYear,
        eventList,
        analystList,
        publicHolidays,
        weekWiseData: showWeekCalendar,
        weekDays: showWeekCalendar ? getDatesOfWeek(Number(selectedYear), Number(selectedWeek)) : [],
      };
      return getCalendarsData(props);
    } catch (error) {
      return [];
    }
  }, [eventList, publicHolidays, analystList, selectedWeek]);

  useEffect(() => {
    dispatch(getAnalystMasterStart());
  }, []);

  useEffect(() => {
    const payload:GetAllEventsQuery = {
      month: showWeekCalendar ? '' : selectedMonth,
      year: selectedYear,
      week: showWeekCalendar ? selectedWeek : '',
    };
    dispatch(getAllEventsStart(payload));
    dispatch(getAllBookmarksStart(payload));
    dispatch(getAllPublicHolidayStart(payload));
  }, [selectedMonth, selectedYear, selectedWeek]);

  const handleEventClick = (analystId:string, date: number) => {
    dispatch(setShowEventModal(true));
    const analyst = analystList.find((ele:Entries) => ele.Value === analystId);

    if (analyst) {
      dispatch(setSelectedAnalyst(analyst));
    }

    const currDate = new Date(Number(selectedYear), Number(selectedMonth) - 1, date);
    setSelectedDate(currDate);
  };

  const handlePopperClick = (details: CalendarDayInterface, analystId:string) => {
    const analyst = analystList.find((ele:Entries) => ele.Value === analystId);

    if (analyst) {
      dispatch(setSelectedAnalyst(analyst));
    }
    setPopperVisibility(true);
    setSelectedEventInfo(details);
    calculateDistance(analystId);
  };

  const handleBookmarkClick = (bookMarkId: number) => {
    const record = bookmarks.find((mark) => mark.Id === bookMarkId);
    if (record) {
      dispatch(setSelectedBookmark(record));
    }
    setShowBookmarkModal(true);
  };

  const handleWeekClick = (weekNumber: string) => {
    setShowWeekCalendar(true);
    setSelectedWeek(weekNumber);
    dispatch(setSelectedWeek(weekNumber.split(' ')?.[1]));
  };

  const handleWeekViewClose = () => {
    setShowWeekCalendar(false);
    setSelectedWeek('');
    dispatch(setSelectedWeek(''));
  };

  return (
    <Grid item xs={12} sm={12} md={12}>
      <div className="div_job_container_info customBodyWithoutBtnContainer">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <Card>
              <CalendarFilters
                setShowPublicHolidayModal={setShowPublicHolidayModal}
                setShowBookmarkModal={setShowBookmarkModal}
              />
              <div className={styles.mainCalendarContainer}>
                <div className={styles.mainWeekContainer}>
                  <div className={`${styles.leftCalendarBox} ${styles.analystHeadingContainer}`}>
                    <div className={styles.analystHeading}>Analyst Name</div>
                  </div>
                  {!showWeekCalendar
                    ? (
                      <div className={styles.rightCalendarBox}>
                        {weeks.map((weekData) => (
                          <div>
                            <div className={styles.weekContainer}>
                              <div
                                className={weekData?.weekNumber !== '' ? styles.weekTab : `${styles.weekTab} ${styles.blankWeekTab}`}
                                onClick={() => handleWeekClick(weekData?.weekNumber)}
                              >
                                {weekData?.weekNumber}
                              </div>
                            </div>
                            <div className={styles.topDaysContainer}>
                              {weekData.days.map((currDayDetails:CalendarWeekDayDetails) => (
                                <div
                                  className={currDayDetails.className}
                                  onClick={() => {
                                    if (currDayDetails.className === styles.bookmarkBg) {
                                      handleBookmarkClick(currDayDetails.bookmarkId);
                                    }
                                  }}
                                >
                                  <div className={`${styles.analystCell} ${styles.calenderDateCell}`}>
                                    {currDayDetails.date}
                                  </div>
                                  <div className={`${styles.analystCell} ${styles.calenderDayCell}`}>{currDayDetails.day}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                    : (
                      <div className={`${styles.rightCalendarBox} ${styles.weekFullWidth}`}>
                        <div className={styles.weekBoxContainer}>
                          <div className={styles.weekContainer}>
                            <div className={styles.weekTab} onClick={handleWeekViewClose}>
                              {`Week ${selectedWeek}`}
                            </div>
                          </div>
                          <div className={styles.topDaysContainer}>
                            {weekDays?.map((currDayDetails) => (
                              <div
                                className={`${styles.analystCell} ${styles.calenderDateCell} ${currDayDetails.className}`}
                                onClick={() => {
                                  if (currDayDetails.className === styles.bookmarkBg) {
                                    handleBookmarkClick(currDayDetails.bookmarkId);
                                  }
                                }}
                              >
                                {currDayDetails.date}
                                {' '}
                                {currDayDetails.day}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                </div>
                <div className={styles.analystContainer}>
                  {calendarData?.map((data) => (
                    <div className={styles.anaylistCalendarDateBox}>
                      <div className={styles.leftCalendarBox}>
                        {data.analystName}
                      </div>
                      <div className={`customCalendarTooltip ${styles.rightCalendarBox}
                      ${showWeekCalendar ? styles.weekFullWidth : ''}`}
                      >
                        {data.days.map((ele) => (
                          ele.eventId > 0 ? (
                            <>
                              <CustomTooltip
                                content={`${gridClassname[ele.eventId - 1]?.eventName}`}
                                TooltipBgColor="custom-tooltip-red"
                                TooltipBorderColor="#00A751"
                                isWeekFullWidth={showWeekCalendar}
                              >
                                <div
                                  className={`${styles.analystCell} ${ele.className} ${styles.calendarBoxIcon}
                                  ${showWeekCalendar ? styles.wdth100 : ''}`}
                                  onClick={() => {
                                    handlePopperClick(ele, data?.analystId);
                                  }}
                                  id={data?.analystId}
                                >
                                  <img src={getCalendarIcon(ele.eventId)} width={30} height={30} alt="Icons" />
                                </div>
                              </CustomTooltip>
                              {selectedEventInfo && selectedEventInfo?.uniqueId === ele?.uniqueId && (
                                <CustomPopper
                                  show={popperVisibility}
                                  eventInfo={selectedEventInfo}
                                  handleClose={() => setPopperVisibility(false)}
                                  calenderDay={ele.day}
                                  distanceFromBottom={distanceFromBottom !== null ? distanceFromBottom : 0}
                                />
                              )}
                            </>
                          ) : (
                            <div
                              className={`${styles.analystCell}  ${ele.className}`}
                              onClick={() => {
                                handleEventClick(data?.analystId, ele?.day);
                              }}
                            />
                          )))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}

export default CalenderGrid;
