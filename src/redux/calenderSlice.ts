import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entries } from '../../../Common/ComponentSelectInput/types';

const currentDate = new Date();
export const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

const initialState: CalenderInitialState = {
  events: [] as Entries[],
  isLoading: false,
  eventList: [],
  selectedAnalyst: {} as Entries,
  selectedMonth: String(currentMonth + 1),
  selectedYear: String(currentYear),
  selectedEvent: null,
  showEventModal: false,
  bookmarks: [],
  selectedBookmark: {} as BookMarks,
  jobEventDetails: {} as JobEventDetails,
  publicHolidays: [],
  selectedWeek: '',
};

const calenderSlice = createSlice({
  name: 'calender',
  initialState,
  reducers: {

    removeCalenderState() {
      return initialState;
    },

    setSelectedBookmark(state, action:PayloadAction<BookMarks>) {
      return {
        ...state,
        selectedBookmark: action.payload,
      };
    },

    setShowEventModal(state, action:PayloadAction<boolean>) {
      return {
        ...state,
        showEventModal: action.payload,
      };
    },

    setSelectedMonth(state, action:PayloadAction<string>) {
      return {
        ...state,
        selectedMonth: action.payload,
      };
    },

    setSelectedWeek(state, action:PayloadAction<string>) {
      return {
        ...state,
        selectedWeek: action.payload,
      };
    },

    setSelectedYear(state, action:PayloadAction<string>) {
      return {
        ...state,
        selectedYear: action.payload,
      };
    },

    setSelectedAnalyst(state, action:PayloadAction<Entries>) {
      return {
        ...state,
        selectedAnalyst: action.payload,
      };
    },

    setSelectedEvent(state, action:PayloadAction<AppointmentInfo | null>) {
      return {
        ...state,
        selectedEvent: action.payload,
      };
    },

    getMasterEventsStart(state) {
      return {
        ...state,
        isLoading: true,
      };
    },
    getMasterEventsSuccess(state, action: PayloadAction<Entries[]>) {
      return {
        ...state,
        events: action.payload,
        isLoading: false,
      };
    },
    getMasterEventsFailure(state) {
      return {
        ...state,
        isLoading: false,
      };
    },

    // Create Event
    createEventStart(state, _action:PayloadAction<AddEventPayload>) {
      return {
        ...state,
        isLoading: true,
      };
    },
    createEventSuccess(state) {
      return {
        ...state,
        isLoading: false,
      };
    },
    createEventFailure(state) {
      return {
        ...state,
        isLoading: false,
      };
    },

    // Update Event
    updateEventStart(state, _action:PayloadAction<UpdateEventPayload>) {
      return {
        ...state,
        isLoading: true,
      };
    },
    updateEventSuccess(state) {
      return {
        ...state,
        isLoading: false,
      };
    },
    updateEventFailure(state) {
      return {
        ...state,
        isLoading: false,
      };
    },

    deleteEventStart(state, _action:PayloadAction<DeleteEventPayload>) {
      return {
        ...state,
        isLoading: true,
      };
    },
    deleteEventSuccess(state) {
      return {
        ...state,
        isLoading: false,
      };
    },
    deleteEventFailure(state) {
      return {
        ...state,
        isLoading: false,
      };
    },

    // Get All Events
    getAllEventsStart(state, _action:PayloadAction<GetAllEventsQuery>) {
      return {
        ...state,
        isLoading: true,
      };
    },
    getAllEventsSuccess(state, action:PayloadAction<AnalystDetails[]>) {
      return {
        ...state,
        isLoading: false,
        eventList: action.payload,
      };
    },
    getAllEventsFailure(state) {
      return {
        ...state,
        isLoading: false,
      };
    },

    // Create Bookmark
    createBookMarkStart(state, _action:PayloadAction<CreateBookMarkPayload>) {
      return {
        ...state,
        isLoading: true,
      };
    },
    createBookMarkSuccess(state) {
      return {
        ...state,
        isLoading: false,
      };
    },
    createBookMarkFailure(state) {
      return {
        ...state,
        isLoading: false,
      };
    },

    updateBookMarkStart(state, _action:PayloadAction<UpdateBookMarkPayload>) {
      return {
        ...state,
        isLoading: true,
      };
    },
    updateBookMarkSuccess(state) {
      return {
        ...state,
        isLoading: false,
      };
    },
    updateBookMarkFailure(state) {
      return {
        ...state,
        isLoading: false,
      };
    },

    getAllBookmarksStart(state, _action:PayloadAction<GetAllEventsQuery>) {
      return {
        ...state,
        isLoading: true,
      };
    },
    getAllBookmarksSuccess(state, action:PayloadAction<BookMarks[]>) {
      return {
        ...state,
        isLoading: false,
        bookmarks: action.payload,
      };
    },
    getAllBookmarksFailure(state) {
      return {
        ...state,
        isLoading: false,
      };
    },

    getJobInfoStart(state, _action:PayloadAction<string>) {
      return {
        ...state,
        isLoading: true,
      };
    },
    getJobInfoSuccess(state, action: PayloadAction<JobEventDetails>) {
      return {
        ...state,
        isLoading: false,
        jobEventDetails: action.payload,
      };
    },
    getJobInfoFailure(state) {
      return {
        ...state,
        isLoading: false,
      };
    },

    createPublicHolidayStart(state, _action:PayloadAction<PublicHolidayPayload>) {
      return {
        ...state,
        isLoading: true,
      };
    },
    createPublicHolidaySuccess(state) {
      return {
        ...state,
        isLoading: false,
      };
    },
    createPublicHolidayFailure(state) {
      return {
        ...state,
        isLoading: false,
      };
    },

    getAllPublicHolidayStart(state, _action:PayloadAction<GetAllEventsQuery>) {
      return {
        ...state,
        isLoading: true,
      };
    },
    getAllPublicHolidaySuccess(state, action:PayloadAction<GetPublicHolidaysResponse[]>) {
      return {
        ...state,
        isLoading: false,
        publicHolidays: action.payload,
      };
    },
    getAllPublicHolidayFailure(state) {
      return {
        ...state,
        isLoading: false,
      };
    },
  },
});

export const {
  getMasterEventsStart, getMasterEventsSuccess, getMasterEventsFailure,
  createEventFailure, createEventStart, createEventSuccess, getAllEventsStart,
  getAllEventsSuccess, getAllEventsFailure, removeCalenderState, setSelectedAnalyst,
  setSelectedMonth, setSelectedYear, updateEventFailure, updateEventStart, updateEventSuccess,
  deleteEventFailure, deleteEventStart, deleteEventSuccess, setShowEventModal, setSelectedEvent,
  createBookMarkStart, createBookMarkSuccess, createBookMarkFailure, updateBookMarkStart, updateBookMarkSuccess,
  updateBookMarkFailure, getAllBookmarksStart, getAllBookmarksSuccess, getAllBookmarksFailure, setSelectedBookmark,
  getJobInfoStart, getJobInfoSuccess, getJobInfoFailure, createPublicHolidayStart, setSelectedWeek,
  createPublicHolidaySuccess, createPublicHolidayFailure, getAllPublicHolidayStart, getAllPublicHolidaySuccess, getAllPublicHolidayFailure,
} = calenderSlice.actions;
export const CalenderReducer = calenderSlice.reducer;

export type CalenderActions =
  | ReturnType<typeof getMasterEventsStart>
  | ReturnType<typeof getMasterEventsSuccess>
  | ReturnType<typeof getMasterEventsFailure>
  | ReturnType<typeof createEventFailure>
  | ReturnType<typeof createEventStart>
  | ReturnType<typeof createEventSuccess>
  | ReturnType<typeof getAllEventsStart>
  | ReturnType<typeof getAllEventsSuccess>
  | ReturnType<typeof getAllEventsFailure>
  | ReturnType<typeof removeCalenderState>
  | ReturnType<typeof setSelectedAnalyst>
  | ReturnType<typeof setSelectedMonth>
  | ReturnType<typeof setSelectedYear>
  | ReturnType<typeof updateEventFailure>
  | ReturnType<typeof updateEventStart>
  | ReturnType<typeof updateEventSuccess>
  | ReturnType<typeof deleteEventFailure>
  | ReturnType<typeof deleteEventStart>
  | ReturnType<typeof deleteEventSuccess>
  | ReturnType<typeof setSelectedEvent>
  | ReturnType<typeof setShowEventModal>
  | ReturnType<typeof createBookMarkStart>
  | ReturnType<typeof createBookMarkSuccess>
  | ReturnType<typeof createBookMarkFailure>
  | ReturnType<typeof updateBookMarkStart>
  | ReturnType<typeof updateBookMarkSuccess>
  | ReturnType<typeof updateBookMarkFailure>
  | ReturnType<typeof getAllBookmarksStart>
  | ReturnType<typeof getAllBookmarksSuccess>
  | ReturnType<typeof getAllBookmarksFailure>
  | ReturnType<typeof setSelectedBookmark>
  | ReturnType<typeof getJobInfoStart>
  | ReturnType<typeof getJobInfoSuccess>
  | ReturnType<typeof getJobInfoFailure>
  | ReturnType<typeof createPublicHolidayStart>
  | ReturnType<typeof createPublicHolidaySuccess>
  | ReturnType<typeof createPublicHolidayFailure>
  | ReturnType<typeof getAllPublicHolidayStart>
  | ReturnType<typeof getAllPublicHolidaySuccess>
  | ReturnType<typeof getAllPublicHolidayFailure>
  | ReturnType<typeof setSelectedWeek>;
