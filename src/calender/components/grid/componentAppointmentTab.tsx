import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../index.module.scss';
import { DeleteIcon, EditIcon } from '../../../../assets/TableIcons';
import UserIcon from '../../../../assets/Icons/userIcon.svg';
import { AppointmentInfo, DeleteEventPayload, EventAppointmentProps } from '../../utils/types';
import { gridClassname } from '../../utils/constant';
import { deleteEventStart, setSelectedEvent, setShowEventModal } from '../../redux/calenderSlice';
import { RootState } from '../../../../redux/rootState';

function ComponentAppointmentTab({ appointmentDetails, currentDate }:EventAppointmentProps) {
  const dispatch = useDispatch();
  const { selectedMonth, selectedYear } = useSelector((state:RootState) => state.CalenderReducer);

  const handleEdit = (detail:AppointmentInfo) => {
    dispatch(setShowEventModal(true));
    dispatch(setSelectedEvent(detail));
  };

  const handleDelete = (eventId: string) => {
    const payload:DeleteEventPayload = {
      eventId,
      selectedMonth,
      selectedYear,
    };
    dispatch(deleteEventStart(payload));
  };

  return (
    <div className={styles.calendarTabContainer}>
      {appointmentDetails.map((detail) => (
        <div className={styles.tabAppointmentList}>
          <div className={styles.tabAppointmentTitle}>{detail.analystName}</div>
          <div className={styles.tabAppointmentDateRange}>{`${currentDate}`}</div>
          <div className={styles.tabAppointmentContact}>
            <img src={UserIcon} alt="icon" width={18} height={18} />
            {detail.contact}
          </div>
          <div className={styles.tabAppointmentActionBox}>
            <div className={styles.tabAppointmentActionValue}>
              <span className={gridClassname[detail.eventId - 1].className} />
              {gridClassname[detail.eventId - 1].eventName}
            </div>
            <div className={styles.tabAppointmentActionButton}>
              <span onClick={() => handleEdit(detail)}><EditIcon /></span>
              <span onClick={() => handleDelete(detail.id)}><DeleteIcon /></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ComponentAppointmentTab;
