import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Tab, Tabs } from '@mui/material';
import { useSelector } from 'react-redux';
import {
  selectedTabStyles, stylesTabIndicator, tabStyles, tabsStyles,
} from '../../../../Common/TabsStyles';
import ComponentAppointmentTab from './componentAppointmentTab';
import ComponentJobTab from './componentJobTab';
import JobScheduleModal from '../jobScheduleModal';
import { CustomPopperProps } from '../../utils/types';
import { RootState } from '../../../../redux/rootState';

function CustomPopper({
  show, handleClose, eventInfo, calenderDay, distanceFromBottom,
}:CustomPopperProps) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showJobScheduleModal, setShowJobScheduleModal] = useState(false);
  const { jobEventDetails } = useSelector((state:RootState) => state.CalenderReducer);
  const handleClosePopper = () => {
    handleClose();
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  function showSelectedTabComponent(): JSX.Element {
    if (eventInfo?.unitList.length === 0) {
      return <ComponentAppointmentTab appointmentDetails={eventInfo.eventInfoList} currentDate={eventInfo.date} />;
    }

    if (eventInfo?.eventInfoList?.length === 0) {
      return <ComponentJobTab jobEventDetails={eventInfo.unitList} setShowJobScheduleModal={setShowJobScheduleModal} />;
    }

    switch (selectedTab) {
      case 1:
        return <ComponentJobTab jobEventDetails={eventInfo.unitList} setShowJobScheduleModal={setShowJobScheduleModal} />;
      default:
        return <ComponentAppointmentTab appointmentDetails={eventInfo.eventInfoList} currentDate={eventInfo.date} />;
    }
  }

  const handlePopperPosition = () => {
    if (distanceFromBottom <= 200 && calenderDay >= 20) {
      return 'customPopperRightAlignedBottom';
    } if (distanceFromBottom <= 200 && calenderDay < 20) {
      return 'customPopperLeftAlignedBottom';
    } if (distanceFromBottom > 200 && calenderDay >= 20) {
      return 'customPopperLeftAligned';
    } if (distanceFromBottom > 200 && calenderDay < 20) {
      return '';
    }
    return '';
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {show && (
      <div className={`customPopper ${handlePopperPosition()}`}>
        <div className="popper-arrow" />
        <div className="popperCloseButton" onClick={handleClosePopper}><CloseIcon /></div>
        {eventInfo?.unitList.length > 0 && eventInfo?.eventInfoList?.length > 0
        && (
        <div>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            style={tabsStyles}
            TabIndicatorProps={stylesTabIndicator}
            className="popperCustomTabBtn"
          >
            <Tab
              label="Appointment"
              style={selectedTab === 0 ? selectedTabStyles : tabStyles}
              value={0}
            />
            <Tab
              label="Job"
              style={selectedTab === 1 ? selectedTabStyles : tabStyles}
              value={1}
            />
          </Tabs>
        </div>
        )}
        <div>
          {showSelectedTabComponent()}
        </div>
      </div>
      )}

      {jobEventDetails?.UnitJobEventDetails && (
      <JobScheduleModal
        show={showJobScheduleModal}
        handleClose={() => setShowJobScheduleModal(false)}
      />
      )}
    </div>
  );
}

export default CustomPopper;
