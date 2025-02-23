import React from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../index.module.scss';
import InfoIcon from '../../../../assets/Icons/infoIcon.svg';
import { EventJobTabProps } from '../../utils/types';
import { getJobInfoStart } from '../../redux/calenderSlice';

function ComponentJobTab({ jobEventDetails, setShowJobScheduleModal }:EventJobTabProps) {
  const dispatch = useDispatch();

  const handleJobScheduleClick = (id:string) => {
    dispatch(getJobInfoStart(id));
    setShowJobScheduleModal(true);
  };

  return (
    <div className={styles.calendarTabContainer}>
      {jobEventDetails.map((job, index) => (
        <div className={styles.tabJobList} key={`${job.id}-index`}>
          <div className={styles.jobLabel}>
            <span className={styles.appointmentColor} />
            {' '}
            {`Job -${index}`}
          </div>
          <div className={styles.infoBtn} onClick={() => handleJobScheduleClick(job.id)}>
            <img src={InfoIcon} alt="icon" width={18} height={18} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ComponentJobTab;
