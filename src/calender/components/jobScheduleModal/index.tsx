import {
  Box, Button, IconButton, Modal,
} from '@mui/material';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useContext, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { IconList } from '../../../../utils/StaticIcons';
import {
  AddBookmarkModalProps, JobScheduleForm, JobScheduleFields,
} from '../../utils/types';
import { smallModalStyle } from '../../utils/constant';
import styles from '../../index.module.scss';
import { LocalizationContext } from '../../../../Common/Localization/LocalizationProvider';
import RequiredFiled from '../../../../utils/RequiredField';
import ComponentTextInput from '../../../../Common/ComponentTextinput/ComponentTextInput';
import { RootState } from '../../../../redux/rootState';
import { convertDate } from '../../../../utils/CommonFunctions';

function JobScheduleModal({ show, handleClose }: AddBookmarkModalProps) {
  const { translations } = useContext(LocalizationContext);
  const { jobEventDetails } = useSelector((state:RootState) => state.CalenderReducer);
  const {
    control, reset, setValue,
  } = useForm<JobScheduleForm>();

  const handleModalClose = () => {
    reset();
    handleClose();
  };

  useEffect(() => {
    if (jobEventDetails?.UnitJobEventDetails.StartDate) {
      setValue(JobScheduleFields.startDate, dayjs(convertDate(jobEventDetails?.UnitJobEventDetails.StartDate)));
      setValue(JobScheduleFields.endDate, dayjs(convertDate(jobEventDetails?.UnitJobEventDetails.EndDate)));
    }
  }, [jobEventDetails]);

  return (
    <Modal
      open={show}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={smallModalStyle} className={styles.jobScheduleModalContainer}>
        <form>
          <div className="customerInfo_container flex-row">
            <div className="customerInfo">
              Job Schedule
            </div>
            <div className={styles.jobScheduleHeaderId}>
              <div className={styles.headerJobId}>
                ID: &nbsp;
                <span>{jobEventDetails?.UnitJobEventDetails?.UnitId}</span>
              </div>
              <IconButton
                aria-label="close"
                onClick={handleModalClose}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <div className="customModalScroll">
            <div className="customerInfo_main_container div_job_container_info">
              <Grid container spacing={2}>
                <Grid xs={12} xsOffset={3} md={3} mdOffset={0}>
                  <div className="div_label_text">
                    <label className="label_Style_job">
                      Start Date
                      <RequiredFiled />
                    </label>
                    <Controller
                      control={control}
                      name={JobScheduleFields.startDate}
                      render={({ field: { value } }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            value={value}
                            disabled
                            slotProps={{ textField: { size: 'small', fullWidth: true } }}
                          />
                        </LocalizationProvider>
                      )}
                    />
                  </div>
                </Grid>
                <Grid xs={12} md={3} mdOffset="auto">
                  <div className="div_label_text">
                    <label className="label_Style_Customer">
                      Test Type
                    </label>
                    <ComponentTextInput
                      control={control}
                      isDisable
                      size="small"
                      name={JobScheduleFields.typeTest}
                      defaultValue={jobEventDetails?.UnitJobEventDetails?.TestType}
                      id={JobScheduleFields.typeTest}
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid xs={12} xsOffset={3} md={3} mdOffset={0}>
                  <div className="div_label_text">
                    <label className="label_Style_job">
                      End Date
                      <RequiredFiled />
                    </label>
                    <Controller
                      control={control}
                      name={JobScheduleFields.endDate}
                      render={({ field: { value, onChange } }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            value={value}
                            disabled
                            onChange={(date) => {
                              onChange(dayjs(date));
                            }}
                            slotProps={{ textField: { size: 'small', fullWidth: true } }}
                          />
                        </LocalizationProvider>
                      )}
                    />
                  </div>
                </Grid>
                {/* <Grid xs={12} md={3} mdOffset="auto">
                  <div className="div_label_text">
                    <label className="label_Style_Customer">
                      OD
                      <RequiredFiled />
                    </label>
                    <ComponentTextInput
                      control={control}
                      inputProps={{ maxLength: 150 }}
                      size="small"
                      name={JobScheduleFields.od}
                      id={JobScheduleFields.od}
                    />
                  </div>
                </Grid> */}
              </Grid>
            </div>
            <Grid container spacing={2}>
              <Grid md={12} sm={12} xs={12}>
                <div className={styles.jobLabelContainer}>
                  {jobEventDetails?.UnitJobEventDetails?.DoNotMove && (
                  <div className={styles.jobLabels}>
                    <img src={IconList.crossIcon} width={22} height={22} alt="icon" />
                    Do Not Move
                  </div>
                  )}
                  {
                    jobEventDetails?.UnitJobEventDetails?.NextDay
                    && (
                    <div className={styles.jobLabels}>
                      <img src={IconList.nextArrowIcon} width={22} height={22} alt="icon" />
                      Next Day
                    </div>
                    )
                  }
                  {jobEventDetails?.UnitJobEventDetails?.BeforeDay
                    && (
                    <div className={styles.jobLabels}>
                      <img src={IconList.beforeArrowIcon} width={22} height={22} alt="icon" />
                      Before Day
                    </div>
                    )}
                  {jobEventDetails?.UnitJobEventDetails?.NightJob
                    && (
                    <div className={styles.jobLabels}>
                      <img src={IconList.nightJobIcon} width={22} height={22} alt="icon" />
                      Night Job
                    </div>
                    )}
                  {jobEventDetails?.UnitJobEventDetails?.Equipment
                    && (
                    <div className={styles.jobLabels}>
                      <img src={IconList.equipemntIcon} width={22} height={22} alt="icon" />
                      Equipment
                    </div>
                    )}
                  {jobEventDetails?.UnitJobEventDetails?.SmallJob
                    && (
                    <div className={styles.jobLabels}>
                      <img src={IconList.smallJobIcon} width={22} height={22} alt="icon" />
                      Small Job
                    </div>
                    )}
                  {jobEventDetails?.UnitJobEventDetails?.Flux
                    && (
                    <div className={styles.jobLabels}>
                      <img src={IconList.fluxIcon} width={22} height={22} alt="icon" />
                      Flux
                    </div>
                    )}
                </div>
              </Grid>
            </Grid>
            <div className="customerInfo_main_container div_job_container_info borderBottom">
              <Grid container spacing={2}>
                <Grid md={3} sm={12} xs={12}>
                  <div className="div_label_text">
                    <label className="label_Style_Customer">
                      Customer
                    </label>
                    <ComponentTextInput
                      control={control}
                      size="small"
                      name={JobScheduleFields.customer}
                      id={JobScheduleFields.customer}
                      isDisable
                      defaultValue={jobEventDetails?.UnitJobEventDetails?.CustomerName}
                    />
                  </div>
                </Grid>
                <Grid md={3} sm={12} xs={12}>
                  <div className="div_label_text">
                    <label className="label_Style_Customer">
                      Site
                    </label>
                    <ComponentTextInput
                      control={control}
                      size="small"
                      name={JobScheduleFields.site}
                      id={JobScheduleFields.site}
                      isDisable
                      defaultValue={jobEventDetails?.UnitJobEventDetails?.SiteName}
                    />
                  </div>
                </Grid>
                <Grid md={6} sm={12} xs={12}>
                  <div className="div_label_text">
                    <label className="label_Style_Customer">
                      Site Address
                    </label>
                    <ComponentTextInput
                      control={control}
                      size="small"
                      name={JobScheduleFields.siteAddress}
                      defaultValue={jobEventDetails?.UnitJobEventDetails?.SiteAddress}
                      isDisable
                      id={JobScheduleFields.siteAddress}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className="customerInfo_main_container div_job_container_info borderBottom">
              <Grid container spacing={2}>
                <Grid md={6} sm={12} xs={12}>
                  <div className="div_label_text">
                    <label className="label_Style_Customer">
                      Machine Type
                    </label>
                    <ComponentTextInput
                      control={control}
                      inputProps={{ maxLength: 150 }}
                      size="small"
                      name={JobScheduleFields.machineType}
                      id={JobScheduleFields.machineType}
                      isDisable
                      defaultValue={jobEventDetails?.UnitJobEventDetails?.MachieneType}
                    />
                  </div>
                </Grid>
                <Grid md={6} sm={12} xs={12}>
                  <div className="div_label_text">
                    <label className="label_Style_Customer">
                      Location  (Building)
                    </label>
                    <ComponentTextInput
                      control={control}
                      size="small"
                      name={JobScheduleFields.location}
                      id={JobScheduleFields.location}
                      isDisable
                      defaultValue={jobEventDetails?.UnitJobEventDetails?.Location}
                    />
                  </div>
                </Grid>
                <Grid md={6} sm={12} xs={12}>
                  <div className="div_label_text">
                    <label className="label_Style_Customer">
                      Manufacturer
                    </label>
                    <ComponentTextInput
                      control={control}
                      size="small"
                      name={JobScheduleFields.manufacturer}
                      id={JobScheduleFields.manufacturer}
                      isDisable
                      defaultValue={jobEventDetails?.UnitJobEventDetails?.Manufacture}
                    />
                  </div>
                </Grid>
                <Grid md={3} sm={12} xs={12}>
                  <div className="div_label_text">
                    <label className="label_Style_Customer">
                      Model
                    </label>
                    <ComponentTextInput
                      control={control}
                      size="small"
                      name={JobScheduleFields.model}
                      isDisable
                      defaultValue={jobEventDetails?.UnitJobEventDetails?.Model}
                      id={JobScheduleFields.model}
                    />
                  </div>
                </Grid>
                <Grid md={3} sm={12} xs={12}>
                  <div className="div_label_text">
                    <label className="label_Style_Customer">
                      Type
                    </label>
                    <ComponentTextInput
                      control={control}
                      size="small"
                      name={JobScheduleFields.type}
                      id={JobScheduleFields.type}
                      isDisable
                      defaultValue={jobEventDetails?.UnitJobEventDetails?.Type}
                    />
                  </div>
                </Grid>
                <Grid md={3} sm={12} xs={12}>
                  <div className="div_label_text">
                    <label className="label_Style_Customer">
                      Style
                    </label>
                    <ComponentTextInput
                      control={control}
                      size="small"
                      name={JobScheduleFields.style}
                      isDisable
                      defaultValue={jobEventDetails?.UnitJobEventDetails?.Style}
                      id={JobScheduleFields.style}
                    />
                  </div>
                </Grid>
                <Grid md={3} sm={12} xs={12}>
                  <div className="div_label_text">
                    <label className="label_Style_Customer">
                      Serial #
                    </label>
                    <ComponentTextInput
                      control={control}
                      size="small"
                      name={JobScheduleFields.serial}
                      id={JobScheduleFields.serial}
                      isDisable
                      defaultValue={jobEventDetails?.UnitJobEventDetails?.Serial}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className="customerInfo_main_container div_job_container_info">
              <Grid container spacing={2}>
                <Grid md={7} sm={12} xs={12}>
                  <div className={styles.JobScheduleBottomContainer}>
                    <div className={styles.JobScheduleHeading}>Vessels</div>
                    <div className={styles.JobScheduleTable}>
                      <table>
                        <thead>
                          <tr>
                            <td width={40}>Vessel</td>
                            <td width={30}>Count</td>
                            <td width={30}>Length</td>
                          </tr>
                        </thead>
                        <tbody>
                          {jobEventDetails?.Vessels?.map((vessel) => (
                            <tr>
                              <td>{vessel.Vessel}</td>
                              <td>{vessel.VesselCount}</td>
                              <td>{vessel.VesselLength}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Grid>
                <Grid md={5} sm={12} xs={12}>
                  <div className={styles.JobScheduleBottomContainer}>
                    <div className={styles.JobScheduleHeading}>Equipment Needed</div>
                    <div className={styles.JobScheduleTable}>
                      <table>
                        <thead>
                          <tr><td>Equipment</td></tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Test Equipment</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className="customerInfo_main_container div_job_container_info">
              <Grid container spacing={2}>
                <Grid md={12} sm={12} xs={12}>
                  <div className="save_and_next_div">
                    <div>
                      <Button className="button_cancel" onClick={handleClose}>{translations.cancel}</Button>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
}

export default JobScheduleModal;
