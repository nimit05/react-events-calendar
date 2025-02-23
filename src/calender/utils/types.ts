import { Dayjs } from 'dayjs';
import { Entries } from '../../utils/types';

export interface CalenderGridProps {
  setSelectedDate: (date:Date) => void;
  // setShowBookmarkModal: (val:boolean) => void;
  // setShowPublicHolidayModal: (val:boolean) => void;
}

export interface AddEventForm {
  analystName: string;
  event: string;
  startDate: Dayjs;
  endDate: Dayjs;
  contact: string;
  note: string;
}

export type PopperVisibility = {
  [id: string]: boolean;
};

export enum AddEventFields {
  analystName = 'analystName',
  event = 'event',
  startDate = 'startDate',
  endDate = 'endDate',
  contact = 'contact',
  note = 'note',
}

export interface AddEventPayload {
  EventId: number;
  AnalystId: string;
  Contact: string;
  StartDate: string;
  EndDate: string;
  Note: string;
  selectedMonth: string;
  selectedYear: string;
  selectedWeek: string;
}

export interface UpdateEventPayload {
  Id: string;
  EventId: number;
  AnalystId: string;
  Contact: string;
  StartDate: string;
  EndDate: string;
  Note: string;
  selectedMonth: string;
  selectedYear: string;
  selectedWeek: string;
}

export interface EventDetails {
  Id: string;
  EventId: number;
  Analyst: string;
  Contact: string;
  StartDate: string;
  EndDate: string;
  Note: string;
  AnalystId: string;
}

export interface AnalystDetails {
  AnalystName: string;
  AnalystId: string;
  Events: EventDetails[];
}

export interface AllEventsList {
  AnalystData : AnalystDetails[];
}

export interface GetAllEventsQuery {
  month?: string;
  year: string;
  week?: string;
}

export interface CalendarWeekDayDetails {
  date: number;
  day: string;
  className: string;
  bookmarkId: number;
}

export interface AppointmentInfo {
  analystName: string;
  startDate: string;
  endDate: string;
  contact: string;
  notes: string;
  eventId: number;
  id: string;
}

export interface UnitDetails {
  id: string;
  startDate: string;
  endDate: string;
}

export interface EventInfo {
  unitIds: string[];
  otherInfo: AppointmentInfo[];
  id: string;
}
export interface EventJobTabProps {
  jobEventDetails: UnitDetails[];
  setShowJobScheduleModal: (val:boolean) => void;
}

export interface EventAppointmentProps {
  appointmentDetails: AppointmentInfo[];
  currentDate: string;
}

export interface CalendarDayInterface {
  eventId: number;
  showIcon: boolean;
  day: number;
  className: string;
  unitList: UnitDetails[];
  eventInfoList: AppointmentInfo[];
  date: string;
  uniqueId: string;
}

export interface CustomPopperProps {
  show: boolean;
  handleClose: () => void;
  calenderDay: number;
  eventInfo: CalendarDayInterface;
  distanceFromBottom: number;
}

export interface CalendarEventInterface {
  analystName: string;
  analystId: string;
  days: CalendarDayInterface[] | [];
}

export interface CalenderFilterProps {
  setShowPublicHolidayModal: (val:boolean) => void;
  setShowBookmarkModal: (val:boolean) => void;
}
export interface AddPublicHolidayModalProps {
  show: boolean;
  handleClose: () => void;
  holidayDate?: Date | undefined;
}

export enum AddHolidayFields {
  holidayDate = 'holidayDate',
  note = 'note',
}
export interface AddHolidayForm {
  holidayDate: Dayjs;
  note: string;
}

export interface AddBookmarkModalProps {
  show: boolean;
  handleClose: () => void;
}

export interface HolidayInfo {
  holidayDate: string;
  note: string;
}

export interface AddBookmarkForm {
  bookmarkDate: Dayjs;
  customer: string;
  description: string;
}

export enum AddBookmarkFields {
  bookmarkDate = 'bookmarkDate',
  customer = 'customer',
  description = 'description',
}

export interface BookmarkInfo {
  bookmarkDate: string;
  customer: string;
  description: string;
}

export enum JobScheduleFields {
  startDate = 'startDate',
  endDate = 'endDate',
  typeTest = 'typeTest',
  od = 'od',
  customer = 'customer',
  site = 'site',
  siteAddress = 'siteAddress',
  machineType = 'machineType',
  location = 'location',
  manufacturer = 'manufacturer',
  model = 'model',
  type = 'type',
  style = 'style',
  serial = 'serial',
}

export interface JobScheduleForm {
  startDate: Dayjs;
  endDate: Dayjs;
  typeTest: string;
  od: string;
  customer: string;
  site: string;
  siteAddress: string;
  machineType: string;
  location: string;
  manufacturer: string;
  model: string;
  type: string;
  style: string;
  serial: string;
}
export interface DeleteEventPayload {
  eventId: string;
  selectedMonth: string;
  selectedYear: string;
}

export interface AddEventModalProps {
  handleClose: () => void;
  startDate: Date | undefined;
}

export interface CreateBookMarkPayload {
  Description: string;
  Date: string;
  CustomerId: string;
  month: string;
  year: string;
}

export interface UpdateBookMarkPayload {
  Description: string;
  Date: string;
  CustomerId: string;
  Id: number;
  month: string;
  year: string;
}

export interface BookMarks {
  Description: string;
  Date: string;
  CustomerId: string;
  Id: number;
}

export interface GetAllBookmarksPayload {
  month: string;
  year: string;
}

export interface UnitJobEventDetails {
  UnitId: string;
  StartDate: string;
  EndDate: string;
  TestType: string;
  DoNotMove: boolean;
  NextDay: boolean;
  BeforeDay: boolean;
  NightJob: boolean;
  Equipment: boolean;
  SmallJob: boolean;
  Flux: boolean;
  Od: number;
  CustomerName: string;
  SiteName: string;
  SiteAddress: string;
  MachieneType: string;
  Location: string;
  Manufacture: string;
  Model: string;
  Type: string;
  Style: string;
  Serial: string;
}

export interface JobVesseDetails {
  Vessel: string;
  VesselCount: string;
  VesselLength: string;
}

export interface JobEventDetails {
  UnitJobEventDetails: UnitJobEventDetails;
  Vessels: JobVesseDetails[];
}

export interface PublicHolidayPayload {
  Description: string;
  Date: string;
  month: string;
  year: string;
}

export interface GetPublicHolidaysResponse {
  Description: string;
  Date: string;
  Id: number;
}

export interface CalendarDataProps {
  selectedYear:string;
  selectedMonth: string;
  eventList:AnalystDetails[];
  analystList:Entries[];
  publicHolidays: GetPublicHolidaysResponse[];
  weekWiseData?: boolean;
  weekDays?: number[];
}

export interface WeekCalendarProps {
  weekNumber: string;
  setShowWeekCalendar: (val:boolean) => void;
}

export interface CalenderInitialState {
  events: Entries[];
  isLoading: boolean;
  eventList: AnalystDetails[];
  selectedMonth: string;
  selectedYear: string;
  selectedAnalyst: Entries;
  selectedEvent: AppointmentInfo | null;
  showEventModal: boolean;
  bookmarks: BookMarks[];
  selectedBookmark: BookMarks;
  jobEventDetails: JobEventDetails;
  publicHolidays: GetPublicHolidaysResponse[];
  selectedWeek: string;
}
