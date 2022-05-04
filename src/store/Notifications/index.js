import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { fetchNotificationsService } from 'services/Notifications';

export const fetchNotifications = createAsyncThunk(
  'notifications/list',
  async (params, thunkAPI) => {
    const response = await fetchNotificationsService(params);
    return response;
  },
);

const notificationsAdapter = createEntityAdapter();

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: notificationsAdapter.getInitialState(),
    isLoading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchNotifications.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchNotifications.fulfilled,
      (state, { payload, meta }) => {
        state.isLoading = false;
        const page = meta.arg.page || 1;
        if (page === 1) {
          notificationsAdapter.setMany(state.notifications, payload.data.data);
        } else {
          notificationsAdapter.addMany(state.notifications, payload.data.data);
        }
      },
    );
    builder.addCase(fetchNotifications.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const {} = notificationsSlice.actions;

export const { selectAll: selectAllNotifications } =
  notificationsAdapter.getSelectors(state => state.notifications.notifications);

export const selectNotifications = state => state.notifications;

export default notificationsSlice.reducer;
