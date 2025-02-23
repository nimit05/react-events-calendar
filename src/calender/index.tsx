import React, { useEffect, useState } from 'react';
import {
  Grid,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import AddEventModal from './components/addEventModal';
import CalenderGrid from './components/grid';
import AddPublicHolidayModal from './components/addPublicHoliday';
import { removeCalenderState, setSelectedEvent, setShowEventModal } from './redux/calenderSlice';

function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [showPublicHolidayModal, setShowPublicHolidayModal] = useState(false);
  // const [showBookmarkModal, setShowBookmarkModal] = useState(false);

  const dispatch = useDispatch();

  const handleEventModalClose = () => {
    dispatch(setShowEventModal(false));
    dispatch(setSelectedEvent(null));
  };

  useEffect(() => () => {
    dispatch(removeCalenderState());
  }, []);

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12}>
      </Grid>
      <CalenderGrid
        setSelectedDate={setSelectedDate}
        setShowPublicHolidayModal={setShowPublicHolidayModal}
        // setShowBookmarkModal={setShowBookmarkModal}
      />
      <AddEventModal
        startDate={selectedDate}
        handleClose={handleEventModalClose}
      />
      <AddPublicHolidayModal
        show={showPublicHolidayModal}
        handleClose={() => setShowPublicHolidayModal(false)}
      />
      {/* <AddBookmarkModal
        show={showBookmarkModal}
        handleClose={() => setShowBookmarkModal(false)}
      /> */}
    </Grid>
  );
}

export default Calendar;
