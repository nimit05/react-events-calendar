import React, { useMemo } from 'react';
import {
  Button,
  Grid, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../index.module.scss';
import { RootState } from '../../../../redux/rootState';
import { months } from '../../utils/constant';
import { Entries } from '../../../../Common/ComponentSelectInput/types';
import { setSelectedMonth, setSelectedYear } from '../../redux/calenderSlice';
import { CalenderFilterProps } from '../../utils/types';

export default function CalendarFilters({ setShowPublicHolidayModal, setShowBookmarkModal }:CalenderFilterProps) {
  const { selectedMonth, selectedYear } = useSelector((state: RootState) => state.CalenderReducer);
  // const [selectedZone, setSelectedZone] = useState('');

  const dispatch = useDispatch();

  const currentYear = useMemo(() => {
    const currentDate = new Date();
    return currentDate.getFullYear();
  }, []);

  const years: Entries[] = useMemo(() => {
    const arr = Array.from({ length: currentYear - 1999 }, (_, index) => index + 2000);

    return arr.map((ele) => ({
      Text: String(ele),
      Value: String(ele),
    }));
  }, []);

  const handleSelectedMonth = (value: string) => {
    dispatch(setSelectedMonth(value));
  };

  const handlePublicHolidayModal = () => {
    setShowPublicHolidayModal(true);
  };

  const handleBookmarkModal = () => {
    setShowBookmarkModal(true);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <div className={styles.labellingContainer}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Button className={styles.themeBtn} onClick={() => { handlePublicHolidayModal(); }}>
                Public Holidays
              </Button>
              <Button className={styles.themeBtn} onClick={() => { handleBookmarkModal(); }}>
                Add Bookmark
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <div className={styles.labellingBox}>
                <div className={styles.calendarLabelling}>
                  Job Schedule
                  <span className={styles.jobScheduleColor} />
                </div>
                <div className={styles.calendarLabelling}>
                  Appointment
                  <span className={styles.appointmentColor} />
                </div>
                <div className={styles.calendarLabelling}>
                  Sick-Leave
                  <span className={styles.sickLeaveColor} />
                </div>
                <div className={styles.calendarLabelling}>
                  Vacation
                  <span className={styles.vacationColor} />
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container spacing={2} className={styles.calendarDropdownFilterBox}>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <label>
              Zone
            </label>
            <Select
              className={styles.customCalendarFilterSelect}
              size="small"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: '220px', // Adjust the max height value as needed
                    maxWidth: '220px',
                  },
                },
              }}
            >
              <MenuItem className="menu-item-enter" value="all zone">
                All Zone
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <label>
              Analyst
            </label>
            <Select
              className={styles.customCalendarFilterSelect}
              size="small"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: '220px', // Adjust the max height value as needed
                    maxWidth: '220px',
                  },
                },
              }}
            >
              <MenuItem className="menu-item-enter">
                All Analyst
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <label>
              Month
            </label>
            <Select
              size="small"
              value={selectedMonth}
              className={styles.customCalendarFilterSelect}
              onChange={(event: SelectChangeEvent<string | string>) => handleSelectedMonth(event.target.value)}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: '220px', // Adjust the max height value as needed
                    maxWidth: '220px',
                  },
                },
              }}
            >
              {months.map((item: Entries) => (
                <MenuItem className="menu-item-enter" value={item.Value} key={item.Value}>
                  {item.Text}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <label>
              Year
            </label>
            <Select
              size="small"
              value={selectedYear}
              className={styles.customCalendarFilterSelect}
              onChange={(event: SelectChangeEvent<string | string>) => dispatch(setSelectedYear(event.target.value))}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: '220px', // Adjust the max height value as needed
                    maxWidth: '220px',
                  },
                },
              }}
            >
              {years.map((item: Entries) => (
                <MenuItem className="menu-item-enter" value={item.Value} key={item.Value}>
                  {item.Text}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
