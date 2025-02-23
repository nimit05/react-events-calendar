import {
  Box, Button, Grid, IconButton, Modal,
} from '@mui/material';
import React, { useContext } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { ObjectSchema } from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {
  AddPublicHolidayModalProps, AddHolidayForm, AddHolidayFields, PublicHolidayPayload,
} from '../../utils/types';
import ComponentTextInput from '../../../../Common/ComponentTextinput/ComponentTextInput';
import { addPublicHolidaySchema, smallModalStyle } from '../../utils/constant';
import styles from '../../index.module.scss';
import RequiredFiled from '../../../../utils/RequiredField';
import { LocalizationContext } from '../../../../Common/Localization/LocalizationProvider';
import { RootState } from '../../../../redux/rootState';
import { createPublicHolidayStart } from '../../redux/calenderSlice';

function AddPublicHolidayModal({
  show, handleClose,
}: AddPublicHolidayModalProps) {
  const { translations } = useContext(LocalizationContext);
  const { selectedMonth, selectedYear } = useSelector((state:RootState) => state.CalenderReducer);
  const {
    control, reset, handleSubmit, formState: { errors },
  } = useForm<AddHolidayForm>({
    resolver: yupResolver(addPublicHolidaySchema as ObjectSchema<AddHolidayForm>),
  });

  const dispatch = useDispatch();

  // const [inputFields, setInputFields] = useState<HolidayInfo[]>([
  //   { holidayDate: '', note: '' },
  // ]);

  // const removeHoliday = (index: number) => {
  //   const tempData = [...inputFields];
  //   tempData.splice(index, 1);
  //   setInputFields(tempData);
  // };

  const handleModalClose = () => {
    reset();
    handleClose();
  };

  const onSubmit = (values:AddHolidayForm) => {
    const payload:PublicHolidayPayload = {
      Description: values.note,
      Date: values.holidayDate.format('DD-MM-YYYY'),
      month: selectedMonth,
      year: selectedYear,
    };

    dispatch(createPublicHolidayStart(payload));
    handleClose();
  };

  // useEffect(() => {
  //   if (holidayDate) {
  //     setValue(AddHolidayFields.holidayDate, dayjs(holidayDate));
  //   }
  // }, [holidayDate]);

  return (
    <Modal
      open={show}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={smallModalStyle} className={styles.addEventModalContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="customerInfo_container flex-row">
            <div className="customerInfo">
              Add Public Holiday
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
              {/* {inputFields.map((field, index: number) => (
                <> */}
              <Grid item md={4} sm={12} xs={12}>
                <div className="div_label_text">
                  <label className="label_Style_job">
                    Date
                    <RequiredFiled />
                  </label>
                  <Controller
                    control={control}
                    name={AddHolidayFields.holidayDate}
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
                        {errors.holidayDate && (
                        <span className="errorMessage">{errors.holidayDate.message}</span>
                        )}
                      </div>
                    )}
                  />
                </div>
              </Grid>
              <Grid item md={7} sm={11} xs={11}>
                <div className="div_label_text">
                  <label className="label_Style_Customer">
                    Note
                    <RequiredFiled />
                  </label>
                  <ComponentTextInput
                    control={control}
                    inputProps={{ maxLength: 150 }}
                    size="small"
                    name={AddHolidayFields.note}
                    errors={errors}
                    id={AddHolidayFields.note}
                  />
                </div>
              </Grid>
              {/* {index !== inputFields.length - 1
                    && (
                      <Grid item xs={1} sm={1} md={1} className="addMoreBtn">
                        <div
                          onClick={() => removeHoliday(index)}
                          className="add_kits_icon"
                        >
                          <DeleteSvg />
                        </div>
                      </Grid>
                    )}
                  {index === inputFields.length - 1
                    && (
                      <Grid item xs={1} sm={1} md={1} className="addMoreBtn">
                        <div
                          onClick={() => {
                            const newField = { holidayDate: '', note: '' };
                            setInputFields([...inputFields, newField]);
                          }}
                          className="add_kits_icon"
                        >
                          <img
                            src={IconList.addKitsIcon}
                            width={30}
                            height={30}
                            alt=""
                          />
                        </div>
                      </Grid>
                    )}
                  {index !== inputFields.length - 1 && (
                    <div className={styles.borderBottom} />
                  )}
                </>
              ))} */}
              <Grid item md={12} sm={12} xs={12}>
                <div className="save_and_next_div">
                  <div>
                    <Button className="button_cancel" onClick={handleClose}>{translations.cancel}</Button>
                  </div>
                  <div className="button_margin_left">
                    <Button type="submit" className="button_save_and_next">{translations.save}</Button>
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

export default AddPublicHolidayModal;
