import {
  Box, Button, Grid, IconButton, Modal, TextField,
} from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { ObjectSchema } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, useForm } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  AddEventFields, AddEventForm, AddEventModalProps,
} from '../../utils/types';
import ComponentTextInput from '../../../../Common/ComponentTextinput/ComponentTextInput';
import RequiredFiled from '../../../../utils/RequiredField';
import ComponentSelectInput from '../../../../Common/ComponentSelectInput';
import { addEventSchema, style } from '../../utils/constant';
import { RootState } from '../../../../redux/rootState';
import { createEventStart, getMasterEventsStart, updateEventStart } from '../../redux/calenderSlice';
import styles from '../../index.module.scss';
import { assignEventvalues } from '../../utils/helper';

function AddEventModal({
  handleClose, startDate,
}:AddEventModalProps) {
  const {
    control, handleSubmit, formState: { errors }, setValue, reset, getValues,
  } = useForm<AddEventForm>({
    resolver: yupResolver(addEventSchema as ObjectSchema<AddEventForm>),
  });
  const {
    events, showEventModal, selectedEvent, selectedMonth, selectedYear, selectedWeek,
  } = useSelector((state:RootState) => state.CalenderReducer);
  const dispatch = useDispatch();

  const { selectedAnalyst } = useSelector((state:RootState) => state.CalenderReducer);

  const handleModalClose = () => {
    reset();
    handleClose();
  };

  useEffect(() => {
    if (selectedEvent) {
      assignEventvalues(setValue, selectedEvent);
    }
  }, [selectedEvent]);

  useEffect(() => {
    if (startDate && !selectedEvent) {
      setValue(AddEventFields.startDate, dayjs(startDate));
    }
  }, [startDate]);

  useEffect(() => {
    if (startDate) {
      setValue(AddEventFields.analystName, String(selectedAnalyst?.Text) || '');
    }
  }, [selectedAnalyst]);

  const onSubmit = (values:AddEventForm) => {
    const edit = selectedEvent !== null;
    const payload = {
      EventId: Number(values.event) || 0,
      AnalystId: String(selectedAnalyst?.Value),
      Contact: values.contact || '',
      StartDate: values.startDate?.format('DD-MM-YYYY'),
      EndDate: values.endDate?.format('DD-MM-YYYY'),
      Note: values.note || '',
      selectedMonth: selectedWeek ? '' : selectedMonth,
      selectedYear,
      selectedWeek,
    };

    if (edit) {
      dispatch(updateEventStart({ ...payload, Id: selectedEvent.id }));
    } else {
      dispatch(createEventStart(payload));
    }

    handleModalClose();
  };

  useEffect(() => {
    if (events?.length === 0) {
      dispatch(getMasterEventsStart());
    }
  }, []);

  return (
    <Modal
      open={showEventModal}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className={styles.addEventModalContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="customerInfo_container flex-row">
            <div className="customerInfo">
              {selectedEvent === null ? 'Add Event' : 'Edit Event'}
            </div>
            <div>
              <IconButton
                aria-label="close"
                onClick={handleModalClose}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <div className="customerInfo_main_container div_job_container_info customModalScroll">
            <Grid container spacing={2}>
              <Grid item md={6} sm={6} xs={12}>
                <div className="div_label_text">
                  <label className="label_Style_Customer">
                    Analyst
                  </label>
                  <ComponentTextInput
                    control={control}
                    inputProps={{ maxLength: 30 }}
                    name={AddEventFields.analystName}
                    id={AddEventFields.analystName}
                    isDisable
                    size="small"
                  />
                </div>
              </Grid>

              <Grid item md={6} sm={6} xs={12}>
                <div className="div_label_text">
                  <label className="label_Style_Customer">
                    Events
                    <RequiredFiled />
                  </label>
                  <ComponentSelectInput
                    showColor
                    name={AddEventFields.event}
                    control={control}
                    errors={errors}
                    size="small"
                    entries={events}
                  />
                </div>
              </Grid>

              <Grid item md={3} sm={4} xs={10}>
                <div className="div_label_text">
                  <label className="label_Style_job">
                    Start Date
                    <RequiredFiled />
                  </label>
                  <Controller
                    control={control}
                    name={AddEventFields.startDate}
                    render={({ field: { value, onChange } }) => (
                      <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            value={value}
                            onChange={(date) => {
                              onChange(dayjs(date));
                            }}
                            slotProps={{ textField: { size: 'small', fullWidth: true } }}
                          />
                        </LocalizationProvider>
                        {errors.startDate && (
                        <span className="errorMessage">{errors.startDate.message}</span>
                        )}
                      </div>
                    )}
                  />
                </div>
              </Grid>

              <Grid item md={3} sm={4} xs={10}>
                <div className="div_label_text">
                  <label className="label_Style_job">
                    End Date
                    <RequiredFiled />
                  </label>
                  <Controller
                    control={control}
                    name={AddEventFields.endDate}
                    render={({ field: { value, onChange } }) => (
                      <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            value={value}
                            onChange={(date) => {
                              onChange(dayjs(date));
                            }}
                            minDate={getValues(AddEventFields.startDate)}
                            slotProps={{ textField: { size: 'small', fullWidth: true } }}
                          />
                        </LocalizationProvider>
                        {errors.endDate && (
                        <span className="errorMessage">{errors.endDate.message}</span>
                        )}
                      </div>
                    )}
                  />
                </div>
              </Grid>

              <Grid item md={6} sm={6} xs={12}>
                <div className="div_label_text">
                  <label className="label_Style_Customer">
                    Contact
                  </label>
                  <ComponentTextInput
                    control={control}
                    inputProps={{ maxLength: 30 }}
                    name={AddEventFields.contact}
                    id={AddEventFields.contact}
                    errors={errors}
                    size="small"
                  />
                </div>
              </Grid>

              <Grid item md={12} sm={12} xs={12}>
                <div className="div_label_text">
                  <label className="label_Style_job">Note</label>
                  <Controller
                    control={control}
                    name={AddEventFields.note}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        inputProps={{ maxLength: 2056 }}
                        value={value}
                        onChange={onChange}
                        multiline
                        rows={5}
                        maxRows={5}
                      />
                    )}
                  />
                </div>
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <div className="save_and_next_div">
                  <div className="button_margin_left">
                    <Button type="submit" className="button_save_and_next"> Save </Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </form>
      </Box>
    </Modal>
  );
}

export default AddEventModal;
